import { randomElement } from "../../util/randomElement";
import { KNKPrefabData } from "./model/KNKPrefabData";

export class KNKScenario {
    constructor(
        readonly prefabData: KNKPrefabData
    ) { }

    generateConfig(): number[] | undefined {
        const randomPrefab = randomElement(this.prefabData.prefabs)

        if (!randomPrefab) {
            return undefined
        }

        const must = randomPrefab.must
        const might = randomPrefab.might

        return [...Array(this.prefabData.trackCount).keys()].map(index => {
            if (must?.find(el => el == index) == index) {
                console.log('Found must', index, 'in', must)
                return 1
            }
            if (might?.find(el => el == index) == index) {
                console.log('Found might', index, 'in', might)
                const randomNumber = Math.random()
                if (randomNumber > 0.5) {
                    return 1
                }
                return 0
            }
            console.log('Found nothing', index)
            return 0
        })
    }
}