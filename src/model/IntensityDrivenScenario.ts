import { numberIsInClosedPolyrange } from "../util/Range"
import { SongIntensityData } from "./SongMeta"

const magicDecisionReductor = 0.9

export class IntensityDrivenScenario {
    constructor(
        readonly internsityData: SongIntensityData
    ) {}

    generateConfigForIntensity(intensity: number): number[] {
        return this.internsityData.tracks.map(track => {
            if (track.must) {
                if (numberIsInClosedPolyrange(intensity, track.must)) {
                    return 1
                }
            }
            if (track.might) {
                if (numberIsInClosedPolyrange(intensity, track.might)) {
                    const randomNumber = Math.random() * magicDecisionReductor

                    if (0.5 > randomNumber) {
                        return 1
                    }
                }
            }
            return 0
        })
    }
}