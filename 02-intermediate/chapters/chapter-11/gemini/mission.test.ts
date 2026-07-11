import { createCustomHookSimulator } from "./mission";

describe("Chapter 11: React 커스텀 훅(Custom Hooks) 설계 및 로직 재사용 검증", () => {
  
  test("Task 1: 첫 렌더링 시 전달된 초깃값들이 정상적으로 훅 상태 배열에 반영되어야 합니다.", () => {
    const simulator = createCustomHookSimulator(0);
    let val1 = 0;
    let val2 = 0;

    simulator.render(() => {
      const [v1] = simulator.useState(10);
      const [v2] = simulator.useState(20);
      val1 = v1;
      val2 = v2;
    });

    expect(val1).toBe(10);
    expect(val2).toBe(20);
    expect(simulator.getHookStates()).toEqual([10, 20]);
  });

  test("Task 1: 상태 업데이트(Setter) 호출 후 다음 렌더링 시 기존 상태가 올바르게 복원되어 유지되어야 합니다.", () => {
    const simulator = createCustomHookSimulator();
    let val = 0;
    let setVal: any;

    const renderFn = () => {
      const [v, s] = simulator.useState(5);
      val = v;
      setVal = s;
    };

    simulator.render(renderFn);
    expect(val).toBe(5);

    setVal(15);
    simulator.render(renderFn);
    expect(val).toBe(15);
  });

  test("Task 1: Setter의 함수형 업데이트가 정상적으로 작동하고 변경 사항이 유지되어야 합니다.", () => {
    const simulator = createCustomHookSimulator(0);
    let count = 0;
    let increment: any;

    const renderFn = () => {
      const [c, s] = simulator.useState(100);
      count = c;
      increment = () => s((prev: number) => prev + 1);
    };

    simulator.render(renderFn);
    expect(count).toBe(100);

    increment();
    simulator.render(renderFn);
    expect(count).toBe(101);
  });

  test("Task 1: 조건부 훅 호출로 인해 렌더링 간 훅의 호출 횟수가 달라지면 Rules of Hooks Violation 에러를 던져야 합니다.", () => {
    const simulator = createCustomHookSimulator("default");
    let isSecondRenderWithHook = true;

    const renderFn = () => {
      simulator.useState(1);
      if (isSecondRenderWithHook) {
        simulator.useState(2);
      }
      simulator.useState(3);
    };

    // First render: 3 hooks called
    simulator.render(renderFn);

    // Second render: 2 hooks called due to condition change
    isSecondRenderWithHook = false;
    expect(() => {
      simulator.render(renderFn);
    }).toThrow("Rules of Hooks Violation");
  });
});
