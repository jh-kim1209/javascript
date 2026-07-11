/**
 * @jest-environment jsdom
 */
import { mount } from "./mission";

describe("Chapter 02: 가상 DOM 렌더러 직접 빌드 검증", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  test("Task 1: 단순 텍스트 노드를 브라우저 DOM에 정확하게 마운트하고 반환한다", () => {
    const textNode = mount("Hello World", container);
    
    expect(textNode.nodeType).toBe(Node.TEXT_NODE);
    expect(textNode.textContent).toBe("Hello World");
    expect(container.innerHTML).toBe("Hello World");
  });

  test("Task 2: ElementNode 속성(props) 및 className을 처리하여 실제 엘리먼트로 마운트한다", () => {
    const vnode = {
      type: "div",
      props: { id: "test-id", className: "container-box", title: "Tooltip" },
      children: []
    };

    const el = mount(vnode, container) as HTMLElement;

    expect(el.nodeType).toBe(Node.ELEMENT_NODE);
    expect(el.tagName.toLowerCase()).toBe("div");
    expect(el.id).toBe("test-id");
    expect(el.className).toBe("container-box");
    expect(el.getAttribute("title")).toBe("Tooltip");
    expect(container.contains(el)).toBe(true);
  });

  test("Task 3: 이벤트 속성(on로 시작하는 함수형 prop)을 실제 DOM 리스너로 등록한다", () => {
    const clickHandler = jest.fn();
    const vnode = {
      type: "button",
      props: { onClick: clickHandler },
      children: ["클릭"]
    };

    const el = mount(vnode, container) as HTMLButtonElement;
    el.click();

    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  test("Task 4: 자식 노드 리스트를 재귀적으로 순회하여 전체 서브트리를 올바르게 구성한다", () => {
    const vnode = {
      type: "ul",
      props: { className: "list" },
      children: [
        { type: "li", props: {}, children: ["사과"] },
        { type: "li", props: {}, children: ["바나나"] }
      ]
    };

    const el = mount(vnode, container) as HTMLElement;

    expect(el.children.length).toBe(2);
    expect(el.children[0].textContent).toBe("사과");
    expect(el.children[1].textContent).toBe("바나나");
  });
});
