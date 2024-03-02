const myMiddleware = (store) => (next) => (action) => {
    /**
     * next: dispatch (다음 미들웨어 혹은 다음 리듀서 실행)
     * action: 컴포넌트로부터 전달받은 action
     * store:
     *    - getState() # 현재 state객체 접근하는 함수
     *    - dispatch() # dispatch 하는 함수
     */
  
    let result = next(action);
    if (result === "Success") {
      store.dispatch({
        type: "todo/success",
        payload: {},
      });
    } else {
      store.dispatch({
        type: "todo/fail",
        payload: {},
      });
    }
  
    // 리듀서에서 변경된 state를 활용한 로직
  };
  const mymid2 = function (store) {
    return function (next) {
      return function (action) {
        console.log(store);
        console.log(next);
        console.log(action);
  
        next(action);
      };
    };
  };
  
  export function myMid(store) {
    console.log("store", store);
    return function (next) {
      console.log("next", next);
      return function (action) {
        console.log("action", action);
        return next(action);
      };
    };
  }
  
  /**
   * timeout
   */
  export const timeoutScheduler = (store) => (next) => (action) => {
    if (!action.meta || !action.meta.delay) {
      return next(action);
    }
    let timeoutId = setTimeout(() => {
      return next(action);
    }, action.meta.delay);
  
    return () => {
      console.log("Cancel");
      clearTimeout(timeoutId);
    };
  };
  