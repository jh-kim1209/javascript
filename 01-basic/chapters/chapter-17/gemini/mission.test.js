/**
 * @jest-environment jsdom
 */
import { createListItem } from './mission.js';

describe('Chapter 17: DOM 동적 생성과 삽입 검증', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('Task 1: 새로운 li 요소를 생성하여 지정된 컨테이너에 올바르게 삽입하고 해당 요소를 반환해야 합니다.', () => {
    const ul = document.createElement('ul');
    ul.id = 'list-container';
    document.body.appendChild(ul);

    const text = '새로운 아이템';
    const li = createListItem(text, 'list-container');

    expect(li).not.toBeNull();
    expect(li.tagName).toBe('LI');
    expect(li.textContent).toBe(text);
    expect(ul.contains(li)).toBe(true);
    expect(ul.children.length).toBe(1);
  });

  test('Task 1: 사용자 입력 문자열(HTML/Script 포함)을 textContent로 대입하여 XSS 위험을 방지해야 합니다.', () => {
    const ul = document.createElement('ul');
    ul.id = 'list-container';
    document.body.appendChild(ul);

    const maliciousText = '<script>alert("hack")</script>';
    const li = createListItem(maliciousText, 'list-container');

    expect(li.innerHTML).not.toBe(maliciousText);
    expect(li.textContent).toBe(maliciousText); // 태그가 파싱되지 않고 그대로 텍스트 처리되어야 함
  });

  test('Task 1: 존재하지 않는 컨테이너 ID를 지정했을 경우 요소를 삽입하지 않고 null을 반환해야 합니다.', () => {
    const li = createListItem('아이템', 'non-existent');
    expect(li).toBeNull();
  });
});
