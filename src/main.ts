let x = "Hello World";

console.log(x);

// array 
const arr1: string[] = ["hi"]
const arr2: string[] | number[] = [300]
const arr3: (string | number | string[])[] = [300, ['red']]
const arr4: readonly (string | number)[] = [300, 'red'];


// tuples: is a ordered set can't modify it
const grades: readonly [string, string, number] = ['A+', 'B+', 25]
console.log(arr4)
