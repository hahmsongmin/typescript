interface Employee {
  pay(): void;
}

class FullTimeEmployee implements Employee {
  pay() {
    console.log("Full Time!!");
  }
  workFullTime() {}
}

class PartTimeEmployee implements Employee {
  pay() {
    console.log("Part Time");
  }
  workPartTime() {}
}

function pay(employee: Employee): Employee {
  employee.pay();
  return employee;
}

function bestPay<T extends Employee>(employee: T): T {
  employee.pay();
  return employee;
}

const ellie = new FullTimeEmployee();
const bob = new PartTimeEmployee();

const ellieAfterPay = bestPay(ellie);
const bobAfterPay = bestPay(bob);

const obj = {
  name: "ellie",
  age: 20,
};

const obj2 = {
  animal: "🐕",
};

// object key들 중 하나이다.
function getValue<T, K extends keyof T>(objName: T, value: K): T[K] {
  return objName[value];
}

console.log(getValue(obj, "name"));
console.log(getValue(obj, "age"));
console.log(getValue(obj2, "animal"));
