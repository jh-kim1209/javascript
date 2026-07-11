import { simulateContextNotification, ContextListener } from "./mission";

describe("Chapter 12: React Context API를 통한 상태 전파 및 리렌더링 최적화 한계 검증", () => {
  
  test("Task 1: 원시값(Primitive)이 변경되지 않았다면 전파를 생략하고 false를 반환해야 합니다.", () => {
    const renderMock1 = jest.fn();
    const renderMock2 = jest.fn();
    const listeners: ContextListener[] = [
      { id: "A", onRender: renderMock1 },
      { id: "B", onRender: renderMock2 }
    ];

    const result = simulateContextNotification(listeners, 100, 100);
    
    expect(result).toBe(false);
    expect(renderMock1).not.toHaveBeenCalled();
    expect(renderMock2).not.toHaveBeenCalled();
  });

  test("Task 1: 원시값(Primitive)이 변경되면 모든 리스너를 호출하고 true를 반환해야 합니다.", () => {
    const renderMock1 = jest.fn();
    const renderMock2 = jest.fn();
    const listeners: ContextListener[] = [
      { id: "A", onRender: renderMock1 },
      { id: "B", onRender: renderMock2 }
    ];

    const result = simulateContextNotification(listeners, 100, 200);
    
    expect(result).toBe(true);
    expect(renderMock1).toHaveBeenCalledTimes(1);
    expect(renderMock2).toHaveBeenCalledTimes(1);
  });

  test("Task 1: 메모이제이션 되지 않고 인라인으로 새로 생성된 객체는 값이 같더라도 리스너를 강제 실행해야 합니다.", () => {
    const renderMock = jest.fn();
    const listeners: ContextListener[] = [
      { id: "Consumer1", onRender: renderMock }
    ];

    const oldVal = { count: 0 };
    const newVal = { count: 0 }; // Same properties, different reference

    const result = simulateContextNotification(listeners, oldVal, newVal);
    
    expect(result).toBe(true);
    expect(renderMock).toHaveBeenCalledTimes(1);
  });

  test("Task 1: 메모이제이션 되어 동일한 참조를 유지하는 객체는 속성이 있더라도 전파를 차단하고 false를 반환해야 합니다.", () => {
    const renderMock = jest.fn();
    const listeners: ContextListener[] = [
      { id: "Consumer1", onRender: renderMock }
    ];

    const value = { count: 5 }; // Same reference

    const result = simulateContextNotification(listeners, value, value);
    
    expect(result).toBe(false);
    expect(renderMock).not.toHaveBeenCalled();
  });
});
