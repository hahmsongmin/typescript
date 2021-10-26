{
  // 🌟 중요 Type Alias
  // 새로운 타입을 내가 정의 한다.
  type Text = string; // <= Text라는 string 타입
  const name: Text = "Hello";
  type Num = number;
  type Student = {
    name: string;
    age: number;
  };

  const student: Student = {
    name: "Hello",
    age: 123,
  };

  // 🌟 String Literal Types
  type Name = "name";
  let firstName: Name;
  // firstName = "Hello"; <== X 동일한 문자열만 할당 가능함
  firstName = "name";

  type Boal = true;
  let isOK: Boal = true;
}
