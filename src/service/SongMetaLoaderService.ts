import { Array, Literal, Number, Record, String, Union } from "runtypes";
import { SongAudioRecoveryPlan, SongMeta } from "../model/SongMeta";
import { ILoaderService } from "./LoaderService";

const Range = Record({
    min: Number,
    max: Number
})

const SongAudioRecoveryPlanDSO = Union(Record({
    kind: Literal('SongMagicTrackNumberRecoveryPlan'),
    masterString: String,
    templatedSubstring: String,
    count: Number
}))

const SongIntensityDataDSO = Record({
    bounds: Range,
    tracks: Array(
        Union(
            Range,
            Array(Range)
        )
    )
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
        const json = await this.loaderService.loadJsonFrom(path)

        const songMetaDSO = SongMetaDSO.check(json)

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