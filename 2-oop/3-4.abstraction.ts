{
  // 정말 필요한 인터페이스만 노출시켜 이 클래스를 사용하기 쉽게 만든다(추상화)
  // 정보은닉, 인터페이스 <= 추상화
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  interface CommercialCoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
    fillCoffeeBeans(beans: number): void;
    clean(): void;
  }

  class CoffeeMakerImple implements CoffeeMaker, CommercialCoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMakerImple {
      return new CoffeeMakerImple(coffeeBeans);
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error('value for beans should be greater than 0');
      }
      this.coffeeBeans += beans;
    }

    clean() {
      console.log('cleaning...');
    }

    private grindBeans(shots: number) {
      console.log(`grindeing beans for ${shots}`);
      if (this.coffeeBeans < shots * CoffeeMakerImple.BEANS_GRAM_PER_SHOT) {
        throw new Error('Not enough coffee beans!');
      }
      this.coffeeBeans -= shots * CoffeeMakerImple.BEANS_GRAM_PER_SHOT;
    }

    private preheat(): void {
      console.log('heating up.....');
    }

    private extract(shots: number): CoffeeCup {
      console.log(`Pulling ${shots} shots....`);
      return {
        shots,
        hasMilk: false,
      };
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
  }

  class AmateurUser {
    constructor(private machine: CoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
    }
  }

  class ProBarista {
    constructor(private machine: CommercialCoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      this.machine.fillCoffeeBeans(5);
      this.machine.clean();
    }
  }

  const maker: CoffeeMakerImple = CoffeeMakerImple.makeMachine(34);
  const amateur = new AmateurUser(maker);
  const pro = new ProBarista(maker);

  console.clear();

  function handle(hello: CoffeeMaker) {
    console.log(hello);
  }

  handle(maker);

  amateur.makeCoffee();
  pro.makeCoffee();
}
