import { Array, Literal, Number, Record, String, Union } from "runtypes";
import { SongRecoveryPlan } from "../../model/SongRecovery";
import { ILoaderService } from "../../service/LoaderService";
import { ATATSongMeta } from "./ATATSongMeta";

const RangeDSO = Record({
    min: Number,
    max: Number
})

const PolyrageDSO = Union(
    RangeDSO,
    Array(RangeDSO)
)

const ATATSongAudioRecoveryPlanDSO = Union(Record({
    kind: Literal('SongMagicTrackNumberRecoveryPlan'),
    masterString: String,
    templatedSubstring: String,
    count: Number
}))

const ATATSongIntensityTrackDSO = Record({
    might: PolyrageDSO.optional(),
    must: PolyrageDSO.optional()
})

const ATATSongIntensityDataDSO = Record({
    bounds: RangeDSO,
    tracks: Array(ATATSongIntensityTrackDSO)
})

const ATATSongMetaDSO = Record({
    recoveryPlan: ATATSongAudioRecoveryPlanDSO,
    intensityData: ATATSongIntensityDataDSO
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

        const songMetaDSO = ATATSongMetaDSO.check(rawObject)

        let recoveryPlanMutable: SongRecoveryPlan
        switch (songMetaDSO.recoveryPlan.kind) {
        case 'SongMagicTrackNumberRecoveryPlan':
            recoveryPlanMutable = {
                kind: 'SongMagicTrackNumberRecoveryPlan',
                masterString: songMetaDSO.recoveryPlan.masterString,
                templatedSubstring: songMetaDSO.recoveryPlan.templatedSubstring,
                count: songMetaDSO.recoveryPlan.count,
            }
        }

        const recoveryPlan = recoveryPlanMutable

        return {
            recoveryPlan: recoveryPlan,
            intensityData: songMetaDSO.intensityData
        }
    }
}