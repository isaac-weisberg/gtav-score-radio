import { Array, Literal, Number, Record, String, Undefined, Union } from "runtypes";
import { SongAudioRecoveryPlan, SongMeta } from "../model/SongMeta";
import { ILoaderService } from "./LoaderService";

const RangeDSO = Record({
    min: Number,
    max: Number
})

const PolyrageDSO = Union(
    RangeDSO,
    Array(RangeDSO)
)

const SongAudioRecoveryPlanDSO = Union(Record({
    kind: Literal('SongMagicTrackNumberRecoveryPlan'),
    masterString: String,
    templatedSubstring: String,
    count: Number
}))

const SongIntensityTrackDSO = Record({
    might: PolyrageDSO.optional(),
    must: PolyrageDSO.optional()
})

const SongIntensityDataDSO = Record({
    bounds: RangeDSO,
    tracks: Array(SongIntensityTrackDSO)
})

const SongMetaDSO = Record({
    recoveryPlan: SongAudioRecoveryPlanDSO,
    intensityData: SongIntensityDataDSO
})

export interface ISongMetaLoaderService {
    loadSongMetaFrom(path: string): Promise<SongMeta>
}

export class SongMetaLoaderService implements ISongMetaLoaderService {
    constructor(
        readonly loaderService: ILoaderService
    ) {}

    async loadSongMetaFrom(path: string): Promise<SongMeta> {
        const rawObject = await this.loaderService.loadYamlFrom(path)

        const songMetaDSO = SongMetaDSO.check(rawObject)

        let recoveryPlanMutable: SongAudioRecoveryPlan
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