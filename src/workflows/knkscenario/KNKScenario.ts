import { randomElement } from "../../util/randomElement";
import { KNKPrefabData } from "./KNKPrefabData";

export class KNKScenario {
    constructor(
        readonly prefabData: KNKPrefabData
    ) { }

    generateConfig(): number[] | undefined {
        const randomPrefab = randomElement(this.prefabData.prefabs)

        if (!randomPrefab) {
            return undefined
        }

        return randomPrefab.tracks.map(track => {
            switch (track.kind) {
                case 'KNKTrackAlways':
                    return 1
                case 'KNKTrackNever':
                    return 0
                case 'KNKTrackFairMaybe':
                    const randomNumber = Math.random()
                    if (randomNumber > 0.5) {
                        return 1
                    }
                    return 0
            }
        })
    }
}