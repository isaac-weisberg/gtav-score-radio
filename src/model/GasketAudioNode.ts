export class GasketAudioNode {
    readonly node1: AudioBufferSourceNode
    readonly node2: AudioBufferSourceNode
    readonly bufferDuration: number

    constructor(
        audioBuffer: AudioBuffer,
        readonly ctx: AudioContext
    ) {
        this.bufferDuration = audioBuffer.duration

        this.node1 = ctx.createBufferSource()
        this.node1.buffer = audioBuffer

        this.node2 = ctx.createBufferSource()
        this.node2.buffer = audioBuffer
    }

    connect(node: AudioNode) {
        this.node1.connect(node)
        this.node2.connect(node)
    }

    start() {
        const startTime = this.ctx.currentTime

        this.node1.start(startTime)

        this.node1.onended = () => {
            const currentTime = this.ctx.currentTime

            const allLoopsPassed = Math.floor(currentTime / this.bufferDuration)
            
            const isEven = allLoopsPassed % 2 == 0

            const nextLoopIndex = allLoopsPassed + (() => {
                if (isEven) {
                    return 2
                }
                return 1
            })()
            
            const nextTime = this.bufferDuration * nextLoopIndex

            this.node1.stop()
            this.node1.start(nextTime)
        }

        const timeForSecondNode = startTime + this.bufferDuration
        this.node2.start(timeForSecondNode)

        this.node2.onended = () => {
            const currentTime = this.ctx.currentTime

            const allLoopsPassed = Math.floor(currentTime / this.bufferDuration)
            
            const isOdd = allLoopsPassed % 2 == 1

            const nextLoopIndex = allLoopsPassed + (() => {
                if (isOdd) {
                    return 2
                }
                return 1
            })()
            
            const nextTime = this.bufferDuration * nextLoopIndex

            this.node2.stop()
            this.node2.start(nextTime)
        }
        
    }
}