{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  // 타입스크립트 => 한가지 이상의 부모클래스를 상속 받을 수 없음
  // => composition 구현
  // Favor COMPOSITION over inheritance

  interface ICoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  class CoffeeMaker implements ICoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    constructor(coffeeBeans: number, private milk: IMilkForther, private sugar: ISugarProvider) {
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

    private extract(shots: number): CoffeeCup {
      console.log(`Pulling ${shots} shots.... ☕️`);
      return {
        shots,
        hasMilk: false,
      };
    }

    clean(): void {
      console.log('cleaning...');
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      const coffee = this.extract(shots);
      const sugar = this.sugar.addSugar(coffee);
      return this.milk.makeMilk(sugar);
    }
  }

  // ✅ 각각의 기능 별로 클래스를 따로 만들어서 필요한곳에서 가져와서 쓰는것이 COMPOSITION
  // 그러나 => 서로 커플링되는 것은 좋지 않다. => 인터페이스 Interface 사용

  // ⭐️ 클래스들 간에 의사소통?(상호작용), 클래스 자신을 노출하는 것이 아니라 (규약, 계약<인터페이스>)에 따라 의사소통?(상호작용) <= 디커플링 원칙
  interface IMilkForther {
    makeMilk(cup: CoffeeCup): CoffeeCup;
  }

  interface ISugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup;
  }

  // 싸구려 우유 거품기
  class CheapMilkSteamer implements IMilkForther {
    private steamMilk() {
      console.log('Milk is steaming... 🥛');
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  // 비싼 우유 거품기
  class FancyMilkSteamer implements IMilkForther {
    private steamMilk() {
      console.log('Fancy Milk is steaming... 🥛');
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  // 콜드 우유 거품기
  class ColdMilkSteamer implements IMilkForther {
    private steamMilk() {
      console.log('Cold Milk is steaming... 🥛');
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  // 사탕 설탕 제조기
  class CandySugarMixer implements ISugarProvider {
    private getSugar() {
      console.log('Getting some sugar from 🍭');
      return true;
    }
    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSugar();
      return {
        ...cup,
        hasSugar: sugar,
      };
    }
  }

  // 리얼 설탕 제조기
  class SugarMixer implements ISugarProvider {
    private getSugar() {
      console.log('Getting some sugar from Sugar');
      return true;
    }
    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSugar();
      return {
        ...cup,
        hasSugar: sugar,
      };
    }
  }

  class NoMilk implements IMilkForther {
    makeMilk(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  class NoSugar implements ISugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  // Milk
  const cheapMilkMaker = new CheapMilkSteamer();
  const fancyMilkMaker = new FancyMilkSteamer();
  const coldMilkMaker = new ColdMilkSteamer();
  const noMilk = new NoMilk();

  // Sugar
  const candySugar = new CandySugarMixer();
  const realSugar = new SugarMixer();
  const noSugar = new NoSugar();

  //
  const sweetCandyMachine = new CoffeeMaker(12, noMilk, candySugar);
  const sweetMachine = new CoffeeMaker(12, noMilk, realSugar);

  const latteMachine = new CoffeeMaker(12, cheapMilkMaker, noSugar);
  const coldLatteMachine = new CoffeeMaker(12, coldMilkMaker, noSugar);
  const sweetLatteMachine = new CoffeeMaker(12, fancyMilkMaker, candySugar);
}

{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface ICoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  class OriginalMaker implements ICoffeeMaker {
    private static _beans: number = 0;
    constructor(beans: number, private milk: IMilkMaker, private sugar: ISugarMaker) {
      OriginalMaker._beans = beans;
    }

    grind(shots: number): CoffeeCup {
      return {
        shots,
        hasMilk: false,
        hasSugar: false,
      };
    }

    makeCoffee(shots: number): CoffeeCup {
      const cup = this.grind(shots);
      const isMilk = this.milk.addMilk(cup);
      return this.sugar.addSugar(isMilk);
    }
  }

  interface IMilkMaker {
    addMilk(cup: CoffeeCup): CoffeeCup;
  }

  interface ISugarMaker {
    addSugar(cup: CoffeeCup): CoffeeCup;
  }

  class ColdMilk implements IMilkMaker {
    private getMilk() {
      console.log('Cold milk');
    }
    addMilk(cup: CoffeeCup): CoffeeCup {
      this.getMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  class ColdSugar implements ISugarMaker {
    private getSugar() {
      console.log('Cold sugar');
    }
    addSugar(cup: CoffeeCup): CoffeeCup {
      this.getSugar();
      return {
        ...cup,
        hasSugar: true,
      };
    }
  }

  const coldMilk = new ColdMilk();
  const coldSugar = new ColdSugar();

  const maker = new OriginalMaker(32, coldMilk, coldSugar);
  const coldLattee = maker.makeCoffee(3);
  console.log(coldLattee);
}
