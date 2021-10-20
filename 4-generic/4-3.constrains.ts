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

function getValue<T>(objName: T, value: T): T {
  return objName.value;
}
