import { isIntensityInIntensityTrack, SongIntensityData } from "./SongMeta"

const magicDecisionReductor = 0.9

export class IntensityDrivenScenario {
    

    constructor(
        readonly internsityData: SongIntensityData
    ) {}

    generateConfigForIntensity(intensity: number): number[] {
        return this.internsityData.tracks.map(track => {
            if (isIntensityInIntensityTrack(intensity, track)) {
                // const intensityRange = this.internsityData.maxBound - this.internsityData.minBound
                // const intensityInRange = intensity - this.internsityData.minBound
                // let progressInRange = intensityRange == 0
                //     ? 0.5
                //     : intensityInRange / intensityRange

                const randomNumber = Math.random() * magicDecisionReductor

                return 0.5 > randomNumber
                    ? 1
                    : 0
            }
            return 0
        })
    }
}