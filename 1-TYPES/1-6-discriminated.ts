{
  // Type이 다르지만 공통적인 프로퍼티 result 작성함으로써 가능
  // typeScript가 조건없이 공통적으로 state.result에 접근할수 있음
  type SuccessState = {
    result: "success";
    response: {
      body: string;
    };
  };
  type FailState = {
    result: "fail";
    reason: string;
  };

  type LoginState = SuccessState | FailState;
  function login(): LoginState {
    return {
      result: "success",
      response: {
        body: "로그인성공",
      },
    };
  }

  function printLoginState(state: LoginState = login()) {
    if (state.result === "success") {
      console.log(state.response.body);
    } else {
      console.log(state.reason);
    }
  }

  printLoginState();
}
