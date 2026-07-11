import { calculateDiscount } from "./mission";

describe("Chapter 04: TypeScript 함수 타이핑 및 선택적 매개변수 검증", () => {
  test("Task 1: 원가만 전달된 경우 할인율 0%, 세율 10%의 기본값을 적용하여 계산해야 합니다.", () => {
    // 1000 * (1 - 0) * (1 + 0.1) = 1100
    expect(calculateDiscount(1000)).toBe(1100);
  });

  test("Task 1: 원가와 할인율만 전달된 경우 세율 10%의 기본값을 적용하여 계산해야 합니다.", () => {
    // 1000 * (1 - 0.2) * (1 + 0.1) = 800 * 1.1 = 880
    expect(calculateDiscount(1000, 0.2)).toBeCloseTo(880);
  });

  test("Task 1: 모든 매개변수가 명시된 경우 전달된 값을 기준으로 정확하게 연산해야 합니다.", () => {
    // 1000 * (1 - 0.5) * (1 + 0.05) = 500 * 1.05 = 525
    expect(calculateDiscount(1000, 0.5, 0.05)).toBeCloseTo(525);
  });
});
