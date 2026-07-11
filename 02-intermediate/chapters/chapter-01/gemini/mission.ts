/**
 * Chapter 01: TypeScript 설치 및 컴파일러 환경 구성
 */

/**
 * Task 1: 컴파일러 설정 상태 파싱
 * tsconfig.json 객체를 파악하여 strict, target, module 속성의 현재 설정 값을 파싱하여 객체로 반환합니다.
 * @param {any} config - tsconfig.json 설정 내용을 담은 객체
 * @returns {{ strict: boolean; target: string; module: string }} 컴파일러 설정 요약 객체
 */
export function getCompilerStatus(config: any): { strict: boolean; target: string; module: string } {
  // TODO: config.compilerOptions에서 strict, target, module 값을 안전하게 추출하고 포맷팅하여 반환하세요.
  return {
    strict: false,
    target: "ES3",
    module: "commonjs"
  };
}
