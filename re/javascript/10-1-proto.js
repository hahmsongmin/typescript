function CoffeeMachine(beans) {
  this.beans = beans;
  //   this.makeCoffee = (shots) => {
  //     console.log('making...');
  //   };
}

CoffeeMachine.prototype.makeCoffee = (shots) => {
  console.log('making...');
};

const machine1 = new CoffeeMachine(10);
const machine2 = new CoffeeMachine(20);

function LatteeMachine(milk) {
  this.milk = milk;
}

LatteeMachine.prototype = Object.create(CoffeeMachine.prototype);

const latteeMachine = new LatteeMachine(123);
latteeMachine.makeCoffee();
