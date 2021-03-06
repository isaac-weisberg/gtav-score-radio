import { SongRecoveryPlan } from "../../model/SongRecovery";
import { Polyrange, Range } from "../../model/Range"

export interface ATATIntensityTrack {
    might?: Polyrange,
    must?: Polyrange
}

export interface ATATSongIntensityData {
    bounds: Range
    tracks: ATATIntensityTrack[]
}

export interface ATATSongMeta {
    recoveryPlan: SongRecoveryPlan
    intensityData: ATATSongIntensityData
}