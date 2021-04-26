interface SongIntensityTrack {
    min: number
    max: number
}

export interface SongIntensityData {
    minBound: number,
    maxBound: number,
    tracks: SongIntensityTrack[]
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