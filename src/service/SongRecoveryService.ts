import { SongRecoveryPlan } from "../model/SongRecovery";
import { ILoaderService } from "./LoaderService";

export interface RecoveredSong {
    audioDataBuffers: ArrayBuffer[]
}

export interface ISongRecoveryService {
    recoverSong(songMeta: SongRecoveryPlan): Promise<RecoveredSong>
}

export class SongRecoveryService implements ISongRecoveryService {
    constructor(
        readonly loaderService: ILoaderService
    ) {}

    async recoverSong(recoveryPlan: SongRecoveryPlan): Promise<RecoveredSong> {
        switch (recoveryPlan.kind) {
        case 'SongMagicTrackNumberRecoveryPlan':
            const paths = [...Array(recoveryPlan.count).keys()].map(index => {
                return recoveryPlan.masterString.replace(recoveryPlan.templatedSubstring, `${index + 1}`)
            })

            const arrayBuffers = await Promise.all(paths.map(path => {
                return this.loaderService.loadArrayBufferFrom(path);
            }))
            return {
                audioDataBuffers: arrayBuffers
            }
        }
    }
}