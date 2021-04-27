import { numberIsInClosedRange } from "../util/numberIsInRange"

interface Range {
    min: number
    max: number
}

type IntensityTrack = (Range | Range[])

export function isIntensityInIntensityTrack(intensity: number, track: IntensityTrack): boolean {
    if (Array.isArray(track)) {
        return track.some(range => numberIsInClosedRange(intensity, range.min, range.max))
    }
    return numberIsInClosedRange(intensity, track.min, track.max)
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