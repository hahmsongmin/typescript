{
  // Primitive: number, string, boolean, undefined, null, symbol
  // Object: function, array

  // number
  const num: number = 10;

  // string
  const str: string = "Hello";

  // boolean
  const boal: boolean = true;

  // undefined (값이 결정되지 않음 상태)

  let age: number | undefined;

  // null (비어있다고 결정되어 있음)

  let person: string | null;

  // 예시) 이 함수가 ~ 찾았다면 number 아니면 undefined
  function find(): number | undefined {
    return undefined;
  }

  // unknown (어떤타입이 오는지 모르는 상태) ❗

  // any ❗
  let anything: any = 0;
  anything = "Hello";

  // void (아무런 값도 리턴 하지 않음)
  function print(): void {
    console.log("Hello");
  }

  // never (함수에서 절대 리턴되지 않을때 명시하기 위해 쓰임)
  function throwError(message: string): never {
    throw new Error(message);
  }

  // object ❗
  let obj: object;
  function acceptSomeObject(obj: object) {}
  acceptSomeObject({ name: "Selah" });
  acceptSomeObject(temp);
  function temp() {}
}
