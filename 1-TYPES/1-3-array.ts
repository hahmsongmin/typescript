{
  // Array 2가지 방법
  const fruits: string[] = ["🍎", "🍏"]; // <- readonly 허용 🌟
  const scroes: Array<number> = [1, 2, 3]; // <- readonly 허용안됨

  // 전달된 인자를 함수내부에서 변경할 수 없도록
  function printArray(fruits: readonly string[]) {}

  // Tuple (배열이긴하지만 서로다른 타입을 가질 수 있음)
  // 배열인덱스로 접근하므로 가독성이 안좋음 ==> interface, type alias, class 로대체해서 사용
  let student: [string, number];
  student = ["name", 123];

  console.log(student[0]);
}
