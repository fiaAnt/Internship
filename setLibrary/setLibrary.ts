interface MyCustomSet<T> {
    intersectWith(customSet: MyCustomSet<T>): MyCustomSet<T>;
    unionWith(customSet: MyCustomSet<T>): MyCustomSet<T>;
    isSubsetOf(customSet: MyCustomSet<T>): boolean;
    isSupersetOf(customSet: MyCustomSet<T>): boolean;
    getDifference(customSet: MyCustomSet<T>): MyCustomSet<T>;
    symmetricDifferenceWith(customSet: MyCustomSet<T>): MyCustomSet<T>;
    add(element: T): MyCustomSet<T>;
    delete(element: T): void;
    has(element: T): boolean
    clear(): void;
    size(): number;
    forEach(callback: (element: T) => void): void;
    toArray(): T[];
}

export const SetLibrary = <T>(): MyCustomSet<T> => {

    let set: T[] = []

    return {
        toArray() {
            return [...set]
        },
        forEach(callback) {
            set.forEach(callback)
        },
        intersectWith(customSet) {

            const intersectSet = SetLibrary<T>()
            for (const el of set) {
                if (customSet.has(el)) {
                    intersectSet.add(el)
                }
            }
            return intersectSet
        },
        unionWith(customSet) {
            const unionSet = SetLibrary<T>()
            for (const el of set) {
                unionSet.add(el)
            }
            customSet.forEach(el => unionSet.add(el))
            return unionSet
        },
        isSubsetOf(customSet) {
            for (const el of set) {
                if (!customSet.has(el)) {
                    return false
                }
            }
            return true
        },
        isSupersetOf(customSet) {
            if (customSet.size() !== 0) return true;
            for (const el of customSet.toArray()) {
                if (!set.includes(el)) {
                    return false
                }
            }
            return true
        },
        getDifference(customSet) {
            const getDifferenceSet = SetLibrary<T>()
            for (const el of set) {
                if (!customSet.has(el)) {
                    getDifferenceSet.add(el)
                }
            }
            return getDifferenceSet
        },
        symmetricDifferenceWith(customSet) {
            const symmetricDifferenceSet = SetLibrary<T>()
            for (const el of set) {
                if (!customSet.has(el)) {
                    symmetricDifferenceSet.add(el)
                }
            }
            for (const el of customSet.toArray()) {
                if (!set.includes(el)) {
                    symmetricDifferenceSet.add(el)
                }
            }
            return symmetricDifferenceSet
        },
        add(element) {
            if (!set.includes(element)) {
                set.push(element)
            }
            return this
        },
        delete(element) {
            const index = set.indexOf(element)
            if (index > -1) {
                set.splice(index, 1)
            }
        },
        has(element) {
            return set.includes(element)
        },
        clear() {
            set = []
        },
        size() {
            return set.length
        }
    }

}

