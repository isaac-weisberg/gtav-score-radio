import { arrayByRandomlyDropping, randomElement, randomIntNumber } from "../../util/randomElement";
import { KNKPrefabData } from "./model/KNKPrefabData";

export class KNKScenario {
    constructor(
        readonly prefabData: KNKPrefabData
    ) { }

    generateConfig(): number[] | undefined {
        const randomPrefab = randomElement(this.prefabData.prefabs)
        // const randomPrefab = this.prefabData.prefabs[this.prefabData.prefabs.length - 1]

        if (!randomPrefab) {
            return undefined
        }

        const must = randomPrefab.must || []
        const might = randomPrefab.might

        const mustOfMight: number[] = (() => {
            if (!might) {
                return []
            }

            const maxItemCountToDrop = (() => {
                if (might.length < 2) {
                    return 0
                }
                if (might.length == 2) {
                    return 1
                }
                if (might.length == 3) {
                    return 2
                }
                const droppableFactor = 0.5

                return Math.floor(might.length * droppableFactor)
            })()

            const itemsToDrop = randomIntNumber(0, maxItemCountToDrop)

            return arrayByRandomlyDropping(might, itemsToDrop)
        })()

        const totalMust = must.concat(mustOfMight)

        return [...Array(this.prefabData.trackCount).keys()].map(index => {
            if (totalMust.includes(index)) {
                return 1
            }
            return 0
        })
    }
}