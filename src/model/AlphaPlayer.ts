import { randomElement } from "../util/randomElement"
import { GasketAudioNode } from "./GasketAudioNode"

interface Config {
    name: string
    values: number[]
}

export class AlphaPlayer {
    readonly ctx: AudioContext

    readonly masterGain: GainNode

    readonly nodes: {
        gasketAudioNode: GasketAudioNode,
        gain: GainNode
    }[]

    configName?: string

    constructor(buffers: AudioBuffer[], ctx: AudioContext) {
        this.ctx = ctx
        const masterGain = ctx.createGain()
        this.masterGain = masterGain
        masterGain.gain.value = 0.5
        masterGain.connect(ctx.destination)

        this.nodes = buffers.map(audioBuffer => {
            const gainNode = ctx.createGain()
            gainNode.connect(this.masterGain)
            gainNode.gain.value = 0.001

            const gasketAudioNode = new GasketAudioNode(audioBuffer, ctx)
            gasketAudioNode.connect(gainNode)
            gasketAudioNode.start()
            
            return {
                gasketAudioNode: gasketAudioNode,
                gain: gainNode
            }
        })
    }

    applyConfig(config: Config) {
        this.configName = config.name

        this.nodes.forEach((node, index) => {
            const unsafeTargetValue = config.values[index]
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