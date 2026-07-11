/** @jest-environment jsdom */
import { jest } from '@jest/globals';
import { setupTodoDelegation } from './mission.js';

describe('Chapter 19: 이벤트 위임 패턴과 성능 최적화 검증', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    container.innerHTML = `
      <ul id="todo-list">
        <li data-id="101">공부하기<button class="delete-btn">삭제</button></li>
        <li data-id="102">운동하기<button class="delete-btn">삭제</button></li>
        <li data-id="103">책 읽기 (버튼 없음)</li>
      </ul>
    `;
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  test('Task 1: 삭제 버튼 클릭 시 올바른 id와 text를 가지고 콜백이 호출되는가', () => {
    const deleteCallback = jest.fn();
    setupTodoDelegation('todo-list', deleteCallback);

    const firstDeleteBtn = document.querySelector("#todo-list li[data-id='101'] button.delete-btn");
    firstDeleteBtn.click();

    expect(deleteCallback).toHaveBeenCalledTimes(1);
    expect(deleteCallback).toHaveBeenCalledWith('101', '공부하기');
  });

  test('Task 1: 삭제 버튼이 아닌 영역을 클릭했을 때 콜백이 호출되지 않는가', () => {
    const deleteCallback = jest.fn();
    setupTodoDelegation('todo-list', deleteCallback);

    const noButtonLi = document.querySelector("#todo-list li[data-id='103']");
    noButtonLi.click();

    expect(deleteCallback).not.toHaveBeenCalled();
  });
});
