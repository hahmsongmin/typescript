{
  // Enum <-- TypeScript에 있음 JavaScript에 없음
  // JavaScript 에는 아래와 같이 연관되어 있지만 묶을 수 있는 타입이 존재 하지 않음
  const MONDAY = 0;
  const TUESDAY = 1;
  const WEDNESDAY = 2;

  // TypeScript <== enum 잘 사용 하지 않음(Type보장이 안됨)
  enum Days {
    Monday = "mon", // 0
    Tuesday = "tue", // 1
    Wednesday = "wen", // 2
    Thursday = "thu", // 3
    Friday = "fri", // 4
    Saturday = "sat", // 5
    Sunday = "sun", // 6
  }
  // 만약 시작 숫자를 변경하려면 Monday = 1,
  console.log(Days.Monday);

  // 🌟 위처럼 잘 사용하지 않고 요렇게 사용
  type Dayss = "Monday" | "Tuesday" | "Wednesday";
  const day: Dayss = "Wednesday";
}
