import { detectHydrationMismatch, VirtualNode } from "./mission";

describe("Chapter 10: Hydration Mismatch 디버깅 엔진 검증", () => {
  test("Task 1: 서버 HTML과 클라이언트 가상 돔이 완벽히 일치할 때 빈 로그 검증", () => {
    const html = `<div class="wrapper"><span id="hello">Hi</span></div>`;
    const clientDom: VirtualNode = {
      tag: "div",
      props: { className: "wrapper" },
      children: [
        {
          tag: "span",
          props: { id: "hello" },
          children: ["Hi"],
        },
      ],
    };

    const logs = detectHydrationMismatch(html, clientDom);
    expect(logs).toEqual([]);
  });

  test("Task 1: 태그명 불일치 감지 및 경로 기록 검증", () => {
    const html = `<div><span>Hi</span></div>`;
    const clientDom: VirtualNode = {
      tag: "div",
      props: {},
      children: [
        {
          tag: "p", // 서버는 span 이었으나 클라이언트는 p 인 경우
          props: {},
          children: ["Hi"],
        },
      ],
    };

    const logs = detectHydrationMismatch(html, clientDom);
    expect(logs).toHaveLength(1);
    expect(logs[0]).toEqual({
      type: "TAG_MISMATCH",
      path: "div > p",
      server: "span",
      client: "p",
    });
  });

  test("Task 1: 속성(class/className, id) 불일치 및 속성명 경로 기록 검증", () => {
    const html = `<div class="server-class" id="main"><span>Hi</span></div>`;
    const clientDom: VirtualNode = {
      tag: "div",
      // class 대신 className을 정상 비교하는지 확인
      props: { className: "client-class", id: "main" },
      children: [
        {
          tag: "span",
          props: {},
          children: ["Hi"],
        },
      ],
    };

    const logs = detectHydrationMismatch(html, clientDom);
    expect(logs).toHaveLength(1);
    expect(logs[0]).toEqual({
      type: "ATTR_MISMATCH",
      path: "div (className)",
      server: "server-class",
      client: "client-class",
    });
  });

  test("Task 1: 텍스트 내용 불일치(new Date() 등 랜덤 값) 감지 검증", () => {
    const html = `<div><span id="time">2026. 07. 09. 21:00:00</span></div>`;
    const clientDom: VirtualNode = {
      tag: "div",
      props: {},
      children: [
        {
          tag: "span",
          props: { id: "time" },
          children: ["2026. 07. 09. 21:00:05"], // 클라이언트에서 하이드레이션 시점에 5초 증가한 경우
        },
      ],
    };

    const logs = detectHydrationMismatch(html, clientDom);
    expect(logs).toHaveLength(1);
    expect(logs[0]).toEqual({
      type: "TEXT_MISMATCH",
      path: "div > span > text",
      server: "2026. 07. 09. 21:00:00",
      client: "2026. 07. 09. 21:00:05",
    });
  });

  test("Task 1: 자식 노드 개수 불일치 감지 검증", () => {
    const html = `<div><span>Hi</span><span>Friend</span></div>`;
    const clientDom: VirtualNode = {
      tag: "div",
      props: {},
      children: [
        {
          tag: "span",
          props: {},
          children: ["Hi"],
        },
        // 클라이언트에서 두 번째 span을 유실한 경우
      ],
    };

    const logs = detectHydrationMismatch(html, clientDom);
    expect(logs).toHaveLength(1);
    expect(logs[0]).toEqual({
      type: "CHILD_COUNT_MISMATCH",
      path: "div",
      server: "2",
      client: "1",
    });
  });

  test("Task 1: 자식 구조 불일치(텍스트 vs 엘리먼트) 감지 검증", () => {
    const html = `<div><span>Hi</span></div>`;
    const clientDom: VirtualNode = {
      tag: "div",
      props: {},
      children: [
        "Hi", // 서버는 span 엘리먼트이나 클라이언트는 평이한 텍스트로 렌더링한 경우
      ],
    };

    const logs = detectHydrationMismatch(html, clientDom);
    expect(logs).toHaveLength(1); // TAG_MISMATCH만 발생 (자식 노드 개수는 둘 다 1개)
    expect(logs.map((l) => l.type)).toContain("TAG_MISMATCH");
    expect(logs.find((l) => l.type === "TAG_MISMATCH")).toEqual({
      type: "TAG_MISMATCH",
      path: "div > text",
      server: "span",
      client: "text",
    });
  });
});
