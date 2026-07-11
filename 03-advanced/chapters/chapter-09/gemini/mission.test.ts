import { resolveRouteBuildStrategy } from "./mission";

describe("Chapter 09: SSR 및 Static Generation (SSG) 빌드 메커니즘 검증", () => {
  test("Task 1: 일반 정적 페이지에 대한 SSG 전략 결정 검증", () => {
    const strategy = resolveRouteBuildStrategy("/about", false, false);
    expect(strategy).toBe("SSG");
  });

  test("Task 1: 정적 페이지이지만 headers/cookies 접근 시 SSR 전략 결정 검증", () => {
    const strategy = resolveRouteBuildStrategy("/about", true, false);
    expect(strategy).toBe("SSR");
  });

  test("Task 1: 동적 라우트 매개변수가 포함된 페이지의 ISR 전략 결정 검증 (headers 호출 없음)", () => {
    const strategy1 = resolveRouteBuildStrategy("/posts/[id]", false, true);
    expect(strategy1).toBe("ISR");

    // hasParams가 false여도 라우트 경로에 브래킷이 포함되어 있으면 ISR로 분류
    const strategy2 = resolveRouteBuildStrategy("/posts/[id]", false, false);
    expect(strategy2).toBe("ISR");
  });

  test("Task 1: 동적 라우트 매개변수가 있으나 headers 호출 시 SSR 전략 결정 검증", () => {
    const strategy = resolveRouteBuildStrategy("/posts/[id]", true, true);
    expect(strategy).toBe("SSR");
  });

  test("Task 1: 중첩 동적 라우트(/shop/[category]/[productId])에 대한 빌드 전략 검증", () => {
    const staticParamsStrategy = resolveRouteBuildStrategy(
      "/shop/[category]/[productId]",
      false,
      true
    );
    expect(staticParamsStrategy).toBe("ISR");

    const dynamicHeadersStrategy = resolveRouteBuildStrategy(
      "/shop/[category]/[productId]",
      true,
      true
    );
    expect(dynamicHeadersStrategy).toBe("SSR");
  });
});
