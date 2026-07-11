import { jest } from "@jest/globals";
import { createStore } from "./mission.js";

describe("Chapter 15: 클로저와 상태 은닉 모듈 검증", () => {

  test("Task 1: createStore가 렉시컬 클로저 상태 은닉, 디스패치 및 구독 동작을 완수해야 합니다.", () => {
    const counterReducer = (state = { count: 0 }, action) => {
      switch (action.type) {
        case "INCREMENT":
          return { count: state.count + 1 };
        case "DECREMENT":
          return { count: state.count - 1 };
        default:
          return state;
      }
    };

    const store = createStore(counterReducer, { count: 0 });

    // 초기 상태 검사
    expect(store.getState()).toEqual({ count: 0 });

    // 구독 알림 검사
    const listener = jest.fn();
    const unsubscribe = store.subscribe(listener);

    store.dispatch({ type: "INCREMENT" });
    expect(store.getState().count).toBe(1);
    expect(listener).toHaveBeenCalledTimes(1);

    // 구독 해제 검사
    unsubscribe();
    store.dispatch({ type: "DECREMENT" });
    expect(store.getState().count).toBe(0);
    expect(listener).toHaveBeenCalledTimes(1); // 구독 해제 후에는 listener가 추가 호출되지 않아야 함
  });

});
