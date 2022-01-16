{
  interface IStack<T> {
    readonly length: number;
    push(char: T): void;
    pop(): T;
  }

  // readonly 값에 불변성
  type StackNode<T> = {
    readonly char: T;
    readonly next?: StackNode<T>;
  };

  class StackBox<T> implements IStack<T> {
    private _langth: number = 0;
    private node?: StackNode<T>;

    get length(): number {
      return this._langth;
    }

    push(char: T): void {
      const target: StackNode<T> = { char, next: this.node };
      this.node = target;
      this._langth += 1;
    }

    pop(): T {
      if (this.node?.char != null) {
        const char = this.node?.char;
        this.node = this.node?.next;
        console.log(char);
        return char;
      }
      this._langth -= 1;
      throw new Error('there is nothing....❌');
    }

    view(): StackNode<T> {
      return this.node as StackNode<T>;
    }
  }

  // const stack = new StackBox(); // <= Type 을 명시하지 않으면 unknown 이므로 좋지 않음
  const stack = new StackBox<string>();
  stack.push('Hello');
  stack.pop();

  type NumberProps = number;
  type ArrayProps = Array<number>; // number[]
  type TempProps = {
    name: string;
    id: number;
  };

  type ConbineProps = NumberProps | ArrayProps | TempProps;

  const stack1 = new StackBox<ConbineProps[]>();
  const temp = [1, 2, 3, 4, 5];
  const temp1 = [123, { name: '', id: 23 }, { name: '', id: 45 }, temp];
  stack1.push(temp1);
  stack1.pop();
}
