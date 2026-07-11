/**
 * @jest-environment jsdom
 */

import { TextEncoder, TextDecoder } from 'util';
import { ReadableStream } from 'stream/web';

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder as any;
}
if (typeof global.ReadableStream === 'undefined') {
  global.ReadableStream = ReadableStream as any;
}

import { renderLlmStream } from './mission';

describe('Chapter 12: AI LLM API 연동 및 스트리밍 답변 화면 실시간 렌더링 검증', () => {
  let domElement: HTMLElement;
  const encoder = new TextEncoder();

  beforeEach(() => {
    domElement = document.createElement('div');
    domElement.style.height = '100px';
    domElement.style.overflowY = 'scroll';
    // JSDOM scrollHeight mock
    Object.defineProperty(domElement, 'scrollHeight', {
      configurable: true,
      get() {
        return 200; // Mocked scrollHeight
      },
    });
    // Track scrollTop setting
    domElement.scrollTop = 0;
  });

  test('Task 1: 기본 토큰 JSON 포맷의 SSE 스트리밍 데이터를 DOM에 실시간 반영하고 스크롤을 하단 고정하는지 검증', async () => {
    const sseData = [
      'data: {"token": "Hello "}\n\n',
      'data: {"token": "world!"}\n\n',
      'data: [DONE]\n\n',
    ];

    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        for (const data of sseData) {
          controller.enqueue(encoder.encode(data));
        }
        controller.close();
      },
    });

    await renderLlmStream(stream as any, domElement);

    expect(domElement.innerHTML).toBe('Hello world!');
    expect(domElement.scrollTop).toBe(200);
  });

  test('Task 1: OpenAI 사양의 델타 JSON 포맷(choices.delta.content)을 지원하며 올바르게 파싱해 렌더링하는지 검증', async () => {
    const sseData = [
      'data: {"choices":[{"delta":{"content":"Hi "}}]}\n\n',
      'data: {"choices":[{"delta":{"content":"there"}}]}\n\n',
      'data: [DONE]\n\n',
    ];

    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        for (const data of sseData) {
          controller.enqueue(encoder.encode(data));
        }
        controller.close();
      },
    });

    await renderLlmStream(stream as any, domElement);

    expect(domElement.innerHTML).toBe('Hi there');
  });

  test('Task 1: 비JSON 일반 텍스트 포맷의 SSE 유입 시에도 안전한 폴백을 수행하는지 검증', async () => {
    const sseData = ['data: Normal text stream\n\n', 'data: is active\n\n', 'data: [DONE]\n\n'];

    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        for (const data of sseData) {
          controller.enqueue(encoder.encode(data));
        }
        controller.close();
      },
    });

    await renderLlmStream(stream as any, domElement);

    expect(domElement.innerHTML).toBe('Normal text streamis active');
  });

  test('Task 1: SSE 데이터가 청크 경계에서 잘려 여러 번으로 유입되어도 버퍼링을 통해 온전히 결합 복원되는지 검증', async () => {
    // data: {"token": "Code"}가 중간에 찢어져 유입
    const chunk1 = 'data: {"token": "Co';
    const chunk2 = 'de"}\n\ndata: {"token": " ';
    const chunk3 = 'Block"}\n\ndata: [DONE]\n\n';

    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode(chunk1));
        controller.enqueue(encoder.encode(chunk2));
        controller.enqueue(encoder.encode(chunk3));
        controller.close();
      },
    });

    await renderLlmStream(stream as any, domElement);

    expect(domElement.innerHTML).toBe('Code Block');
  });
});
