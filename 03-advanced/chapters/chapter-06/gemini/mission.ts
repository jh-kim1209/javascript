/**
 * Chapter 06: 동적 스레드 병렬 처리: Web Workers를 이용한 CPU 무거운 연산 분산
 */

export interface MockWorker {
  postMessage(message: any): void;
  onmessage: ((event: { data: any }) => void) | null;
  onerror: ((error: any) => void) | null;
  terminate(): void;
}

/**
 * Task 1: Web Worker 모의 실행 환경 생성기 구현
 * 메인 스레드와 워커 간의 메시지 송수신 및 콜백 시뮬레이션을 구현하여 비동기 병렬 연산 정합성을 검증하는 시뮬레이터를 구현합니다.
 * @param workerScript - 워커 스레드 내부에서 실행될 JavaScript 코드 문자열
 * @returns MockWorker - 메인 스레드에서 조작할 수 있는 워커 인터페이스
 */
export function createMockWorkerEnv(workerScript: string): MockWorker {
  // TODO: Node.js의 node:vm 모듈을 활용하여 window/document가 없는 격리 스코프 샌드박스를 만들고,
  // postMessage/onmessage 인터페이스 및 비동기 전송 흐름을 시뮬레이션하세요.
  throw new Error("Not implemented");
}
