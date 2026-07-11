import { mergeAndNormalize } from "./mission";
import type { AppConfig } from "./mission";

describe("Chapter 03: 인터페이스와 타입 별칭의 차이 검증", () => {
  test("Task 1: 모든 설정 정보가 포함된 경우 올바르게 정규화하고 속성을 유지해야 합니다.", () => {
    const config: AppConfig = {
      apiEndpoint: "  https://api.example.com/v1  ",
      timeout: 5000,
      retryCount: 5
    };

    const result = mergeAndNormalize(config);
    expect(result).toEqual({
      apiEndpoint: "https://api.example.com/v1",
      timeout: 5000,
      retryCount: 5
    });
  });

  test("Task 1: 선택적 속성인 retryCount가 생략된 경우 기본값인 3으로 병합되어야 합니다.", () => {
    const config: AppConfig = {
      apiEndpoint: "https://api.example.com/v2",
      timeout: 3000
    };

    const result = mergeAndNormalize(config);
    expect(result.retryCount).toBe(3);
  });

  test("Task 1: timeout 설정값이 음수로 주어졌을 때 0으로 보정해야 합니다.", () => {
    const config: AppConfig = {
      apiEndpoint: "https://api.example.com/v3",
      timeout: -100
    };

    const result = mergeAndNormalize(config);
    expect(result.timeout).toBe(0);
  });
});
