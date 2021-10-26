// 모든 오브젝트들은 종류에 상관없이 proto object를 기본적으로 상속한다
// 자바스크립트에서 상속을 위해 사용되는 아이, 코드 재사용

const array = [];
console.log(array);

function CoffeeMachine(beans) {
  this.beans = beans;
  this.makeCoffee = (shots) => {
    console.log("makeing....");
  };
}

const machine1 = new CoffeeMachine(10);
const machine2 = new CoffeeMachine(20);

console.log(machine1);
console.log(machine2);
