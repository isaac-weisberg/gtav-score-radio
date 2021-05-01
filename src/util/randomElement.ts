export function randomElement<T>(array: T[]): T | undefined {
    return array[Math.floor(Math.random() * array.length)]
}

export function randomIntNumber(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function arrayByRandomlyDropping<Element>(
    array: Element[], 
    numberOfItemsToDrop: number
): Element[] {
    console.log('Dropping', numberOfItemsToDrop, 'from', array)

    if (numberOfItemsToDrop == 0) {
        return array
    }

    let indicesToDrop: number[] = []
    for (let i = 0; i < numberOfItemsToDrop; i++) {
        let generatedIndex: number
        do {
            generatedIndex = Math.floor(randomIntNumber(0, array.length - 1))
        } while(indicesToDrop.includes(generatedIndex))
        indicesToDrop.push(generatedIndex)
    }

    const sortedIndicesToDrop = indicesToDrop.sort((lhs, rhs) => {
        return lhs > rhs
            ? lhs
            : rhs
    })
    console.log('Dropping indices', sortedIndicesToDrop, 'from', array)

    let arrayWithDroppedItems = [...array]

    for (const index of sortedIndicesToDrop) {
        arrayWithDroppedItems.splice(index, 1)
    }

    console.log('Dropping indices', sortedIndicesToDrop, 'resuling in', arrayWithDroppedItems)
 
    return arrayWithDroppedItems
}