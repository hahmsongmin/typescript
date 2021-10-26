interface Stack<T> {
  readonly size: number;
  push(value: T): void;
  pop(): T;
}

type superNode<T> = {
  value: T;
  next?: superNode<T>;
};

class MyStack<T> implements Stack<T> {
  private _size: number = 0;
  private head?: superNode<T>;

  get size() {
    return this._size;
  }

  push(value: T): void {
    const node: superNode<T> = { value, next: this.head };
    this.head = node;
    this._size++;
  }

  pop(): T {
    if (this.head == null) {
      console.log("Error❌");
      throw new Error("Stack is empty!");
    }
    const node = this.head;
    this.head = node.next;
    this._size--;
    return node.value;
  }
}

const stack = new MyStack<string>();
stack.push("Hello");
stack.push("haha");
stack.push("zzzz");

while (stack.size !== 0) {
  console.log(stack.pop());
}

const numStack = new MyStack<number>();
numStack.push(1);
numStack.push(2);
numStack.push(3);

while (numStack.size !== 0) {
  console.log(numStack.pop());
}
