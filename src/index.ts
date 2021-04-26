import { AccidentalScenario, DisabledRule, ZeroOrOneRule } from './AccidentalScenario'
import { AlphaPlayer } from './AlphaPlayer'
import { CombinatorialScenario } from './CombinatorialScenario'
import { IntensityDrivenScenario } from './IntensityDrivenScenario'

const appNode = document.getElementById('App')!
const resumeButton = document.getElementById('resumebtn')!

appNode.innerText = 'Hello worldee?'

const stems = 'aadasdfs'.split('').map((_, index) => {
    return `./content/ALC_PB2_PUSSYFACE/ALC_PB2_PUSSYFACE_${index + 1}.mp3`
})

const audioCtx = new AudioContext(
    {
        latencyHint: 'playback'
    } 
)

function fetchAudioBuffer(path: string, ctx: AudioContext): Promise<AudioBuffer> {
    return fetch(path)
        .then(resp => {
            if (resp.status == 404) {
                throw '404'
            }
            return resp.arrayBuffer()
        })
        .then(arrayBuffer => {
            return audioCtx.decodeAudioData(arrayBuffer)
        })
}

const bufferRequests = stems.map(stem => fetchAudioBuffer(stem, audioCtx))

const allBuffers = Promise.all(bufferRequests)

resumeButton.onclick = () => {
    allBuffers
        .then(audioBuffers => {
            const player = new AlphaPlayer(audioBuffers, audioCtx)
            resumeButton.innerText = 'Change scenario'

            // const scenario = new AccidentalScenario([
            //     ZeroOrOneRule,
            //     ZeroOrOneRule,
            //     ZeroOrOneRule,
            //     ZeroOrOneRule,
            //     ZeroOrOneRule,
            //     ZeroOrOneRule,
            //     ZeroOrOneRule,
            //     DisabledRule
            // ])

            // const scenario = new CombinatorialScenario()

            const scenario = new IntensityDrivenScenario()
            const intensity = 60

            resumeButton.onclick = () => {
                const newValues = scenario.generateConfigForIntensity(intensity)

                console.log("New configuration", newValues)

                player.applyConfig({
                    name: 'newconfig',
                    values: newValues
                })
            }

            appNode.innerText = 'Successorama'
        })
        .catch(err => {
            resumeButton.onclick = null
            appNode.innerText = `Error: ${err}`
        })
}
