// ⚠️  Type Alias 와 Interface 중 뭘 써야 할까 ?
// ⭐️ 비슷한 고민을 하되, 설명할 수 있는 이유가 있으면 선택해서 쓰는 구나 하고 생각했습니다.

/*
이 컴포넌트에 전달할 수 있는 Props 타입으로는 이 타입이다. (🙆‍♀️)

이 컴포넌트에 전달할 수 있는 Props 타입으로는 이 인터페이스이다. (❓)

이 클래스는 이 인터페이스를 구현한다 (🙆‍♀️)

이 클래스는 이 타입을 구현한다 (❓) */

// Type Alias
// 데이터를 담을 목적의 타입을 결정하기 위한 것으로 사용하는 것이 적합
// 데이터를 담을 목적

// Interface
// 정해진 인터페이스(규격), 이 규격을 따라 구현된다면 동일한 인터페이스(규격) 사용
// 어느 특정한 규격을 정하는 것이라면, 규격을 통해 어떠한 것이 구현된다면 인터페이스 사용
// 규격사항

type PositionType = {
  x: number;
  y: number;
};

interface PositionInterface {
  x: number;
  y: number;
}

// Type Alias | Interface
// ⭐️ object를 정의하고 type을 할당 할 수 있음

const obj1: PositionType = {
  x: 1,
  y: 1,
};

const obj2: PositionInterface = {
  x: 1,
  y: 1,
};

// ⭐️ class 에서도 둘 다 가능

class Pos1 implements PositionType {
  x: number;
  y: number;
}

class Pos2 implements PositionInterface {
  x: number;
  y: number;
}

// ⭐️ Extends 도 둘 다 가능

// 상속을 통한 확장
interface ZPositionInterface extends PositionInterface {
  z: number;
}
// 두 가지 타입을 묶은 형태
type ZPositionType = PositionType & { z: number };

//❓ only Interface can be merged.
// 똑같은 이름으로 인터페이스 선언 (두가지 통합하여 표현됨)
interface PositionInterface {
  z: number;
}

//❓ only Type Alias can use computed properties
type Person = {
  name: string;
  age: number;
};
type Name = Person["name"]; // string

type NumberType = number;
type Direction = "left" | "right";
