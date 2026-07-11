import { simulateEffect, resetSimulator, getSimulatorStats, triggerUnmount } from "./mission";

describe("Chapter 10: useEffect 생명주기와 부수 효과 제어 검증", () => {
  beforeEach(() => {
    resetSimulator();
  });

  test("Task 1: 첫 렌더링(마운트) 시 이펙트 함수가 실행되고, 클린업은 아직 실행되지 않아야 합니다.", () => {
    let effectExecuted = false;
    simulateEffect([10], () => {
      effectExecuted = true;
      return () => {};
    });

    expect(effectExecuted).toBe(true);
    expect(getSimulatorStats()).toEqual({
      effectCount: 1,
      cleanupCount: 0
    });
  });

  test("Task 1: 의존성 배열의 값들이 변경되지 않았다면 이펙트와 클린업 모두 재호출되지 않아야 합니다.", () => {
    let runCount = 0;
    const effect = () => {
      runCount++;
      return () => {};
    };

    simulateEffect(["a", 1], effect);
    simulateEffect(["a", 1], effect);

    expect(runCount).toBe(1);
    expect(getSimulatorStats()).toEqual({
      effectCount: 1,
      cleanupCount: 0
    });
  });

  test("Task 1: 의존성 배열의 값 중 하나라도 변경되면 기존 클린업을 먼저 실행하고 새 이펙트를 실행해야 합니다.", () => {
    let cleanupRun = false;
    let effectRun = 0;

    const effect = () => {
      effectRun++;
      return () => {
        cleanupRun = true;
      };
    };

    simulateEffect([100], effect);
    simulateEffect([200], effect);

    expect(cleanupRun).toBe(true);
    expect(effectRun).toBe(2);
    expect(getSimulatorStats()).toEqual({
      effectCount: 2,
      cleanupCount: 1
    });
  });

  test("Task 1: triggerUnmount 호출 시 등록된 클린업 함수를 최종 호출하고 상태를 해제해야 합니다.", () => {
    let cleanupRun = false;

    simulateEffect([1], () => {
      return () => {
        cleanupRun = true;
      };
    });

    triggerUnmount();

    expect(cleanupRun).toBe(true);
    expect(getSimulatorStats().cleanupCount).toBe(1);
  });
});
