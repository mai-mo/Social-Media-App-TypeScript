let x = "Hello World";

// Arrow Function
const sum = (n1: number, n2: number): number => {
    return (n1 + n2)
}
console.log(sum(5, 8))

function Calc({ n1, n2, n3 }: { n2?: number, n1: number, n3?: number }) {
    return (n1 + (n2 || 0) * (n3 || 1))
}

console.log(Calc({ n1: 5, n2: 3 }))


// never 
// function test(): never{
//     while(true){

//     }
// }

// console.log(test)
// console.log("lol"); // مش هيوصل لها

function test(n1: number, n2:any){
    if(n1 > 25){
        return "more than 25";
    }
    return n2;
}
console.log(test(5, 8));


