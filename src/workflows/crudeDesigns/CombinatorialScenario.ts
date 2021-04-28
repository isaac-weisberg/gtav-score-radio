import { randomElement } from "../../util/randomElement"


const CombinatorialNeverRule: {
    kind: 'CombinatorialNeverRule'
} = { kind: 'CombinatorialNeverRule' }

const CombinatorialEqualProbRule: {
    kind: 'CombinatorialEqualProbRule'
} = { kind: 'CombinatorialEqualProbRule' }

const CombinatorialEqExclusiveOrNoneRule: {
    kind: 'CombinatorialEqExclusiveOrNoneRule'
} = { kind: 'CombinatorialEqExclusiveOrNoneRule' }

type CombinatorialRule = typeof CombinatorialNeverRule 
    | typeof CombinatorialEqualProbRule
    | typeof CombinatorialEqExclusiveOrNoneRule

interface CombinatorialGroup {
    name: string,
    tracks: number[],
    rule: CombinatorialRule
}

export class CombinatorialScenario {
    readonly tracks: number
    readonly groups: CombinatorialGroup[]

    constructor() {
        this.tracks = 8
        const groups: CombinatorialGroup[] = [
            {
                name: 'drums',
                tracks: [3, 6],
                rule: CombinatorialEqExclusiveOrNoneRule
            },
            {
                name: 'bass',
                tracks: [0, 5],
                rule: CombinatorialEqExclusiveOrNoneRule
            },
            {
                name: 'accent',
                tracks: [1, 2],
                rule: CombinatorialEqExclusiveOrNoneRule
            },
            {
                name: 'bombastic',
                tracks: [4, 7],
                rule: CombinatorialNeverRule
            }
        ]
        this.groups = groups
    }


    generateNextConfig(): number[] {
        const emptyNumbersArray: number[] = []

        const tracksThatPlay: number[] = this.groups.reduce((res, group) => {
            switch (group.rule.kind) {
            case 'CombinatorialNeverRule':
                return res
            case 'CombinatorialEqualProbRule':
                const tracks = group.tracks.reduce((res, track) => {
                    const isTrackEnabled = randomElement([false, true])!

                    if (isTrackEnabled) {
                        return res.concat([ track ])
                    }

                    return res
                }, emptyNumbersArray)

                return res.concat(tracks)
            case 'CombinatorialEqExclusiveOrNoneRule':
                const randomTrackOrNone = randomElement([ ...group.tracks, undefined ])
                if (randomTrackOrNone) {
                    return res.concat([ randomTrackOrNone ])
                }
                return res
            }
        }, emptyNumbersArray)

        return [...Array(this.tracks).keys()].map((_, trackIndex) => {
            if (tracksThatPlay.find(trackThatPlays => {
                return trackThatPlays == trackIndex
            })) {
                return 1
            }
            return 0
        })
    }
}