import { Array, Number, Record, Static } from "runtypes";
import { KNKPrefabData} from "./KNKPrefabData";

const KNKPrefabDTO = Record({
    must: Array(Number).optional(),
    might: Array(Number).optional()
})

export const KNKPrefabDataDTO = Record({
    trackCount: Number,
    prefabs: Array(KNKPrefabDTO)
})

export function knkPrefabDataFromDTO(dto: Static<typeof KNKPrefabDataDTO>): KNKPrefabData {
    return dto
}