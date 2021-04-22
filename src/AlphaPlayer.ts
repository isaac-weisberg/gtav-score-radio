interface Scenario {
    name: string
    values: number[]
}

export class AlphaPlayer {
    readonly ctx: AudioContext

    readonly nodes: {
        buffer: AudioBufferSourceNode,
        gain: GainNode
    }[]

    scenarioName?: string
    readonly scenarios: Scenario[]

    constructor(buffers: AudioBuffer[], ctx: AudioContext) {
        this.ctx = ctx
        const scenarios: Scenario[] = [
            {
                name: 'calm',
                values: [ 1.0, 0, 0, 0, 0, 1.0, 0, 0 ]
            },
            {
                name: 'cool',
                values: [ 0, 1.0, 0, 1.0, 0, 0, 0, 0 ]
            }
        ]
        this.scenarios = scenarios

        this.nodes = buffers.map(audioBuffer => {
            const gainNode = ctx.createGain()
            gainNode.connect(ctx.destination)
            gainNode.gain.value = 0.5

            const bufferSource = ctx.createBufferSource()
            bufferSource.buffer = audioBuffer
            bufferSource.loop = true
            bufferSource.connect(gainNode)
            bufferSource.start()
            
            return {
                buffer: bufferSource,
                gain: gainNode
            }
        })
    }

    applyScenario(scenario: Scenario) {
        this.scenarioName = scenario.name

        this.nodes.forEach((node, index) => {
            const unsafeTargetValue = scenario.values[index]
            const safeTargetValue = () => {
                if (unsafeTargetValue == 0) {
                    return 0.001
                }
                return unsafeTargetValue
            }

            const gainValue = node.gain.gain
            gainValue.cancelAndHoldAtTime(this.ctx.currentTime)
            gainValue.setTargetAtTime(safeTargetValue(), this.ctx.currentTime, 1)
        })
    }
}