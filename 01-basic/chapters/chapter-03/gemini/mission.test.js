import { parseNumberSafely } from "./mission.js";

describe("Chapter 03: 동적 타이핑과 형 변환 검증", () => {

  test("Task 1: parseNumberSafely가 값을 숫자로 안전하게 변환하고 NaN을 검출해야 합니다.", () => {
    expect(parseNumberSafely("123")).toBe(123);
    expect(parseNumberSafely(45.6)).toBe(45.6);
    expect(parseNumberSafely("hello")).toBe("NaN_Detected");
    expect(parseNumberSafely(undefined)).toBe("NaN_Detected");
    expect(parseNumberSafely(null)).toBe(0);
  });

});
