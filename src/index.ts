import { createGlobalDIDefault } from './di/di'
import { AlphaPlayer } from './model/AlphaPlayer'
import { ATATIntensityDrivenScenario } from './workflows/atat/ATATIntensityDrivenScenario'
import { AudioContextManager } from './service/AudioContextManager'
import { KNKScenario } from './workflows/knkscenario/KNKScenario'

const appNode = document.getElementById('App')!
const resumeButton = document.getElementById('resumebtn')!
const intensityField = document.getElementById('intensity') as HTMLInputElement

appNode.innerText = 'Hello worldee?'

const di = createGlobalDIDefault()

const mpheist3Meta = './meta/MPHEIST_TRACK3.knk.yaml'
const vinegarTitsMeta = './meta/WDY_VINEGAR_TITS.yaml'

resumeButton.onclick = async () => {
    resumeButton.onclick = null
    try {
        const songMetaLocation = vinegarTitsMeta

        const songMeta = await di.knkSongMetaLoaderService.loadSongMetaFrom(songMetaLocation)

        const recoveredSong = await di.songRecoveryService.recoverSong(songMeta.recoveryPlan)

        const ctxManager = new AudioContextManager()

        const audioBuffers = await Promise.all(recoveredSong.audioDataBuffers.map(buffer => ctxManager.ctx.decodeAudioData(buffer)))

        const player = new AlphaPlayer(audioBuffers, ctxManager.ctx)
        resumeButton.innerText = 'Change scenario'

        const scenario = new KNKScenario(songMeta.prefabData)

        resumeButton.onclick = () => {
            const newValues = scenario.generateConfig()
            
            if (!newValues) {
                return
            }

            console.log("New configuration", newValues)

            player.applyConfig({
                name: 'newconfig',
                values: newValues
            })
        }

    } catch (err) {
        resumeButton.onclick = null
        appNode.innerText = `Error: ${err}`
        console.error(err)
    }
}
