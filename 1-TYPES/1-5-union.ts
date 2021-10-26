{
  //🌟 굉장히 많이 사용됨
  // Union Types: OR
  type Direction = "left" | "right" | "up" | "down";
  function move(direction: Direction) {}
  move("right");

  type TileSize = 5 | 7 | 13;
  const thisSize: TileSize = 13;

  // 실전 예제
  type SuccessState = {
    response: {
      body: string;
    };
  };
  type FailState = {
    reason: string;
  };

  type LoginState = SuccessState | FailState;
  function login(): LoginState {
    return {
      response: {
        body: "로그인성공",
      },
    };
  }

  function printLoginState(state: LoginState = login()) {
    if ("response" in state) {
      // <-- 좋지 않음 1-6 discriminated.ts 으로
      console.log(state.response.body);
    } else {
      console.log(state.reason);
    }
  }
}
