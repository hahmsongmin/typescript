{
  // Type Inference 추론
  // TypeScript 에서
  let text = 'Hello';
  // text = 10; <-- 자동으로 타입추론했기때문에 사용안됨
  // 🌟 즉 초기화 Type에 따라 자동으로 추론해줌
  // 실전 프로젝트에서 간단하지 않으면 자동으로해줘도 Type을 명시하는게 좋음

  // 원시타입의 경우 생략할 수 있지만
  // 복잡한 함수의 경우 Type을 명시하는게 좋음
}
{
  let str = 'is string';
  str = 'dasdas';
}
