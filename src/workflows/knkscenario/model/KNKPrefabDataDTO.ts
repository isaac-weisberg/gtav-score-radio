import { Array, Literal, Record, Static, Union } from "runtypes";
import { KNKPrefabData, KNKTrackAlways, KNKTrackFairMaybe, KNKTrackNever } from "./KNKPrefabData";

const KNKTrackFairMaybeDTO = Literal(7)

const KNKTrackAlwaysDTO = Literal(1)

const KNKTrackNeverDTO = Literal(0)

const KNKTrackDTO = Union(
    KNKTrackNeverDTO,
    KNKTrackAlwaysDTO,
    KNKTrackFairMaybeDTO
)

const KNKPrefabDTO = Record({
    tracks: Array(KNKTrackDTO)
})

export const KNKPrefabDataDTO = Record({
    prefabs: Array(KNKPrefabDTO)
})

export function knkPrefabDataFromDTO(dto: Static<typeof KNKPrefabDataDTO>): KNKPrefabData { 
    return {
        prefabs: dto.prefabs.map(prefab => {
            return {
                tracks: prefab.tracks.map(track => {
                    switch (track) {
                        case 0:
                            return KNKTrackNever
                        case 1:
                            return KNKTrackAlways
                        case 7:
                            return KNKTrackFairMaybe
                    }
                })
            }
        })
    }
}