import { createCustomStore } from "./mission";

describe("Chapter 03: 커스텀 상태 엔진 직접 구현 검증", () => {
  
  test("Task 1: 초기 상태를 올바르게 설정하고 getState로 가져올 수 있다", () => {
    const store = createCustomStore({ count: 0, text: "hello" });
    
    expect(store.getState()).toEqual({ count: 0, text: "hello" });
  });

  test("Task 2: setState에 객체를 전달하면 기존 상태와 병합(Merge)된다", () => {
    const store = createCustomStore({ count: 0, text: "hello" });
    
    store.setState({ count: 1 });
    expect(store.getState()).toEqual({ count: 1, text: "hello" });

    store.setState({ text: "world" });
    expect(store.getState()).toEqual({ count: 1, text: "world" });
  });

  test("Task 3: setState에 콜백 함수를 전달하면 현재 상태를 바탕으로 업데이트가 병합된다", () => {
    const store = createCustomStore({ count: 5 });
    
    store.setState((state) => ({ count: state.count + 2 }));
    expect(store.getState()).toEqual({ count: 7 });
  });

  test("Task 4: 상태 변경 시 구독한 모든 리스너에게 통지한다", () => {
    const store = createCustomStore({ value: "A" });
    const listener1 = jest.fn();
    const listener2 = jest.fn();

    store.subscribe(listener1);
    store.subscribe(listener2);

    store.setState({ value: "B" });

    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(1);
  });

  test("Task 5: 동일한 상태값으로 setState 호출 시 Object.is 가드에 의해 리스너 통지를 스킵한다", () => {
    const store = createCustomStore({ value: "A" });
    const listener = jest.fn();

    store.subscribe(listener);

    // 동일한 값 설정
    store.setState({ value: "A" });

    expect(listener).not.toHaveBeenCalled();
  });

  test("Task 6: subscribe 반환 함수를 호출하면 정상적으로 구독이 해제되어 이후 알림을 받지 않는다", () => {
    const store = createCustomStore({ value: "A" });
    const listener = jest.fn();

    const unsubscribe = store.subscribe(listener);

    store.setState({ value: "B" });
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();

    store.setState({ value: "C" });
    expect(listener).toHaveBeenCalledTimes(1); // 여전히 1회
  });
});
