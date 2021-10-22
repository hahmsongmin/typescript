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
