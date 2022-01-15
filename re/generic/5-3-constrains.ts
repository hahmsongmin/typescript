{
  interface IEmployee {
    pay(): void;
  }

  class FullTimeEmployee implements IEmployee {
    pay(): void {
      console.log('full time!!');
    }
    workFullTime() {}
  }

  class PartTimeEmployee implements IEmployee {
    pay(): void {
      console.log('part time!!');
    }
    workPartTime() {}
  }

  function payBad(employee: IEmployee): IEmployee {
    employee.pay();
    return employee;
  }

  // 아무 타입만 다되는건 아니고 IEmployee 를 구현한(확장한) 것만 가능
  function pay<T extends IEmployee>(employee: T): T {
    employee.pay();
    return employee;
  }

  const ivan = new FullTimeEmployee();
  const selah = new PartTimeEmployee();

  ivan.workFullTime();
  selah.workPartTime();

  const ivanAfterPay = pay(ivan);
  const selahAfterPay = pay(selah);
  ivanAfterPay.workFullTime();
  selahAfterPay.workPartTime();

  const obj = {
    name: 'ivan',
    age: 20,
  };

  const obj2 = {
    animal: '🐕',
  };

  // K 를 O 에 key 타입으로 제한
  function getValue<O, K extends keyof O>(object: O, value: K): O[K] {
    return object[value];
  }

  console.log(getValue(obj, 'name'));
  console.log(getValue(obj, 'age'));
  console.log(getValue(obj2, 'animal'));
}
