import { delayFetch } from './mission.js';

describe('Chapter 21: 비동기 자바스크립트와 Promise 검증', () => {
  test('Task 1: 지정된 시간(ms) 이후에 데이터를 올바르게 resolve하는가', async () => {
    const startTime = Date.now();
    const data = 'Test Data';
    const result = await delayFetch(data, 100);
    const duration = Date.now() - startTime;

    expect(result).toBe(data);
    expect(duration).toBeGreaterThanOrEqual(90); // 일부 OS 지연 오차 보정
  });

  test('Task 1: 올바르지 않은 지연 시간(음수)이 주어지면 즉시 reject하는가', async () => {
    await expect(delayFetch('Data', -10)).rejects.toThrow('Invalid delay time');
  });

  test('Task 1: 지연 시간 매개변수가 숫자가 아닌 경우 즉시 reject하는가', async () => {
    await expect(delayFetch('Data', '100')).rejects.toThrow('Invalid delay time');
  });
});
