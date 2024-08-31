export function getUniqueValues<T>(array: T[]): T[] {
    return Array.from(new Set(array));
}

export function deepCopy<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (obj instanceof Date) {
        return new Date(obj.getTime()) as T;
    }


    if (Array.isArray(obj)) {
        const copyArray: any[] = [];
        for (let i = 0; i < obj.length; i++) {
            copyArray[i] = deepCopy(obj[i]);
        }
        return copyArray as T;
    }

    const copyObj: { [key: string]: any } = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            copyObj[key] = deepCopy(obj[key]);
        }
    }

    return copyObj as T;
}