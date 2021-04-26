import { randomElement } from "../util/randomElement"

interface RandomRule {
    kind: 'RandomRule'
    values: [number]
}

export const ZeroOrOneRule: {
    kind: 'ZeroOrOneRule'
} = { kind: 'ZeroOrOneRule'}

export const DisabledRule: {
    kind: 'DisabledRule'
} = { kind: 'DisabledRule' }

type AccidentalRule = RandomRule | typeof ZeroOrOneRule | typeof DisabledRule

export class AccidentalScenario {
    readonly rules: AccidentalRule[]

    constructor(
        rules: AccidentalRule[]
    ) {
        this.rules = rules
    }

    generateNextConfig(): number[] {
        const zeroOrOne = [0, 1]

        const values = this.rules.map(rule => {
            switch (rule.kind) {
                case 'RandomRule':
                    return randomElement(rule.values) || 0
                case 'ZeroOrOneRule':
                    return randomElement(zeroOrOne) || 0
                case 'DisabledRule':
                    return 0
            }
        })

        // Make sure there is no silence produced by the config
        if (!values.some(value => value != 0)) {
            // Using recursive call for the first time since university.
            // The probabilty of this recalculation decreases exponentially
            // with growth of possible configurations.
            // This will absolutely have to do for now, but ideally
            // you would expect the random generation of 
            // unrelated values to be codependent.
            return this.generateNextConfig()
        }

        return values
    }
}
