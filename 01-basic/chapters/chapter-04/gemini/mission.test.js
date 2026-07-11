import { getFallbackName, safeGetAge } from "./mission.js";

describe("Chapter 04: 기본 연산자와 null 병합 연산자 검증", () => {

  test("Task 1: getFallbackName이 ?? 연산자를 활용하여 빈 문자열은 보존하고 nullish인 경우만 대체해야 합니다.", () => {
    expect(getFallbackName("Alice")).toBe("Alice");
    expect(getFallbackName("")).toBe("");
    expect(getFallbackName(null)).toBe("Guest");
    expect(getFallbackName(undefined)).toBe("Guest");
  });

  test("Task 2: safeGetAge가 0을 유효 숫자로 판단하여 0을 반환하고 nullish인 경우만 100을 반환해야 합니다.", () => {
    expect(safeGetAge(25)).toBe(25);
    expect(safeGetAge(0)).toBe(0);
    expect(safeGetAge(null)).toBe(100);
    expect(safeGetAge(undefined)).toBe(100);
  });

});
