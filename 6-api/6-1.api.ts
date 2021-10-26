Array;

// command + 클릭 (정의부가서 API 읽음)

// every
// 1.
// 모두 true 일 경우만 true 리턴
// 하나라도 false 라면 false 리턴

type Student = {
  passed: boolean;
};

const students: Student[] = [
  { passed: true },
  { passed: true },
  { passed: true },
];

const result = students.every((student) => {
  return student.passed;
});

console.log(result);

// 2.type 확인 가능
// 예) 배열안에 모두 Cat 인지 아닌지 확인

class Animal {}
class Cat extends Animal {
  isCat: boolean = true;
}
class Dog extends Animal {
  isDog: boolean = true;
}

const animals: Animal[] = [new Cat(), new Cat(), new Dog()];

function isCat(animal: Animal): animal is Cat {
  return (animal as Cat).isCat !== undefined;
}

console.log(animals.every<Cat>(isCat));
