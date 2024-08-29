export function getUniqueValues<T>(array: T[]): T[] {
    return Array.from(new Set(array));
}

