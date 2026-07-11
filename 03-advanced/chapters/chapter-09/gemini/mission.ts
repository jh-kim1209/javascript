/**
 * Chapter 09: SSR 및 Static Generation (SSG) 빌드 메커니즘
 */

/**
 * Task 1: 라우트 빌드 전략 결정 헬퍼 함수 구현
 * 지정된 라우트 명세의 동적 API 호출 여부 및 매개변수 유무를 해석하여 빌드 전략을 자동 분류 결정합니다.
 * @param route - 라우트 경로 문자열 (예: '/about', '/posts/[id]')
 * @param hasHeadersCall - headers() 또는 cookies() 등 동적 요청 정보에 접근하는 API 호출 여부
 * @param hasParams - 동적 라우트 매개변수(Dynamic Route Parameters)의 존재 여부
 * @returns 'SSG' | 'SSR' | 'ISR' - 결정된 빌드 전략
 */
export function resolveRouteBuildStrategy(
  route: string,
  hasHeadersCall: boolean,
  hasParams: boolean
): "SSG" | "SSR" | "ISR" {
  // TODO: 동적 API 호출(headers 등)이 있을 경우, 동적 라우트 매개변수가 있을 경우,
  // 그리고 일반 정적 경로일 경우의 빌드 전략을 각각 SSR, ISR, SSG로 분류하여 반환하십시오.
  throw new Error("Not implemented");
}
