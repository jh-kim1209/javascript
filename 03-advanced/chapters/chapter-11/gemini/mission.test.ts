import { processReadableStream } from './mission';

describe('Chapter 11: ReadableStream 수집 및 실시간 chunk 파싱 가공 검증', () => {
  test('Task 1: 영문 및 숫자 데이터 스트림을 실시간으로 수집하고 최종 텍스트를 완료 리턴하는지 검증', async () => {
    const encoder = new TextEncoder();
    const chunks = [
      encoder.encode('Hello '),
      encoder.encode('World! '),
      encoder.encode('Streaming JS.'),
    ];

    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        for (const chunk of chunks) {
          controller.enqueue(chunk);
        }
        controller.close();
      },
    });

    const receivedChunks: string[] = [];
    const callback = (text: string) => {
      receivedChunks.push(text);
    };

    const finalResult = await processReadableStream(stream, callback);

    expect(finalResult).toBe('Hello World! Streaming JS.');
    expect(receivedChunks).toEqual(['Hello ', 'World! ', 'Streaming JS.']);
  });

  test('Task 1: UTF-8 멀티바이트(한글) 경계가 잘려 유입되는 청크 스트림을 인코딩 깨짐 없이 복원하는지 검증', async () => {
    // '한' = [237, 149, 156]
    // '글' = [234, 184, 128]
    // '스' = [236, 138, 164]
    // '트' = [237, 138, 184]
    // '림' = [235, 166, 188]
    const chunk1 = new Uint8Array([237, 149]); // '한'의 일부 (2바이트)
    const chunk2 = new Uint8Array([156, 234, 184]); // '한'의 나머지 (1바이트) + '글'의 일부 (2바이트)
    const chunk3 = new Uint8Array([128, 32]); // '글'의 나머지 (1바이트) + 공백 ' ' (1바이트)
    const chunk4 = new Uint8Array([236, 138, 164, 237, 138]); // '스' (3바이트) + '트'의 일부 (2바이트)
    const chunk5 = new Uint8Array([184, 235, 166, 188]); // '트'의 나머지 (1바이트) + '림' (3바이트)

    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(chunk1);
        controller.enqueue(chunk2);
        controller.enqueue(chunk3);
        controller.enqueue(chunk4);
        controller.enqueue(chunk5);
        controller.close();
      },
    });

    const receivedChunks: string[] = [];
    const callback = (text: string) => {
      receivedChunks.push(text);
    };

    const finalResult = await processReadableStream(stream, callback);

    // 올바르게 디코딩되면 '한글 스트림'이 되어야 함
    expect(finalResult).toBe('한글 스트림');
    // 개별 chunkCallback 호출 시 전달된 조각들도 깨지지 않고 온전한 유니코드 결합 상태여야 함
    expect(receivedChunks.join('')).toBe('한글 스트림');
    // 깨짐 문자()가 결과에 없어야 함
    expect(finalResult).not.toContain('\uFFFD');
  });

  test('Task 1: 스트림 도중 예외가 발생할 경우 리더 락을 해제하고 에러를 상위로 전파하는지 검증', async () => {
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new Uint8Array([65])); // 'A'
        controller.error(new Error('Stream read failure'));
      },
    });

    const callback = jest.fn();

    await expect(processReadableStream(stream, callback)).rejects.toThrow('Stream read failure');
  });
});
