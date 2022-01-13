{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  // 인터페이스에서 규약된 것은 클래스에서 반드시 구현해야 함
  // (함수, 전달되는 인자들, 리턴 되는 값)를 정의한다고 보면 될듯)
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

  class CaffeLatteMaker extends CoffeeMaker {
    constructor(beans: number, private serialNumber: string) {
      super(beans);
    }
    private steamMilk() {
      console.log('Milk is steaming... 🥛');
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots); // 부모에 있는 함수 호출 방법
      this.steamMilk();
      return {
        ...coffee,
        hasMilk: true,
      };
    }
  }

  class SweetCoffeeMaker extends CoffeeMaker {
    private fillSugar() {
      console.log('sugar sugar.. 🍭');
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      this.fillSugar();
      return {
        ...coffee,
        hasSugar: true,
      };
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
  // 내부적으로 구현된 다양한 클래스들이 한가지 인터페이스를 구현하거나 또는 동일한 부모 클래스를 상속했을 때
  // 동일한 함수를 어떤 클래스인지 구분하지 않고 공통된 API를 호출할 수 있는게 다형성의 장점이다.
  // ✅ 부모 클래스를 상속한 자식클래스들이 인터페이스와 부모클래스에 있는 함수들을 다른방식으로 다양하게 구성하는 것
  machines.forEach((machine) => {
    console.log('---------------------------');
    machine.makeCoffee(1);
  });
}
