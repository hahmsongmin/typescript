{
  {
    //🌟 굉장히 많이 사용됨
    // Union Types: OR
    type Direction = 'left' | 'right' | 'up' | 'down';
    function move(direction: Direction) {}
    move('right');

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
          body: '로그인성공',
        },
      };
    }

    function printLoginState(state: LoginState = login()) {
      if ('response' in state) {
        // <-- 좋지 않음 1-6 discriminated.ts 으로
        console.log(state.response.body);
      } else {
        console.log(state.reason);
      }
    }
  }

  type Direction = 'left' | 'right' | 'up' | 'down';
  function ourMove(direction: Direction) {
    console.log(direction);
  }
  ourMove('up');

  type TileSize = 8 | 16 | 32;
  const ourTile: TileSize = 32;

  type SSuccessState = {
    result?: 'success';
    response: {
      body: string;
    };
  };

  type FFailState = {
    result?: 'fail';
    reason: string;
  };

  type OurSuperState = SSuccessState | FFailState;
  function ourFunction(): OurSuperState {
    return {
      reason: 'wrong password',
    };
  }

  ourPrintLoginState(ourFunction());

  function ourPrintLoginState(state: OurSuperState) {
    if (state.result === 'fail') {
      console.log(state.reason);
    } else if (state.result === 'success') {
      console.log(state.response.body);
    }
  }
}
