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

  interface ICommericalCoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
    fillCoffeeBeans(coffeeBeans: number): void;
    clean(): void;
  }

  class CoffeeMaker implements ICoffeeMaker, ICommericalCoffeeMaker {
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

  const basicMaker: CoffeeMaker = CoffeeMaker.makeMachine(33);
  basicMaker.fillCoffeeBeans(2);
  basicMaker.makeCoffee(3);

  // 인터페이스 내 규약된것만 보임
  const maker: ICoffeeMaker = CoffeeMaker.makeMachine(32);
  maker.makeCoffee(3);

  const comMaker: ICommericalCoffeeMaker = CoffeeMaker.makeMachine(33);
  comMaker.makeCoffee(3);
  comMaker.fillCoffeeBeans(32);
  comMaker.clean();

  class AmateurUser {
    constructor(private machine: CoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
    }
  }

  class ProBarista {
    constructor(private machine: ICommericalCoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(3);
      console.log(coffee);
      this.machine.fillCoffeeBeans(33);
      this.machine.clean();
    }
  }

  const basicCoffeeMaker = CoffeeMaker.makeMachine(55);
  const amateurWorker = new AmateurUser(basicCoffeeMaker);
  const proWorker = new ProBarista(basicCoffeeMaker);
  console.log('------');
  amateurWorker.makeCoffee();
  proWorker.makeCoffee();
}
