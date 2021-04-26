export function randomElement<T>(array: T[]): T | undefined {
    return array[Math.floor(Math.random() * array.length)]
}

export function randomNumber(min: number = 0, max: number): number {
    return Math.random() * (max - min) + min
}
