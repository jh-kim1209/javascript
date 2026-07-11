/**
 * Chapter 07: Next.js App Router 아키텍처 분석 및 Server/Client Component 경계 설계
 */

/**
 * Task 1: React Server/Client Component 경계 검증 정적 분석기 구현
 * 코드의 'use client' 선언 유무 및 내부 훅/이벤트 핸들러/서버 모듈 사용 여부를 검사해 올바른 서버/클라이언트 바운더리 위반을 적출합니다.
 * @param componentName - 컴포넌트 이름
 * @param code - 컴포넌트 소스 코드 문자열
 * @returns { isClient: boolean, errors: string[] } - 클라이언트 컴포넌트 여부 및 감지된 에러 목록
 */
export function validateComponentBoundary(
  componentName: string,
  code: string
): { isClient: boolean; errors: string[] } {
  // TODO: 'use client' 존재 여부를 판별하여 서버/클라이언트 컴포넌트로 나눕니다.
  // 서버 컴포넌트 내부에서 리액트 훅 호출 및 JSX 이벤트 핸들러(onClick 등) 사용을 감지하여 에러에 담습니다.
  // 클라이언트 컴포넌트 내부에서 'server-only' 임포트 및 Node.js 서버 모듈(fs, child_process 등) 임포트를 감지하여 에러에 담습니다.
  throw new Error("Not implemented");
}
