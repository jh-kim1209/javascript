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

import { initAiDashboard } from './mission';

describe('Chapter 15: 실시간 AI 대시보드 배포 통합 검증', () => {
  let container: HTMLElement;
  const encoder = new TextEncoder();

  beforeEach(() => {
    document.body.innerHTML = '<div id="app-container"></div>';
    container = document.getElementById('app-container')!;
  });

  test('Task 1: 스트림 데이터를 수집하여 대시보드 화면에 실시간으로 정상 출력하는지 검증', async () => {
    const sseData = [
      'data: {"token": "System Status: Online. "}\n\n',
      'data: {"token": "LLM API Active."}\n\n',
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

    initAiDashboard('app-container', stream as any);

    // Wait for the stream promise inside initAiDashboard to resolve
    // Since initAiDashboard returns void and runs stream reading as a background promise,
    // we yield microtask queue using await new Promise(resolve => setTimeout(resolve, 50));
    await new Promise((resolve) => setTimeout(resolve, 50));

    const outputNode = container.querySelector('.dashboard-output');
    const statusNode = container.querySelector('.dashboard-status');

    expect(outputNode).toBeTruthy();
    expect(statusNode).toBeTruthy();
    expect(outputNode?.innerHTML).toBe('System Status: Online. LLM API Active.');
    expect(statusNode?.classList.contains('CORS_OR_NETWORK_ERROR')).toBe(false);
  });

  test('Task 1: 스트림 도중 CORS 또는 네트워크 연결 예외 발생 시 에러 레이아웃으로 스위칭되는지 검증', async () => {
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode('data: {"token": "Connected..."}\n\n'));
        controller.error(new Error('CORS policy blocked access or connection reset'));
      },
    });

    initAiDashboard('app-container', stream as any);

    await new Promise((resolve) => setTimeout(resolve, 50));

    const outputNode = container.querySelector('.dashboard-output');
    const statusNode = container.querySelector('.dashboard-status');

    expect(outputNode).toBeTruthy();
    expect(statusNode).toBeTruthy();
    // 에러 발생으로 status 노드에 특정 에러 클래스가 결합되었는지 체크
    expect(statusNode?.classList.contains('CORS_OR_NETWORK_ERROR')).toBe(true);
    expect(statusNode?.innerHTML).toContain('CORS or Network Failure');
  });
});
