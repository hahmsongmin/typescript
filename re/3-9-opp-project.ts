{
  interface IStack {
    readonly length: number;
    push(char: string): void;
    pop(): string;
  }

  // readonly 값에 불변성
  type StackNode = {
    readonly char: string;
    readonly next?: StackNode;
  };

  class StackBox implements IStack {
    private _langth: number = 0;
    private node?: StackNode;

    get length(): number {
      return this._langth;
    }

    push(char: string): void {
      const target: StackNode = { char, next: this.node };
      this.node = target;
      this._langth += 1;
    }

    pop(): string {
      if (this.node?.char != null) {
        const char = this.node?.char;
        this.node = this.node?.next;
        console.log(char);
        return char;
      }
      this._langth -= 1;
      return 'there is nothing....❌';
    }

    view(): StackNode {
      return this.node as StackNode;
    }
  }

  const myArray = new StackBox();
  myArray.push('Hello');
  myArray.push('Hello1');
  myArray.push('Hello2');
  myArray.push('Hello3');
  myArray.push('Hello4');
  myArray.push('Hello5');
  myArray.pop();
  myArray.pop();
  myArray.pop();
  myArray.pop();
  myArray.pop();
  myArray.pop();
  console.log(myArray.pop());
}
