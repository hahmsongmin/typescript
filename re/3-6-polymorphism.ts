{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
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

  const basicMaker = new CoffeeMaker(33);
  const latteMaker = new CaffeLatteMaker(32, 'halo');
  const coffee = latteMaker.makeCoffee(3);
  console.log(coffee);
}
