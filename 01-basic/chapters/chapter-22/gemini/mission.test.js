import { jest } from '@jest/globals';
import { fetchUserProfile } from './mission.js';

describe('Chapter 22: fetch API와 async/await 검증', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Task 1: 성공적인 API 응답 시 프로필 데이터를 올바르게 반환하는가', async () => {
    const mockProfile = { id: 'user123', name: 'Alice', email: 'alice@example.com' };
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockProfile),
    });

    const result = await fetchUserProfile('user123');

    expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/users/user123');
    expect(result).toEqual(mockProfile);
  });

  test('Task 1: API 응답 상태 코드가 실패(ok가 false)인 경우 null을 반환하는가', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
    });

    const result = await fetchUserProfile('user999');

    expect(result).toBeNull();
  });

  test('Task 1: 네트워크 에러 등으로 fetch 자체가 reject되는 경우 null을 반환하는가', async () => {
    global.fetch.mockRejectedValue(new Error('Network connection failed'));

    const result = await fetchUserProfile('user999');

    expect(result).toBeNull();
  });
});
