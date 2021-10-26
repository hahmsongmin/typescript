{
  type superNode = {
    readonly currValue: string;
    readonly preValue?: superNode;
  };

  interface Istack {
    push(value: string): void;
    pop(): string;
  }

  class Stack implements Istack {
    private _size: number = 0;
    private head?: superNode;

    push(value: string) {
      const node: superNode = { currValue: value, preValue: this.head };
      this.head = node;
      this._size += 1;
    }

    pop(): string {
      if (this.head == null) {
        throw new Error("Stack is empty!");
      }
      if (this._size !== 0) {
        this._size -= 1;
      }
      const node = this.head;
      this.head = node.preValue;
      return node.currValue;
    }
  }

  const meStack = new Stack();

  meStack.push("Hello");
  meStack.push("meme");
  meStack.push("super");
  console.log(meStack.pop());
  console.log(meStack.pop());
  console.log(meStack.pop());
}
