import { cloneAndModifyUser } from './mission.js';

describe('Chapter 09: 객체 리터럴과 참조 데이터 검증', () => {
  test('Task 1: 원본 객체를 오염시키지 않고 name이 변경된 새로운 객체를 반환해야 합니다.', () => {
    const user = { name: 'Alice', age: 25, role: 'admin' };
    const result = cloneAndModifyUser(user, 'Bob');

    expect(result).toEqual({ name: 'Bob', age: 25, role: 'admin' });
    expect(result).not.toBe(user); // 참조 비교
    expect(user.name).toBe('Alice'); // 원본 보존 검증
  });

  test('Task 1: 예외적인 입력 처리 (null 또는 객체가 아닐 때)', () => {
    expect(cloneAndModifyUser(null, 'Charlie')).toEqual({ name: 'Charlie' });
    expect(cloneAndModifyUser(undefined, 'Charlie')).toEqual({ name: 'Charlie' });
    expect(cloneAndModifyUser('not an object', 'Charlie')).toEqual({ name: 'Charlie' });
  });
});
