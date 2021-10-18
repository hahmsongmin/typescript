{
  // Type Assertions ❗

  function jsStrFunc(): any {
    return "Hello";
  }

  const result = jsStrFunc();
  // 함수에서 return 값이 문자열이라도 TypeScript가 봤을때 any type이므로
  // 문자열에서 쓸수 있는 함수들(.length)을 사용할 수 없다.
  // 이럴때 Type Assertions를 사용한다.
  // ❗ 하지만 return 값이 내가생각했던 type(string)이 아닐경우 보장하지 않음(비정상적 오류, 종료 등)
  // type casting 2가지 방법
  console.log((result as string).length); // Type Assertions
  console.log((<string>result).length); // Type Assertions

  // 오류케이스
  const wrong: any = 5;
  console.log((wrong as Array<number>).push(1));

  function findNumbers(): number[] | undefined {
    return undefined;
  }

  const numbers = findNumbers();
  // 정말 확실할때 ! 작성 ? 와 반대
  numbers!.push(2);
  // 정말 확실할때 ! 사용해라
  const button = document.querySelector("class")!;
}
