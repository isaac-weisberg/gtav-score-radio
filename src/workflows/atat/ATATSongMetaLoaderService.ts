import { Array, Record } from "runtypes";
import { PolyrangeDTO, RangeDTO } from "../../model/RangeDTO";
import { songRecoveryPlanFromDTO } from "../../model/SongRecovery";
import { SongRecoveryPlanDTO } from "../../model/SongRecoveryDTO";
import { ILoaderService } from "../../service/LoaderService";
import { ATATSongMeta } from "./ATATSongMeta";

const ATATSongIntensityTrackDTO = Record({
    might: PolyrangeDTO.optional(),
    must: PolyrangeDTO.optional()
})

const ATATSongIntensityDataDTO = Record({
    bounds: RangeDTO,
    tracks: Array(ATATSongIntensityTrackDTO)
})

const ATATSongMetaDTO = Record({
    recoveryPlan: SongRecoveryPlanDTO,
    intensityData: ATATSongIntensityDataDTO
})

export interface IATATSongMetaLoaderService {
    loadSongMetaFrom(path: string): Promise<ATATSongMeta>
}

export class ATATSongMetaLoaderService implements IATATSongMetaLoaderService {
    constructor(
        readonly loaderService: ILoaderService
    ) {}

    async loadSongMetaFrom(path: string): Promise<ATATSongMeta> {
        const rawObject = await this.loaderService.loadYamlFrom(path)

        const songMetaDTO = ATATSongMetaDTO.check(rawObject)

        const recoveryPlan = songRecoveryPlanFromDTO(songMetaDTO.recoveryPlan)

        return {
            recoveryPlan: recoveryPlan,
            intensityData: songMetaDTO.intensityData
        }
    }
}