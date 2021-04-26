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
        const song = await di.songLoaderService.recoverSong({
            recoveryPlan: {
                kind: 'SongMagicTrackNumberRecoveryPlan',
                masterString: './content/ALC_PB2_PUSSYFACE/ALC_PB2_PUSSYFACE_NN.mp3',
                templatedSubstring: 'NN',
                count: 8
            },
            intensityData: {
                minBound: 0,
                maxBound: 100,
                tracks: [
                    {
                        min: 0,
                        max: 100
                    },
                    {
                        min: 0,
                        max: 50
                    },
                    {
                        min: 25,
                        max: 100
                    },
                    {
                        min: 0,
                        max: 100
                    },
                    {
                        min: 50,
                        max: 100
                    },
                    {
                        min: 0,
                        max: 100
                    },
                    {
                        min: 50,
                        max: 100
                    },
                    {
                        min: 75,
                        max: 100
                    }
                ]
            }
        })

        const ctxManager = new AudioContextManager()

        const audioBuffers = await Promise.all(song.audioDataBuffers.map(buffer => ctxManager.ctx.decodeAudioData(buffer)))

        const player = new AlphaPlayer(audioBuffers, ctxManager.ctx)
        resumeButton.innerText = 'Change scenario'

        const scenario = new IntensityDrivenScenario(song.intensityData)
        const intensity = 75

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
    }
}
