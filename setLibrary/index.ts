import { SetLibrary } from './setLibrary.ts'

const set1 = SetLibrary<number>()
const set2 = SetLibrary<number>()

set1.add(1).add(2).add(3)
set2.add(2).add(3)

console.log('Пересечение ', set1.intersectWith(set2).toArray())
console.log('Объединение ', set1.unionWith(set2).toArray());
console.log('Отличия 1 от 2 ', set1.getDifference(set2).toArray());
console.log('Отличия 1 и 2 ', set1.symmetricDifferenceWith(set2).toArray());
console.log('Подмножество ', set1.isSubsetOf(set2));
console.log('Надмножество ', set1.isSupersetOf(set2));
set2.delete(3)
set1.clear()
console.log(set1.toArray(), set2.toArray(), set2.has(2))