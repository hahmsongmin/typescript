console.log(this);

function simpleFunc() {
  console.log(this);
}

console.clear();

class Counter {
  count = 0;
  increase = () => {
    console.log(this);
  };
}

const count = new Counter();
count.increase();

const caller = count.increase;
caller();

class Bob {}
const bob = new Bob();
bob.run = count.increase;
bob.run();
