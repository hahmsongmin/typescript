// 자바스크립트에서 this 란 호출한 사람을 나타냄(지니램프?)

console.log(this);

function something() {
  console.log(this); // window <= 함수실행위치가 글로벌 window 이므로
}
something();

const obj1 = {
  name: 'halo',
  start: () => {
    console.log(this);
  },
};
console.clear();
class Counter {
  count = 0;
  increase = function () {
    console.log(this);
  };
}

const counter = new Counter();
counter.increase();
const caller = counter.increase; // ⭐️ let const 로 선언한 변수는 window에 등록되어 있지 않으므로
caller(); // caller 를 호출하는 것은 어떤 object 도 아니기때문에 this는 underfined 다.

// 예외 : var <= var는 window에 등록이 된다.

// ✅ 정보를 잃어 버리지 않게 묶어주려면 bind 하거나 Arrow function 을 사용해야한다.
// ex) const caller = counter.increase.bind(counter);
// ex) Arrow function은 선언될 당시의 스코프를 유지 한다.
// =>
class User {
  count = 0;
  decrease = () => {
    console.log(this);
  };
}
const my = new User();
const Halo = my.decrease; // 포인터를 Halo로
Halo(); // this,  User
