import { numberIsInClosedRange } from "./util/numberIsInRange"

interface IntensityTrack {
    min: number
    max: number
}

interface IntensityData {
    minBound: number,
    maxBound: number,
    tracks: IntensityTrack[]
}

const magicDecisionReductor = 0.9

export class IntensityDrivenScenario {
    readonly internsityData: IntensityData

    constructor() {
        this.internsityData = {
            minBound: 0,
            maxBound: 100,
            tracks: [
                {
                    min: 0,
                    max: 100
                },
                {
                    min: 0,
                    max: 50
                },
                {
                    min: 25,
                    max: 100
                },
                {
                    min: 0,
                    max: 100
                },
                {
                    min: 50,
                    max: 100
                },
                {
                    min: 0,
                    max: 100
                },
                {
                    min: 50,
                    max: 100
                },
                {
                    min: 75,
                    max: 100
                }
            ]
        }
    }

    generateConfigForIntensity(intensity: number): number[] {
        return this.internsityData.tracks.map(track => {
            if (numberIsInClosedRange(intensity, track.min, track.max)) {
                const intensityRange = this.internsityData.maxBound - this.internsityData.minBound
                const intensityInRange = intensity - this.internsityData.minBound
                let progressInRange = intensityRange == 0
                    ? 0.5
                    : intensityInRange / intensityRange

                const randomNumber = Math.random() * magicDecisionReductor

                return progressInRange > randomNumber
                    ? 1
                    : 0
            }
            return 0
        })
    }
}