{
  class Animal {}
  class Cat extends Animal {
    isCat: boolean = true;
  }
  class Dog extends Animal {
    isDog: boolean = false;
  }

  class Bug extends Animal {
    calld = () => {};
  }

  const animals: Animal[] = [new Cat(), new Cat(), new Dog()];
  function isCat(animal: Animal): animal is Cat {
    return (animal as Cat).isCat !== undefined;
  }
  // => every 들어가서 보기
  console.log(animals.every<Cat>(isCat));

  const animals1: Animal[] = [new Bug(), new Cat(), new Cat()];
  function isBug(animal: Animal): animal is Bug {
    return (animal as Bug).calld !== undefined;
  }
}
