import { ATATSongIntensityData, ATATSongMeta } from "./ATATSongMeta";
import { ILoaderService } from "../../service/LoaderService";

export interface ATATRecoveredSong {
    audioDataBuffers: ArrayBuffer[]
    intensityData: ATATSongIntensityData
}

export interface IATATSongLoaderService {
    recoverSong(songMeta: ATATSongMeta): Promise<ATATRecoveredSong>
}

export class ATATSongLoaderService implements IATATSongLoaderService {

    constructor(
        readonly arrayBufferLoader: ILoaderService
    ) {}

    async recoverSong(songMeta: ATATSongMeta): Promise<ATATRecoveredSong> {
        const recoveryPlan = songMeta.recoveryPlan

        switch (recoveryPlan.kind) {
        case 'ATATSongMagicTrackNumberRecoveryPlan':
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