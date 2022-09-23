// const x = 1
// let y = 5

// console.log(x, y)   // 1, 5 are printed
// y += 10
// console.log(x, y)   // 1, 15 are printed
// y = "sometext"
// console.log(x, y)   // 1, 'sometext' are printed
// //x = 4               // Causes error

// // ------------

// const t = [1, -1, 3]

// t.push(5)

// console.log(t.length)   // 4 is printed
// console.log(t[1])       // -1 is printed

// t.forEach((value, index) => {
//     console.log(value)  // numbers 1, -1, 3, 5 are printed,
//     //console.log(index)  // each to own line
// })

// // ------------

// const t1 = [1, -1, 3]

// const t2 = t1.concat(5)

// console.log(t1)  // [1, -1, 3] is printed
// console.log(t2) // [1, -1, 3, 5] is printed

// // ------------

// const t3 = [1, 2, 3]

// const m1 = t3.map(value => value * 2)
// console.log(m1) // [2, 4, 6] is printed

// const m2 = t3.map((value) => {
//     return '<li>' + value + '</li>'
// })
// console.log(m2)

// // ------------

// const t4 = [1, 2, 3, 4, 5]

// const [first, second, ...rest] = t4

// console.log(first, second)  // 1, 2 are printed
// console.log(rest)           // [3, 4, 5] is printed

// // ------------

// const object1 = {
//     name: 'Arto Hellas',
//     age: 35,
//     education: 'PhD',
//     foo: function()
//     {
//         console.log("bar");
//     },
//     sex: "Male",
// }

// const object2 = {
//     name: "Full Stack web application development",
//     level: "intermediate studies",
//     size: 5
// }

// const object3 = {
//     name: {
//         first: "Dan",
//         last: "Abromov",
//     },
//     grades: [2, 3, 5, 3],
//     department: "Standford University",
// }

// console.log(object1.name);          // Arto Hellas is printed
// const fieldName = "age";
// console.log(object1[fieldName]);    // 35 is printed

// object1.address = "Helsinki";
// object1['secret number'] = 12341;

// console.log(object1);
// object1.foo();

// // ------------

// const sum = (p1, p2) => {
//     console.log(p1);
//     console.log(p2);
//     return p1 + p2;
// }

// const result = sum(1, 5);
// console.log("Sum:" + result);

// const square = p => {
//     console.log(p);
//     return p * p;
// }

// const squareResult = square(4);
// console.log("Square: " + squareResult);

// const square2 = p => p * p;

// const squareResult2 = square2(4);
// console.log("Square: " + squareResult2);

// const t5 = [1, 2, 3];
// const tSquared = t5.map(p => p * p);  // tSquared is now [1, 4, 9]
// console.log(tSquared);

// function product(a, b)
// {
//     return a * b;
// }

// const result2 = product(2, 6);   // result is now 12
// console.log(result2);

// const average = function(a, b) {
//     return (a + b) / 2;
// }

// const result3 = average(2, 5);   // result is now 3.5
// console.log(result3);

// // --------------

// const arto = {
//     name: "Arto Hellas",
//     age: 35,
//     education: "PhD",
//     greet: function(number = 10) {
//         console.log("hello, my name is " + this.name + " and here is a number: " + number);
//     },
//     doAddition: function(a, b) {
//         console.log(a + b);
//     },
// }

// arto.growOlder = function() {
//     this.age += 1;
// } 

// console.log(arto.age);          // 35 is printed
// arto.growOlder();
// console.log(arto.age);          // 36 is printed

// arto.doAddition(1, 4);          // 5 is printed

// const referenceToAddition = arto.doAddition;
// referenceToAddition(10, 15);    // 25 is printed

// arto.greet();                   // "hello, my name is Arto Hellas" gets printed

// const referenceToGreet = arto.greet;
// referenceToGreet();             // prints "hello, my name is undefined"

// setTimeout(arto.greet.bind(arto), 1000, 12);

// // ------------

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log('hello, my name is ' + this.name);
    }
}

const adam = new Person('Adam Ondra', 29);
adam.greet();

const janja = new Person("Janja Garnbret", 23);
janja.greet();