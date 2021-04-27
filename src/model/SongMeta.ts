import { Polyrange, Range } from "../util/Range"

export interface IntensityTrack {
    might?: Polyrange,
    must?: Polyrange
}

export interface SongIntensityData {
    bounds: Range
    tracks: IntensityTrack[]
}

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