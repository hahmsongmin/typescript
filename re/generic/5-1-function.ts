{
  // bad
  function checkNotNullBad(arg: number | null): number {
    if (arg === null) {
      throw new Error('not valid number!');
    }
    return arg;
  }

  function checkNotNull<T>(arg: T | null): T {
    if (arg == null) throw new Error('not valid');
    return arg;
  }
  // 함수를 호출하는 순간 타입이 정해짐
  const temp: number = checkNotNull(123);
  console.log(temp);
}
