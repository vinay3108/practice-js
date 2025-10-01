// class Animal {
//     #secret =[];
//     constructor(name) {
//       this.name = name;
//     }
//     speak() {
//       console.log(`${this.name} makes a sound`);
//     }
//   }
  
//   class Dog extends Animal {
//     speak() {
//       console.log(`${this.name} barks`);
//     }
//   }
  
//   const d = new Dog("Rex");
//   d.speak(); // Rex barks


// Function.prototype.myBind = function(context,...bindArgs){
//     if(typeof this!=='function'){
//         return new TypeError("called by function");
//     }
//     const currFn = this;
//     return function(...calledArgs) {
//         if(this instanceof currFn){
//             return new currFn(...bindArgs,...calledArgs);
//         }
//         return currFn.apply(context,[...bindArgs,...calledArgs]);
//     }
// }

// const person ={name:'vinay'};
// const greet = function(greeting) {
//     return `greeting from ${this.name}`;
// }

// const data= greet.myBind(person);
// console.log(data('vinay'));


// class Bank {
//     #balance=0;
//     deposit(amount){
//         this.#balance+=amount;
//     }
//     withdraw(){
//         this.#balance-=this.withdraw;
//     }
//     getBalance(){
//         return this.#balance;
//     }
// }

// obj1= new Bank();
// console.log(obj1.getBalance());
// obj1.deposit(5);
// console.log(obj1.getBalance());


class Shape {
    constructor(name){
        this.name=name;
    }
    getArea (){
        return 0;
    }
    static compareAreas(shape1,shape2){
        const area1 = shape1.getArea();
        const area2 = shape2.getArea();
        if(area1 > area2) return `${shape1.name} is larger`
        if(area1 < area2) return `${shape2.name} is larger`;
        return `both are equal`;
    }
}
class Circle extends Shape{
    constructor(radius){
        super("Circle");
        this.radius=radius;
    }
    getArea(){
        return Math.PI * this.radius * this.radius;
    }
}
class Rectangle extends Shape{
    constructor(length,breadth){
        super("Rectangle");
        this.length=length;
        this.breadth=breadth;
    }
    getArea(){
        return this.length*this.breadth;
    }
}
class Triangle extends Shape{
    constructor(length,breadth){
        super("Triangle");
        this.length=length;
        this.breadth=breadth;
    }
    getArea(){
        return this.length*this.breadth*0.5;
    }
}

const shapes = [
    new Circle(5),
    new Triangle(2,5),
    new Rectangle(9,3)
];

const totalArea = shapes.reduce((sum, shape) => sum + shape.getArea(), 0);
console.log(`total area : ${totalArea}`);

console.log(Shape.compareAreas(shapes[0],shapes[1]));
console.log(Shape.compareAreas(shapes[1],shapes[2]));
