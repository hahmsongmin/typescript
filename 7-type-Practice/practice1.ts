{
  // TypeScript OOP

  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  class CoffeeMachine implements CoffeeMaker {
    private beans: number = 0;
    static readonly PER_SHOT: number = 7;

    constructor(
      beans: number,
      private milkSteamer: MilkForther,
      private candyProvider: SugarProvider
    ) {
      if (beans < 0) {
        throw new Error("can't set minus");
      }
      this.beans = beans;
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("can't set minus");
      }
      this.beans += beans;
    }

    clean(): void {
      console.log("cleaning");
    }

    private grindBeans(shots: number) {
      this.beans -= shots * CoffeeMachine.PER_SHOT;
      console.log("grind....");
    }

    private preheat() {
      console.log("heating....");
    }

    private extract(shots: number): CoffeeCup {
      return {
        shots,
        hasMilk: false,
      };
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      const coffee = this.extract(shots);
      const sugarAdded = this.candyProvider.makeSugar(coffee);
      return this.milkSteamer.makeMilk(sugarAdded);
    }
  }

  interface MilkForther {
    makeMilk(cup: CoffeeCup): CoffeeCup;
  }

  class NoMilk implements MilkForther {
    makeMilk(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }
  // 우유 거품기
  class CheapMilkSteamer implements MilkForther {
    private steamMilk(): void {
      console.log("Steaming some Milk...🥛");
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  // 고급 우유 거품기
  class FancyMilkSteamer implements MilkForther {
    private steamMilk(): void {
      console.log("Fancy Steaming some Milk...🥛");
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  // 차가운 우유 거품기
  class ColdMilkSteamer implements MilkForther {
    private steamMilk(): void {
      console.log("Cold Steaming some Milk...🥛");
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  interface SugarProvider {
    makeSugar(cup: CoffeeCup): CoffeeCup;
  }
  // 설탕 제조기
  class CandySugarProvider implements SugarProvider {
    private getSugar(): void {
      console.log("getting some sugar candy 🍭...");
    }
    makeSugar(cup: CoffeeCup): CoffeeCup {
      this.getSugar();
      return {
        ...cup,
        hasSugar: true,
      };
    }
  }

  class NoSugar implements SugarProvider {
    makeSugar(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  const noMilk = new NoMilk();
  const noSugar = new NoSugar();

  const cheapMilk = new CheapMilkSteamer();
  const fancyMilk = new FancyMilkSteamer();
  const coldMilk = new ColdMilkSteamer();

  const candySugar = new CandySugarProvider();

  const sweetCandyMachine = new CoffeeMachine(34, noMilk, candySugar);
  const coldLatteMachine = new CoffeeMachine(34, coldMilk, noSugar);
}
