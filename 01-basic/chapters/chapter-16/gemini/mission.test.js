/**
 * @jest-environment jsdom
 */
import { toggleHighlight } from './mission.js';

describe('Chapter 16: DOM 요소 조회와 스타일 제어 검증', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('Task 1: 요소를 조회하여 highlight 클래스를 정상적으로 추가하고 true를 반환해야 합니다.', () => {
    const div = document.createElement('div');
    div.id = 'target';
    document.body.appendChild(div);

    const result = toggleHighlight('target');
    expect(result).toBe(true);
    expect(div.classList.contains('highlight')).toBe(true);
  });

  test('Task 1: highlight 클래스가 이미 있을 경우 토글 시 제거하고 false를 반환해야 합니다.', () => {
    const div = document.createElement('div');
    div.id = 'target';
    div.classList.add('highlight');
    document.body.appendChild(div);

    const result = toggleHighlight('target');
    expect(result).toBe(false);
    expect(div.classList.contains('highlight')).toBe(false);
  });

  test('Task 1: 존재하지 않는 ID로 호출 시 false를 반환해야 합니다.', () => {
    const result = toggleHighlight('non-existent');
    expect(result).toBe(false);
  });
});
