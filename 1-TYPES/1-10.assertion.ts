{
  // Type Assertions ❗

  function jsStrFunc(): any {
    return 'Hello';
  }

  const result = jsStrFunc();
  // 함수에서 return 값이 문자열이라도 TypeScript가 봤을때 any type이므로
  // 문자열에서 쓸수 있는 함수들(.length)을 사용할 수 없다.
  // 이럴때 Type Assertions를 사용한다.
  // ❗ 하지만 return 값이 내가생각했던 type(string)이 아닐경우 보장하지 않음(비정상적 오류, 종료 등)
  // 정말 확실할때만 사용해라🍭
  // type casting 2가지 방법
  console.log((result as string).length); // Type Assertions
  console.log((<string>result).length); // Type Assertions

  // 오류케이스
  const wrong: any = 5;
  console.log((wrong as Array<number>).push(1));

  function findNumbers(): number[] | undefined {
    return undefined;
  }

  // ex) number | null or undefined가 절대 아닐때 !(느낌표)
  // 즉 무조건 number 일때

  // number | string 이라면
  // 장담할때 as string 하면 됨

  const numbers = findNumbers();
  // 정말 확실할때 ! 작성 ? 와 반대
  numbers!.push(2);

  // const numbers = findNumbers()!;
  // numbers.push(2);

  // 정말 확실할때 ! 사용해라
  const button = document.querySelector('class')!;
}
{
  const wrong: any = 5;
  console.log((wrong as Array<number>).push(2)); // Application 종료 에러

  function ourFindNumbers(): number[] | undefined {
    return undefined;
  }

  const numbers = ourFindNumbers();
  numbers!.push(2); // <= 경고는 하지만 배열을 확신할때
  // ⭐️ 느낌표(무조건 null || undefined 가 아니야)
  // 또는 함수뒤에 붙여도 됨 const numbers = ourFindNumbers()! ⭐️;
}
