/**
 * Chapter 12: AI LLM API 연동 및 스트리밍 답변 화면 실시간 렌더링
 */

/**
 * Task 1: LLM SSE 스트리밍 데이터를 실시간으로 파싱하고 DOM 요소에 타이핑 렌더링 및 자동 스크롤
 * @param streamResponse - Uint8Array 바이너리 청크를 방출하는 ReadableStream
 * @param domElement - 실시간 답변을 출력할 대상 DOM 엘리먼트
 * @returns Promise<void>
 */
export async function renderLlmStream(
  streamResponse: ReadableStream<Uint8Array>,
  domElement: HTMLElement
): Promise<void> {
  // TODO: 스트리밍 응답(ReadableStream)의 바이너리 청크를 텍스트로 디코딩하고 SSE 포맷(data: ...) 라인들을 파싱하십시오.
  // 획득한 텍스트 조각을 domElement.innerHTML에 누적 반영하고 스크롤이 자동으로 하단에 위치하도록 제어하십시오.
  // 스트림이 완료되거나 [DONE] 토큰을 수신하면 종료되어야 합니다.
  throw new Error('Not implemented');
}
