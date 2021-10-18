{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  // 추상 클래스 이다 abstract (object를 생성할 수 없는)
  abstract class CoffeeMakerImple implements CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("value for beans should be greater than 0");
      }
      this.coffeeBeans += beans;
    }

    clean() {
      console.log("cleaning...");
    }

    private grindBeans(shots: number) {
      console.log(`grindeing beans for ${shots}`);
      if (this.coffeeBeans < shots * CoffeeMakerImple.BEANS_GRAM_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }
      this.coffeeBeans -= shots * CoffeeMakerImple.BEANS_GRAM_PER_SHOT;
    }

    private preheat(): void {
      console.log("heating up.....");
    }

    protected abstract extract(shots: number): CoffeeCup;

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
  }

  class CaffeLatteMarker extends CoffeeMakerImple {
    constructor(beans: number, public readonly serial: string) {
      super(beans);
    }

    private steamMilk(): void {
      console.log("Streaming some milk...");
    }

    protected extract(shots: number): CoffeeCup {
      this.steamMilk();
      return {
        shots,
        hasMilk: true,
      };
    }
  }

  class SweetCoffeeMaker extends CoffeeMakerImple {
    constructor(beans: number) {
      super(beans);
    }
    protected extract(shots: number): CoffeeCup {
      return {
        shots,
        hasSugar: true,
      };
    }
  }

  const machines: CoffeeMaker[] = [
    new CaffeLatteMarker(16, "456"),
    new SweetCoffeeMaker(16),
  ];
  machines.forEach((machine) => {
    console.log("---------------------------------");
    console.log(machine.makeCoffee(1));
  });
}
