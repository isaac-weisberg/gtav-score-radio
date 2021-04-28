import { Record, Union, Array, Number } from "runtypes"

export const RangeDTO = Record({
    min: Number,
    max: Number
})

export const PolyrangeDTO = Union(
    RangeDTO,
    Array(RangeDTO)
)
