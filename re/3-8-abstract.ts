{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface ICoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  abstract class CoffeeMaker implements ICoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    fillCoffeeBeans(coffeeBeans: number) {
      if (coffeeBeans < 0) throw new Error("you can't fill ths coffeeBeans, valus was minus");
      this.coffeeBeans += coffeeBeans;
    }

    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAM_PER_SHOT) {
        throw new Error('Not enough coffee beans!');
      }
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAM_PER_SHOT;
    }

    private preheat(): void {
      console.log('heating up....🔥');
    }

    protected abstract extract(shots: number): CoffeeCup;

    clean(): void {
      console.log('cleaning...');
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
  }

  class CaffeLatteMaker extends CoffeeMaker {
    constructor(beans: number, private serialNumber: string) {
      super(beans);
    }
    private steamMilk() {
      console.log('Milk is steaming... 🥛');
    }

    protected extract(shots: number): CoffeeCup {
      this.steamMilk();
      return {
        shots,
        hasMilk: true,
      };
    }
  }

  class SweetCoffeeMaker extends CoffeeMaker {
    protected extract(shots: number): CoffeeCup {
      return {
        shots,
        hasSugar: true,
      };
    }
  }

  const machines: ICoffeeMaker[] = [
    new CaffeLatteMaker(17, 'SS'),
    new SweetCoffeeMaker(17),
    new CaffeLatteMaker(17, 'SS'),
    new SweetCoffeeMaker(17),
  ];

  machines.forEach((machine) => {
    console.log('---------------------------');
    machine.makeCoffee(1);
  });
}
