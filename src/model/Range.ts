export interface Range {
    min: number
    max: number
}

export type Polyrange = (Range | Range[])

export function numberIsInClosedRangeUntyped(x: number, min: number, max: number): boolean {
    return x >= min && x <= max
}

export function numberIsInClosedRange(value: number, range: Range): boolean {
    return numberIsInClosedRangeUntyped(value, range.min, range.max)
}

export function numberIsInClosedPolyrange(value: number, polyrange: Polyrange): boolean {
    if (Array.isArray(polyrange)) {
        return polyrange.some(range => numberIsInClosedRange(value, range))
    }
    return numberIsInClosedRange(value, polyrange)
}
