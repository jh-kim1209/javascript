import { createMiniZustandStore } from "./mission";

interface StoreState {
  count: number;
  text: string;
}

describe("Chapter 13: Zustand 라이브러리를 이용한 Flux 아키텍처 전역 상태 관리 검증", () => {
  let store: ReturnType<typeof createMiniZustandStore<StoreState>>;

  beforeEach(() => {
    store = createMiniZustandStore<StoreState>({ count: 0, text: "hello" });
  });

  afterEach(() => {
    store.clearSubscriptions();
  });

  test("Task 1: getState()는 현재 스토어의 전체 상태를 올바르게 반환해야 합니다.", () => {
    expect(store.getState()).toEqual({ count: 0, text: "hello" });
  });

  test("Task 1: setState() 호출 시 부분 상태 객체 또는 업데이터 함수에 따라 스토어가 부분 병합 및 업데이트되어야 합니다.", () => {
    // 1. 객체 형태로 부분 변경
    store.setState({ count: 10 });
    expect(store.getState()).toEqual({ count: 10, text: "hello" });

    // 2. 업데이터 함수 형태로 부분 변경
    store.setState((state) => ({ count: state.count + 5 }));
    expect(store.getState()).toEqual({ count: 15, text: "hello" });
  });

  test("Task 1: subscribe()로 등록된 순수 리스너는 setState()가 호출될 때마다 실행되어야 합니다.", () => {
    const listenerMock = jest.fn();
    const unsubscribe = store.subscribe(listenerMock);

    store.setState({ count: 1 });
    expect(listenerMock).toHaveBeenCalledTimes(1);

    store.setState({ text: "world" });
    expect(listenerMock).toHaveBeenCalledTimes(2);

    unsubscribe();
    store.setState({ count: 2 });
    expect(listenerMock).toHaveBeenCalledTimes(2); // Should not increase after unsubscribe
  });

  test("Task 1: useStore() 셀렉터 바인딩 시, 선택하지 않은 무관한 상태가 변경되면 렌더링 콜백(onRender)이 무시되어 호출되지 않아야 합니다.", () => {
    const renderCountMock = jest.fn();

    // count 필드만 구독
    const countVal = store.useStore((state) => state.count, renderCountMock);
    expect(countVal).toBe(0);

    // text 필드를 업데이트 (구독 중인 count와 무관)
    store.setState({ text: "changed" });
    expect(renderCountMock).not.toHaveBeenCalled();

    // count 필드를 업데이트
    store.setState({ count: 1 });
    expect(renderCountMock).toHaveBeenCalledTimes(1);
  });
});
