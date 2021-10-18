{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  class CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    // private 금지
    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    // static을 붙여 아래와 같이 object를 만들 수 있는 함수를 제공한다면
    // 생성자를 (constructor) 이용해 object를 만드는 것을 금지하는 것이 좋다.
    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("value for beans should be greater than 0");
      }
      this.coffeeBeans += beans;
    }

    makeCoffee(shots: number): CoffeeCup {
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAM_PER_SHOT;
      return {
        shots,
        hasMilk: false,
      };
    }
  }

  const maker = CoffeeMaker.makeMachine(34);
  console.log(maker);
  const maker2 = CoffeeMaker.makeMachine(13);
  console.log(maker2.makeCoffee(2));

  maker.fillCoffeeBeans(3);

  class User {
    // ↓ 아래과 같이 만들지 말고 파라미터에서 접근지정자를 사용하면 바로 만들어지면서 할당
    // firstName: string ;
    // lastName: string;
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }
    // Getter 와 Setter
    private internalAge = 7;
    get age(): number {
      return this.internalAge;
    }
    set age(num: number) {
      this.internalAge = num;
    }

    constructor(private firstName: string, private lastName: string) {}
  }

  const user = new User("Ivan", "Selah");
  console.log(user.age);
  console.log((user.age = 3));
}
