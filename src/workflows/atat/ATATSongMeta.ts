import { Polyrange, Range } from "../../util/Range"

export interface ATATIntensityTrack {
    might?: Polyrange,
    must?: Polyrange
}

export interface ATATSongIntensityData {
    bounds: Range
    tracks: ATATIntensityTrack[]
}

export interface ATATSongMagicTrackNumberRecoveryPlan {
    kind: 'ATATSongMagicTrackNumberRecoveryPlan',
    masterString: string,
    templatedSubstring: string,
    count: number
}

export type ATATSongAudioRecoveryPlan = ATATSongMagicTrackNumberRecoveryPlan

export interface ATATSongMeta {
    recoveryPlan: ATATSongAudioRecoveryPlan
    intensityData: ATATSongIntensityData
}