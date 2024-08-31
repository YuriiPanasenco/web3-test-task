export function getUniqueByObjectProp<T extends object>(array: T[], prop: string): T[] {
    const hashMap = {};
    for (let i = array.length - 1; i >= 0; i--) {
        hashMap[array[i][prop]] = array[i];
    }
    const res = [];
    for (let key of Object.keys(hashMap)) {
        res.push(hashMap[key]);
    }
    return res;
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

export function DJB2Hash(sourceString): number {
    let hash = 5381;
    for (let i = 0; i < sourceString.length; i++) {
        const charCode = sourceString.charCodeAt(i);
        hash = (hash * 33) ^ charCode;
    }
    return hash >>> 0;
}

export function hashObject(obj: object, keys?: string[]): number {
    const prepareObject = Object.keys(obj)
        .filter(key => (!keys) || keys?.includes(key))
        .sort()
        .reduce((result: object, key: string) => {
            const value = obj[key];
            result[key] = typeof value === 'object' && value !== null ? sortObjectKeys(value) : value;
            return result;
        }, {});
    const objString = JSON.stringify(prepareObject);
    return DJB2Hash(objString);
}