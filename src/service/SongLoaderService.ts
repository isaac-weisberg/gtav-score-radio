import { SongIntensityData } from "../model/SongIntensityData";
import { IArrayBufferLoaderService } from "./ArrayBufferLoaderService";

export interface SongMagicTrackNumberRecoveryPlan {
    kind: 'SongMagicTrackNumberRecoveryPlan',
    masterString: string,
    templatedSubstring: string,
    count: number
}

export type SongAudioRecoveryPlan = SongMagicTrackNumberRecoveryPlan

export interface SongMeta {
    recoveryPlan: SongAudioRecoveryPlan
    intensityData: SongIntensityData
}

export interface RecoveredSong {
    audioDataBuffers: ArrayBuffer[]
    intensityData: SongIntensityData
}

export interface ISongLoaderService {
    recoverSong(songMeta: SongMeta): Promise<RecoveredSong>
}

export class SongLoaderService implements ISongLoaderService {

    constructor(
        readonly arrayBufferLoader: IArrayBufferLoaderService
    ) {}

    async recoverSong(songMeta: SongMeta): Promise<RecoveredSong> {
        const recoveryPlan = songMeta.recoveryPlan

        switch (recoveryPlan.kind) {
        case 'SongMagicTrackNumberRecoveryPlan':
            const paths = [...Array(recoveryPlan.count).keys()].map(index => {
                return recoveryPlan.masterString.replace(recoveryPlan.templatedSubstring, `${index + 1}`)
            })

            const arrayBuffers = await Promise.all(paths.map(path => {
                return this.arrayBufferLoader.loadArrayBufferFrom(path);
            }))
            return {
                audioDataBuffers: arrayBuffers,
                intensityData: songMeta.intensityData
            }
        }
    }
}