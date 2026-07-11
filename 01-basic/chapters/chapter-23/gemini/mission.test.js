/** @jest-environment jsdom */
import { jest } from '@jest/globals';
import { initDashboard } from './mission.js';

describe('Chapter 23: 종합 마일스톤 프로젝트 검증', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    container.id = 'dashboard-container';
    document.body.appendChild(container);
    global.fetch = jest.fn();
  });

  afterEach(() => {
    document.body.removeChild(container);
    jest.restoreAllMocks();
  });

  test('Task 1: 성공적으로 데이터를 가져왔을 때 대시보드를 렌더링하고 삭제 기능이 정상 동작하는가', async () => {
    const mockProfile = {
      name: 'Alice',
      todos: [
        { id: '1', text: '공부하기' },
        { id: '2', text: '운동하기' },
      ],
    };

    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockProfile),
    });

    const initPromise = initDashboard('dashboard-container', 'user123');

    // Loading state check
    expect(container.querySelector('.loading')).toBeTruthy();

    await initPromise;

    // Profile rendering check
    expect(container.querySelector('h1').textContent).toBe('Alice의 대시보드');
    const items = container.querySelectorAll('li');
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('공부하기');

    // Deletion via delegation check
    const firstDeleteBtn = items[0].querySelector('button.delete-btn');
    firstDeleteBtn.click();

    // Verify item is removed from DOM
    expect(container.querySelectorAll('li').length).toBe(1);
    expect(container.querySelector('li').getAttribute('data-id')).toBe('2');
  });

  test('Task 1: API 에러 발생 시 에러 안내 메시지를 화면에 표출하는가', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
    });

    await initDashboard('dashboard-container', 'user999');

    expect(container.querySelector('.error-msg')).toBeTruthy();
    expect(container.querySelector('.error-msg').textContent).toBe('에러가 발생했습니다.');
  });
});
