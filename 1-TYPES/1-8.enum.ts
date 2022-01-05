{
  {
    // Enum <= 연관되어 있는것을 묶는 방법

    // Enum <-- TypeScript에 있음 JavaScript에 없음
    // JavaScript 에는 아래와 같이 연관되어 있지만 묶을 수 있는 타입이 존재 하지 않음
    const MONDAY = 0;
    const TUESDAY = 1;
    const WEDNESDAY = 2;
    const THURSDAY = 3;
    const FRIDAY = 4;
    const SATURDAY = 5;
    const SUNDAY = 6;

    // JavaScript에서 사용하는 법
    // =>
    const DAYS_ENUM = Object.freeze({
      MONDAY: 0,
      TUESDAY: 1,
      WEDNESDAY: 2,
      THURSDAY: 3,
      FRIDAY: 4,
      SATURDAY: 5,
      SUNDAY: 6,
    });

    // TypeScript <== enum 잘 사용 하지 않음(Type보장이 안됨)
    // 0부터 시작임,
    // 0부터 시작하기 싫다면 숫자 지정해주면 됨 = 1
    enum Days {
      Monday = 'mon', // 0
      Tuesday = 'tue', // 1
      Wednesday = 'wen', // 2
      Thursday = 'thu', // 3
      Friday = 'fri', // 4
      Saturday = 'sat', // 5
      Sunday = 'sun', // 6
    }
    // 만약 시작 숫자를 변경하려면 Monday = 1,
    console.log(Days.Monday);

    // 🌟 위처럼 잘 사용하지 않고 요렇게 사용
    type Dayss = 'Monday' | 'Tuesday' | 'Wednesday';
    const day: Dayss = 'Wednesday'; // ⭐️ 정확한 타입 보장
  }
  {
    enum Days {
      Monday,
      Tuesday,
      Wednesday,
      Thursday,
      Friday,
      Saturday,
      Sunday,
    }
    // TypeScript 에서 잘 사용하지 않는 이유
    let day: Days = Days.Saturday;
    day = Days.Monday;
    day = 12; // <= 숫자 아무거나 할당 가능 // 컴파일시에도 에러 없음
  }
}
