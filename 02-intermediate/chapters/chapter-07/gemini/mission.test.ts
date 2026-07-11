import { createVirtualElement } from "./mission";

describe("Chapter 07: React 가상 DOM의 실체와 빌드 시스템 이해 검증", () => {
  test("Task 1: 단순한 태그와 props를 입력받아 VirtualNode 객체를 생성해야 합니다.", () => {
    const result = createVirtualElement("div", { id: "container", className: "box" });

    expect(result).toEqual({
      type: "div",
      props: {
        id: "container",
        className: "box",
        children: []
      }
    });
  });

  test("Task 1: props가 null로 전달될 경우 빈 객체로 변환하여 처리해야 합니다.", () => {
    const result = createVirtualElement("span", null);

    expect(result).toEqual({
      type: "span",
      props: {
        children: []
      }
    });
  });

  test("Task 1: 텍스트 및 중첩된 자식 가상 DOM 엘리먼트들을 평탄화하고 문자열 변환을 거쳐 children 배열로 취합해야 합니다.", () => {
    const childNode = createVirtualElement("p", null, "Hello World");
    const result = createVirtualElement(
      "div",
      { className: "parent" },
      "텍스트 노드",
      childNode,
      [123, "중첩된 배열 요소"]
    );

    expect(result.props.children).toEqual([
      "텍스트 노드",
      childNode,
      "123",
      "중첩된 배열 요소"
    ]);
  });
});
