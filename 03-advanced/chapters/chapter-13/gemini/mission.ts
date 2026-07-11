/**
 * Chapter 13: 컨테이너화 가상화: Docker 파일 작성 및 로컬 개발용 컨테이너 빌드
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Task 1: Dockerfile 설정 내용을 분석하여 필수 지시어 준수 및 캐싱 최적화 정적 검증 수행
 * @param dockerfileContent - Dockerfile 내용 문자열
 * @returns ValidationResult - 검증 결과와 발견된 오류 목록
 */
export function validateDockerfile(dockerfileContent: string): ValidationResult {
  // TODO: Dockerfile 설정을 줄 단위로 파싱하여 FROM, WORKDIR, CMD (혹은 ENTRYPOINT) 지시어가 올바른 순서로 선언되었는지 검증하고,
  // COPY와 RUN npm install의 순서 배치로 인한 레이어 캐싱 위반 사례가 없는지 판별하여 ValidationResult 형태로 반환하십시오.
  throw new Error('Not implemented');
}
