import { parseRscPayload } from "./mission";

describe("Chapter 08: React Server Components (RSC) Payload 분석 검증", () => {
  test("Task 1: 단순 서버 엘리먼트 페이로드 파싱 및 트리 구성 검증", () => {
    const payload = `
      J0:SERVER:{"tag":"div","props":{"className":"wrapper"},"children":["Hello World"]}
    `;
    const roots = parseRscPayload(payload);
    expect(roots).toHaveLength(1);
    expect(roots[0]).toEqual({
      id: "J0",
      type: "server-element",
      nameOrTag: "div",
      props: { className: "wrapper" },
      children: ["Hello World"],
    });
  });

  test("Task 1: 클라이언트 컴포넌트 참조가 포함된 복합 트리 해독 검증", () => {
    const payload = `
      M1:CLIENT:{"name":"Counter","props":{"initial":10}}
      J0:SERVER:{"tag":"div","props":{"id":"main"},"children":["M1","Welcome"]}
    `;
    const roots = parseRscPayload(payload);
    expect(roots).toHaveLength(1);
    expect(roots[0].id).toBe("J0");
    expect(roots[0].type).toBe("server-element");
    expect(roots[0].children).toHaveLength(2);
    
    // M1 클라이언트 컴포넌트가 J0의 자식으로 올바르게 병합 및 해독되었는지 확인
    const firstChild = roots[0].children?.[0];
    expect(typeof firstChild).toBe("object");
    expect(firstChild).toEqual({
      id: "M1",
      type: "client-reference",
      nameOrTag: "Counter",
      props: { initial: 10 },
      children: [],
    });

    const secondChild = roots[0].children?.[1];
    expect(secondChild).toBe("Welcome");
  });

  test("Task 1: 순환 참조(Circular Reference) 발생 시 예외 감지 검증", () => {
    const payload = `
      J1:SERVER:{"tag":"div","props":{},"children":["J2"]}
      J2:SERVER:{"tag":"section","props":{},"children":["J1"]}
    `;
    expect(() => {
      parseRscPayload(payload);
    }).toThrow(/Circular reference/);
  });

  test("Task 1: 페이로드 포맷 오류(콜론 유실, 잘못된 JSON)에 대한 예외 처리 검증", () => {
    const invalidFormat = `
      J1:SERVER
    `;
    expect(() => {
      parseRscPayload(invalidFormat);
    }).toThrow(/Invalid RSC line format/);

    const invalidJson = `
      J1:SERVER:{tag:"div"}
    `;
    expect(() => {
      parseRscPayload(invalidJson);
    }).toThrow(/Invalid JSON/);
  });

  test("Task 1: 다중 루트 컴포넌트(독립된 두 트리) 반환 검증", () => {
    const payload = `
      J1:SERVER:{"tag":"header","props":{},"children":["HeaderContent"]}
      J2:SERVER:{"tag":"footer","props":{},"children":["FooterContent"]}
    `;
    const roots = parseRscPayload(payload);
    expect(roots).toHaveLength(2);
    expect(roots.map((r) => r.id)).toContain("J1");
    expect(roots.map((r) => r.id)).toContain("J2");
  });
});
