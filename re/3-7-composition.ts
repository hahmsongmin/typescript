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

    public constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
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
      return this.extract(shots);
    }
  }

  // ✅ 각각의 기능 별로 클래스를 따로 만들어서 필요한곳에서 가져와서 쓰는것이 COMPOSITION
  // 그러나 => 서로 커플링되는 것은 좋지 않다.

  // 싸구려 우유 거품기
  class CheapMilkSteamer {
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

  // 설탕 제조기
  class AutomaticSugarMixer {
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

  class CaffeLatteMaker extends CoffeeMaker {
    // private milkForther: CheapMilkSteamer <= 생성자에 넣는것을 (디펜던시 인젝션 이라고 함)
    constructor(beans: number, private serialNumber: string, private milkForther: CheapMilkSteamer) {
      super(beans);
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.milkForther.makeMilk(coffee);
    }
  }

  class SweetCoffeeMaker extends CoffeeMaker {
    constructor(beans: number, private sugarForther: AutomaticSugarMixer) {
      super(beans);
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.sugarForther.addSugar(coffee);
    }
  }

  // COMPOSITION
  class SweetCaffeLatteMachine extends CoffeeMaker {
    constructor(beans: number, private milkForther: CheapMilkSteamer, private sugarForther: AutomaticSugarMixer) {
      super(beans);
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.milkForther.makeMilk(this.sugarForther.addSugar(coffee));
    }
  }

  const machines: ICoffeeMaker[] = [
    new CoffeeMaker(17),
    new CaffeLatteMaker(17, 'SS'),
    new SweetCoffeeMaker(17),
    new CoffeeMaker(17),
    new CaffeLatteMaker(17, 'SS'),
    new SweetCoffeeMaker(17),
  ];

  machines.forEach((machine) => {
    console.log('---------------------------');
    machine.makeCoffee(1);
  });
}
