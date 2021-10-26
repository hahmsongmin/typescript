interface Stack {
  readonly size: number;
  push(value: string): void;
  pop(): string;
}

type superNode = {
  value: string;
  next?: superNode;
};

class MyStack implements Stack {
  private _size: number = 0;
  private head?: superNode;

  get size() {
    return this._size;
  }

  push(value: string) {
    const node: superNode = { value, next: this.head };
    this.head = node;
    this._size++;
  }

  pop(): string {
    if (this.head == null) {
      console.log("Error❌");
      return "Error";
    }
    const node = this.head;
    this.head = node.next;
    this._size--;
    return node.value;
  }
}

const stack = new MyStack();
stack.push("Hello");
stack.push("haha");
stack.push("zzzz");

while (stack.size !== 0) {
  console.log(stack.pop());
}
