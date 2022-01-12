{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  class CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    fillCoffeeBeans(coffeeBeans: number) {
      if (coffeeBeans < 0) throw new Error("you can't fill ths coffeeBeans, valus was minus");
      this.coffeeBeans += coffeeBeans;
    }

    makeCoffee(shots: number): CoffeeCup {
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAM_PER_SHOT;
      return {
        shots,
        hasMilk: false,
      };
    }
  }

  const basicMaker = CoffeeMaker.makeMachine(33);
  console.log(basicMaker.fillCoffeeBeans(1));

  class User {
    constructor(private firstName: string, private lastName: string) {}
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }
    private Age = 0;
    get age(): number {
      return this.Age;
    }
    set age(num: number) {
      this.Age = num;
    }
  }

  const user = new User('Steve', 'Jobs');
  user.age = 77;
  console.log(user.age);
}
