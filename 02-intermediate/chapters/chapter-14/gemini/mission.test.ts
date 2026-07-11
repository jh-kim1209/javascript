/**
 * @jest-environment jsdom
 */
import { mockClickAndVerify } from "./mission";

describe("Chapter 14: Jest와 React Testing Library를 이용한 컴포넌트 단위 테스트 검증", () => {
  let element: HTMLButtonElement;
  let handler: jest.Mock;

  beforeEach(() => {
    element = document.createElement("button");
    element.textContent = "Click Me";
    handler = jest.fn();
    element.addEventListener("click", handler);
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  test("Task 1: 엘리먼트에 클릭 이벤트를 디스패치하고 핸들러의 호출을 검증해야 합니다.", () => {
    mockClickAndVerify(element, handler);
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
