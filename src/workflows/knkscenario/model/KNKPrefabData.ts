export const KNKTrackAlways: {
    kind: 'KNKTrackAlways'
} = {
    kind: 'KNKTrackAlways'
}

export const KNKTrackNever: {
    kind: 'KNKTrackNever'
} = {
    kind: 'KNKTrackNever'
}

export const KNKTrackFairMaybe: {
    kind: 'KNKTrackFairMaybe'
} = {
    kind: 'KNKTrackFairMaybe'
}

type KNKTrack = typeof KNKTrackAlways | typeof KNKTrackNever | typeof KNKTrackFairMaybe

export interface KNKPrefab {
    tracks: KNKTrack[]
}

export interface KNKPrefabData {
    prefabs: KNKPrefab[]
}