import { createMockWorkerEnv } from "./mission";

describe("Chapter 06: 동적 스레드 병렬 처리 검증", () => {
  test("Task 1: 기본적인 비동기 postMessage/onmessage 통신 검증", (done) => {
    const script = `
      self.onmessage = (e) => {
        self.postMessage(e.data + 10);
      };
    `;
    const worker = createMockWorkerEnv(script);

    worker.onmessage = (e) => {
      expect(e.data).toBe(15);
      worker.terminate();
      done();
    };

    worker.postMessage(5);
  });

  test("Task 1: 워커 스레드 내 DOM API(window) 참조 시 초기화 시점에 ReferenceError 발생 검증", () => {
    const scriptWithWindow = `
      const win = window;
    `;
    expect(() => createMockWorkerEnv(scriptWithWindow)).toThrow(ReferenceError);
  });

  test("Task 1: 워커 스레드 내 DOM API(document) 참조 시 초기화 시점에 ReferenceError 발생 검증", () => {
    const scriptWithDocument = `
      const doc = document;
    `;
    expect(() => createMockWorkerEnv(scriptWithDocument)).toThrow(ReferenceError);
  });

  test("Task 1: 워커 스레드 핸들러 내 DOM API 참조 시 런타임 ReferenceError 발생 및 onerror 전파 검증", (done) => {
    const script = `
      self.onmessage = (e) => {
        const doc = document;
      };
    `;
    const worker = createMockWorkerEnv(script);

    worker.onerror = (err) => {
      expect(err).toBeInstanceOf(ReferenceError);
      worker.terminate();
      done();
    };

    worker.postMessage("trigger");
  });

  test("Task 1: postMessage 시 함수 전송 시 Structured Clone 한계로 인한 DataCloneError 검증", () => {
    const script = `
      self.onmessage = (e) => {
        self.postMessage(e.data);
      };
    `;
    const worker = createMockWorkerEnv(script);

    // 메인 스레드에서 워커로 함수를 보낼 때 동기적으로 에러 발생
    expect(() => {
      worker.postMessage(() => {});
    }).toThrow(/DataCloneError/);

    worker.terminate();
  });

  test("Task 1: terminate 호출 이후 메시지 송수신 차단 검증", (done) => {
    const script = `
      self.onmessage = (e) => {
        self.postMessage(e.data);
      };
    `;
    const worker = createMockWorkerEnv(script);
    let messageCount = 0;

    worker.onmessage = () => {
      messageCount++;
    };

    worker.postMessage("first");
    worker.terminate();
    worker.postMessage("second");

    setTimeout(() => {
      // terminate가 호출되었으므로 어떠한 메시지도 콜백되지 않아야 함 (혹은 첫 메시지도 실행 도중 취소됨)
      expect(messageCount).toBe(0);
      done();
    }, 20);
  });
});
