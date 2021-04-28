import { Literal, Record, Union, String, Number } from "runtypes";

export const SongMagicTrackNumberRecoveryPlanDTO = Record({
    kind: Literal('SongMagicTrackNumberRecoveryPlan'),
    masterString: String,
    templatedSubstring: String,
    count: Number
})

export const SongRecoveryPlanDTO = Union(SongMagicTrackNumberRecoveryPlanDTO)
