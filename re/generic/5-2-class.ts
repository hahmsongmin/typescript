{
  interface IEither<L, R> {
    left: () => L;
    right: () => R;
  }

  class SimpleEither<L, R> implements IEither<L, R> {
    constructor(private leftValue: L, private rightValue: R) {}
    left(): L {
      return this.leftValue;
    }
    right(): R {
      return this.rightValue;
    }
  }

  const either: IEither<number, number> = new SimpleEither(4, 5);
  const best = new SimpleEither({ name: 'ivan' }, 'Hello');
}
