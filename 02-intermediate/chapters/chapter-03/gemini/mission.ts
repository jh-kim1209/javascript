/**
 * Chapter 03: 인터페이스와 타입 별칭의 차이
 */

export interface BaseConfig {
  apiEndpoint: string;
}

export interface AppConfig extends BaseConfig {
  timeout: number;
}

// TODO: 선언 병합(Declaration Merging)을 통해 retryCount?: number 속성을 추가하세요.

/**
 * Task 1: 설정 정규화 및 병합
 * 입력받은 AppConfig 설정을 정규화하여 필수 필드를 완비한 객체로 반환합니다.
 * @param {AppConfig} config - 병합 및 정규화할 설정 객체
 * @returns {{ apiEndpoint: string; timeout: number; retryCount: number }} 정규화된 설정 객체
 */
export function mergeAndNormalize(config: AppConfig): {
  apiEndpoint: string;
  timeout: number;
  retryCount: number;
} {
  // TODO: apiEndpoint 공백 제거, timeout 음수 보정, retryCount 기본값 처리를 구현하고 반환하세요.
  return {
    apiEndpoint: "",
    timeout: 0,
    retryCount: 0
  };
}
