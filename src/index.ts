import { createGlobalDIDefault } from './di/di'
import { AlphaPlayer } from './model/AlphaPlayer'
import { IntensityDrivenScenario } from './model/IntensityDrivenScenario'
import { AudioContextManager } from './service/AudioContextManager'

const appNode = document.getElementById('App')!
const resumeButton = document.getElementById('resumebtn')!
const intensityField = document.getElementById('intensity') as HTMLInputElement

appNode.innerText = 'Hello worldee?'

const di = createGlobalDIDefault()

const pussyfaseMeta = './meta/ALC_PB2_PUSSYFACE.json'
const mpheist3Meta = './meta/MPHEIST_TRACK3.json'

resumeButton.onclick = async () => {
    resumeButton.onclick = null
    try {
        const songMetaLocation = mpheist3Meta

        const songMeta = await di.songMetaLoaderService.loadSongMetaFrom(songMetaLocation)

        const recoveredSong = await di.songLoaderService.recoverSong(songMeta)

        const ctxManager = new AudioContextManager()

        const audioBuffers = await Promise.all(recoveredSong.audioDataBuffers.map(buffer => ctxManager.ctx.decodeAudioData(buffer)))

        const player = new AlphaPlayer(audioBuffers, ctxManager.ctx)
        resumeButton.innerText = 'Change scenario'

        const scenario = new IntensityDrivenScenario(recoveredSong.intensityData)

        resumeButton.onclick = () => {
            const intensity = Math.random() * scenario.internsityData.bounds.max + scenario.internsityData.bounds.min

            const newValues = scenario.generateConfigForIntensity(intensity)

            console.log("New configuration", intensity, 'intensity', newValues)

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
