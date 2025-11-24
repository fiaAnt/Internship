
interface MyCustomSet {
    intersectWith(customSet: MyCustomSet): MyCustomSet;

    unionWith(customSet: MyCustomSet): MyCustomSet;

    isSubsetOf(customSet: MyCustomSet): boolean

    isSupersetOf(customSet: MyCustomSet): boolean

    getDifference(customSet: MyCustomSet): MyCustomSet;

    symmetricDifferenceWith(customSet: MyCustomSet): MyCustomSet;

    add(element: any): void;
    delete(element: any): void;
    has(element: any): boolean
    clear(): void;
    size(): number;
    forEach(callback: (element: any) => void): void;
    toArray(): void;
}

const SetLibrary = (): MyCustomSet => {

    const set = new Set()

    return {
          toArray() {
            return Array.from(set)
        },
        forEach(callback) {
            set.forEach(callback)
        },
        intersectWith(customSet) {

            const intersectSet = SetLibrary()
            for (const el of set) {
                if (customSet.has(el)) {
                    intersectSet.add(el)
                }
            }
            return intersectSet
        },
        unionWith(customSet) {
            const unionSet = SetLibrary()
            for (const el of set) {
                unionSet.add(el)
            }
            customSet.forEach(el => unionSet.add(el))
            return unionSet
        },
        isSubsetOf(customSet) {
            for(const el of set) {
                if(!customSet.has(el)) {
                    return false
                }
            }
             return true
        },
        isSupersetOf(customSet) {
         let result = true
            customSet.forEach(el => {
                if (!set.has(el)) result = false
            })
            return result
        },
        getDifference(customSet) {
            const getDifferenceSet = SetLibrary()
            for (const el of set) {
                if (!customSet.has(el)) {
                    getDifferenceSet.add(el)
                }
            }
            return getDifferenceSet
        },
        symmetricDifferenceWith(customSet) {
            const symmetricDifferenceSet = SetLibrary()
            for (const el of set) {
                if (!customSet.has(el)) {
                    symmetricDifferenceSet.add(el)
                }
            }
            customSet.forEach(el => {
                if(!set.has(el)) {
                    symmetricDifferenceSet.add(el)
                }
            })
            return symmetricDifferenceSet
        },
        add(element) {
            set.add(element)
        },
        delete(element) {
            set.delete(element)
        },
        has(element) {
           return set.has(element)
        },
        clear() {
            set.clear()
        },
        size() {
            return set.size
        }
    }

}

const set1 = SetLibrary()
const set2 = SetLibrary()

set1.add(1)
set1.add(2)
set1.add(3)
set2.add(2)
set2.add(3)

console.log('Пересечение ',set1.intersectWith(set2).toArray())
console.log('Объединение ', set1.unionWith(set2).toArray());
console.log('Отличия 1 от 2 ', set1.getDifference(set2).toArray()); 
console.log('Отличия 1 и 2 ', set1.symmetricDifferenceWith(set2).toArray()); 
console.log('Подмножество ', set1.isSubsetOf(set2));
console.log('Надмножество ', set1.isSupersetOf(set2));
set2.delete(3)
set1.clear()
console.log(set1.toArray(), set2.toArray(), set2.has(2))