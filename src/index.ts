import { createGlobalDIDefault } from './di/di'
import { AlphaPlayer } from './model/AlphaPlayer'
import { IntensityDrivenScenario } from './model/IntensityDrivenScenario'
import { AudioContextManager } from './service/AudioContextManager'

const appNode = document.getElementById('App')!
const resumeButton = document.getElementById('resumebtn')!

appNode.innerText = 'Hello worldee?'

const di = createGlobalDIDefault()

resumeButton.onclick = async () => {
    try {
        const songMetaLocation = './content/ALC_PB2_PUSSYFACE/meta.json'

        const songMeta = await di.songMetaLoaderService.loadSongMetaFrom(songMetaLocation)

        const recoveredSong = await di.songLoaderService.recoverSong(songMeta)

        const ctxManager = new AudioContextManager()

        const audioBuffers = await Promise.all(recoveredSong.audioDataBuffers.map(buffer => ctxManager.ctx.decodeAudioData(buffer)))

        const player = new AlphaPlayer(audioBuffers, ctxManager.ctx)
        resumeButton.innerText = 'Change scenario'

        const scenario = new IntensityDrivenScenario(recoveredSong.intensityData)
        const intensity = 35

        resumeButton.onclick = () => {
            const newValues = scenario.generateConfigForIntensity(intensity)

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
