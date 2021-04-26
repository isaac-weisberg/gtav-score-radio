export interface IAudioContextManager {
    readonly ctx: AudioContext
}

export class AudioContextManager implements IAudioContextManager {
    readonly ctx: AudioContext

    constructor() {
        this.ctx = new AudioContext(
            {
                latencyHint: 'playback'
            } 
        )
    }
}
