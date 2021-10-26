{
  interface Employee {
    pay(): void;
  }

  class FullTimeEmployee implements Employee {
    pay(): void {
      console.log("Full Time!");
    }
    workFullTime() {}
  }

  class PartTimeEmployee implements Employee {
    pay(): void {
      console.log("Part Time!");
    }
    workPartTime() {}
  }

  //   function pay(employee: Employee): Employee {
  //     employee.pay();
  //     return employee;
  //   }

  // T로 받게되면 타입이 아무거나 올 수 있기때문에 .pay()함수가 있는지 없는 지모름
  // 일반 타입이긴한데 아무 타입이나 다 되는건 아니고 Employee를 구현한 확장한 것만 가능하다. 라고 조건 명시
  function pay<T extends Employee>(employee: T): T {
    employee.pay();
    return employee;
  }

  const fullPerson = new FullTimeEmployee();
  const partPerson = new PartTimeEmployee();

  fullPerson.workFullTime();
  partPerson.workPartTime();

  const fullAfterPay = pay(fullPerson);
  const partAfterPay = pay(partPerson);

  fullAfterPay.workFullTime();
}

const obj = {
  name: "selah",
  age: 33,
};

const obj2 = {
  animal: "🐕‍🦺",
};

console.log(getValue(obj, "name"));
console.log(getValue(obj, "age"));
console.log(getValue(obj2, "animal"));

function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
