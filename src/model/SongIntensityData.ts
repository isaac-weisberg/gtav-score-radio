interface SongIntensityTrack {
    min: number
    max: number
}

export interface SongIntensityData {
    minBound: number,
    maxBound: number,
    tracks: SongIntensityTrack[]
}
