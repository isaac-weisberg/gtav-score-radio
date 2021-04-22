import { AlphaPlayer } from './AlphaPlayer'

const appNode = document.getElementById('App')!
const resumeButton = document.getElementById('resumebtn')!

appNode.innerText = 'Hello world?'

const stems = 'aadasdfs'.split('').map((_, index) => {
    return `./content/ALC_PB2_PUSSYFACE/ALC_PB2_PUSSYFACE_${index + 1}.mp3`
})

const audioCtx = new AudioContext(
    {
        
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

            resumeButton.onclick = () => {
                const someScenario = player.scenarios.find(scenario => {
                    return scenario.name != player.scenarioName
                })

                if (someScenario) {
                    player.applyScenario(someScenario)
                } else {
                    console.error('Cant find scenario?')
                }
            }

            appNode.innerText = 'Success?'
        })
        .catch(err => {
            resumeButton.onclick = null
            appNode.innerText = `Error: ${err}`
        })
}
