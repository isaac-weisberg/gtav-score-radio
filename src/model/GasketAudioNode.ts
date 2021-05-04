export class GasketAudioNode {
    constructor(
        readonly audioBuffer: AudioBuffer,
        readonly output: AudioNode,
        readonly ctx: AudioContext
    ) { }

    start() {
        const startTime = this.ctx.currentTime
        this.scheduleNextNodeAtTime(startTime, false)
        
        const timeForSecondNode = startTime + this.audioBuffer.duration
        this.scheduleNextNodeAtTime(timeForSecondNode, true)      
    }

    private scheduleNextNodeAtTime(time: number, scheduledOdd: boolean) {
        const node = this.createBufferSource()

        node.start(time)
        node.onended = () => {
            this.scheduleNextNodeAtTime(this.nextTime(scheduledOdd), scheduledOdd)
        }
    }

    private nextTime(forOddScheduling: boolean): number {
        const allLoopsPassed = this.loopsPassed()
            
        const theOneWereLookingFor = allLoopsPassed % 2 == (forOddScheduling ? 1 : 2)

        const nextLoopIndex = allLoopsPassed + (() => {
            if (theOneWereLookingFor) {
                return 2
            }
            return 1
        })()
        
        const nextTime = this.audioBuffer.duration * nextLoopIndex

        return nextTime
    }

    private loopsPassed(): number {
        const currentTime = this.ctx.currentTime

        const allLoopsPassed = Math.floor(currentTime / this.audioBuffer.duration)

        return allLoopsPassed
    }

    private createBufferSource() {
        const node = this.ctx.createBufferSource()

        node.buffer = this.audioBuffer
        node.connect(this.output)

        return node
    }
}
