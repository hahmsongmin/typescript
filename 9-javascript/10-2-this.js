// 자바스크립트에서의 this 란
// 다른 언어에서의 this 와 다른, 호출한 사람을 가르키는 것(예 지니램프를 부른자)

function simpleFunc() {
  console.log(this);
}

simpleFunc();

class Counter {
  count = 0;
  increase = function () {
    console.log(this);
  };
}

// counter.increase; counter클래스의 객체가 호출했으므로 this 는 Counter
const counter = new Counter();
const caller = counter.increase;
// let, const, window에 등록되지 않으므로 호출한 사람이 없게됨 undefined
caller(); // undefined

// bind
// const caller = counter.increase.bind(counter)
// or ⭐️ Arrow Function(함수선언시), 선언된당시(스코프)의 this상태를 유지
// increase = () => console.log(this);

class Bob {}

const bob = new Bob();
bob.run = counter.increase;
bob.run();
