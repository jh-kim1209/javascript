import { memoize } from "./mission";

describe("Chapter 04: React 성능 최적화 메모이제이션 함수 검증", () => {
  
  test("Task 1: 동일한 인자로 여러 번 호출 시 원래 함수를 단 1회만 실행하고 캐시된 결과를 즉시 반환한다", () => {
    const computeFn = jest.fn((a: number, b: number) => a + b);
    const memoizedAdd = memoize(computeFn);

    expect(memoizedAdd(1, 2)).toBe(3);
    expect(memoizedAdd(1, 2)).toBe(3);
    expect(memoizedAdd(1, 2)).toBe(3);

    expect(computeFn).toHaveBeenCalledTimes(1);
  });

  test("Task 2: 인자의 값이 변경되면 함수를 재실행하고 캐시를 새로운 값으로 업데이트한다", () => {
    const computeFn = jest.fn((x: string) => x.toUpperCase());
    const memoizedUpper = memoize(computeFn);

    expect(memoizedUpper("hello")).toBe("HELLO");
    expect(memoizedUpper("world")).toBe("WORLD"); // 인자 변경
    expect(memoizedUpper("world")).toBe("WORLD"); // 동일 인자

    expect(computeFn).toHaveBeenCalledTimes(2);
  });

  test("Task 3: 인자가 객체인 경우 Object.is 참조 무결성을 확인하여 새로운 객체 참조 시 재실행한다", () => {
    const computeFn = jest.fn((obj: { count: number }) => obj.count * 2);
    const memoizedDouble = memoize(computeFn);

    const ref = { count: 10 };
    expect(memoizedDouble(ref)).toBe(20);
    expect(memoizedDouble(ref)).toBe(20); // 동일 참조
    expect(computeFn).toHaveBeenCalledTimes(1);

    expect(memoizedDouble({ count: 10 })).toBe(20); // 동일 구조이지만 다른 참조
    expect(computeFn).toHaveBeenCalledTimes(2);
  });

  test("Task 4: 인자의 개수가 다른 경우에도 변화를 올바르게 감지하여 재연산한다", () => {
    const computeFn = jest.fn((...args: number[]) => args.reduce((acc, cur) => acc + cur, 0));
    const memoizedSum = memoize(computeFn);

    expect(memoizedSum(1, 2)).toBe(3);
    expect(memoizedSum(1, 2, 3)).toBe(6); // 인자 개수 변경
    expect(computeFn).toHaveBeenCalledTimes(2);
  });
});
