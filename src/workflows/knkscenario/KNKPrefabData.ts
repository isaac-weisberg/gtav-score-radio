
interface KNKTrackAlways {
    kind: 'KNKTrackAlways'
}

interface KNKTrackNever {
    kind: 'KNKTrackNever'
}

interface KNKTrackFairMaybe {
    kind: 'KNKTrackFairMaybe'
}

type KNKTrack = KNKTrackAlways | KNKTrackNever | KNKTrackFairMaybe

export interface KNKPrefab {
    tracks: KNKTrack[]
}

export interface KNKPrefabData {
    prefabs: KNKPrefab[]
}