import { Record } from "runtypes";
import { songRecoveryPlanFromDTO } from "../../../model/SongRecovery";
import { SongRecoveryPlanDTO } from "../../../model/SongRecoveryDTO";
import { ILoaderService } from "../../../service/LoaderService";
import { KNKPrefabDataDTO, knkPrefabDataFromDTO } from "../model/KNKPrefabDataDTO";
import { KNKSongMeta } from "../model/KNKSongMeta";

export interface IKNKSongMetaLoaderService {
    loadSongMetaFrom(path: string): Promise<KNKSongMeta>
}

const KNKSongMetaDTO = Record({
    recoveryPlan: SongRecoveryPlanDTO,
    prefabData: KNKPrefabDataDTO
})

export class KNKSongMetaLoaderService implements IKNKSongMetaLoaderService {
    constructor(
        readonly loaderService: ILoaderService
    ) {}

    async loadSongMetaFrom(path: string): Promise<KNKSongMeta> {
        const rawObject = await this.loaderService.loadYamlFrom(path)

        const songMeta = KNKSongMetaDTO.check(rawObject)

        const prefabData = knkPrefabDataFromDTO(songMeta.prefabData)

        return {
            recoveryPlan: songRecoveryPlanFromDTO(songMeta.recoveryPlan),
            prefabData: prefabData
        }
    }
}