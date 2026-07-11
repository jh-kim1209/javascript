/**
 * Chapter 11: 네트워크 스트리밍: ReadableStream 수집 및 실시간 chunk 파싱 가공
 */

/**
 * Task 1: ReadableStream을 수집하고 실시간으로 디코딩 및 가공 처리
 * @param stream - Uint8Array 바이너리 청크를 방출하는 ReadableStream
 * @param chunkCallback - 디코딩된 텍스트 조각을 수신하는 콜백 함수
 * @returns Promise<string> - 최종 누적된 전체 텍스트
 */
export async function processReadableStream(
  stream: ReadableStream<Uint8Array>,
  chunkCallback: (text: string) => void
): Promise<string> {
  // TODO: ReadableStream의 리더를 열고 TextDecoder를 사용하여 바이너리 청크를 텍스트로 실시간 디코딩 및 누적 처리하십시오.
  // 매 청크 수집 시마다 chunkCallback을 호출하고, 스트림이 완료되면 최종 전체 텍스트를 반환해야 합니다.
  throw new Error('Not implemented');
}
