interface Employee {
  pay(): void;
}

class FullTimeEmployee implements Employee {
  pay() {
    console.log('Full Time!!');
  }
  workFullTime() {}
}

class PartTimeEmployee implements Employee {
  pay() {
    console.log('Part Time');
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
  name: 'ellie',
  age: 20,
};

const obj2 = {
  animal: '🐕',
};

// object key들 중 하나이다.
function getValue<T, K extends keyof T>(objName: T, value: K): T[K] {
  return objName[value];
}

console.log(getValue(obj, 'name'));
console.log(getValue(obj, 'age'));
console.log(getValue(obj2, 'animal'));

{
  interface Employee {
    pay(): void;
  }

  class FullTimeEmployee implements Employee {
    pay(): void {
      console.log(`full time!`);
    }
    workFullTime() {}
  }

  class PartTimeEmployee implements Employee {
    pay(): void {
      console.log(`part time!!`);
    }
    workPartTime() {}
  }

  const pay = <T extends Employee>(employee: T): T => {
    employee.pay();
    return employee;
  };

  const ivan = new FullTimeEmployee();
  const selah = new PartTimeEmployee();

  const ivanAfterPay = pay(ivan);
  const selahAfterPay = pay(selah);

  const obj = {
    name: 'ivan',
    age: 34,
  };

  const obj2 = {
    animal: '🦮',
  };

  console.log(getNValue(obj, 'name'));
  console.log(getNValue(obj, 'age'));
  console.log(getNValue(obj2, 'animal'));

  function getNValue<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }
}
