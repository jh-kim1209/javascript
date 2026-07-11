import { evalGrade, checkAccess, getRoleName } from './mission.js';

describe('Chapter 05: 조건문 분기 검증', () => {
  test('Task 1: 점수에 따라 올바른 학점을 반환해야 합니다.', () => {
    expect(evalGrade(95)).toBe('A');
    expect(evalGrade(90)).toBe('A');
    expect(evalGrade(85)).toBe('B');
    expect(evalGrade(80)).toBe('B');
    expect(evalGrade(75)).toBe('C');
    expect(evalGrade(70)).toBe('C');
    expect(evalGrade(65)).toBe('F');
    expect(evalGrade(-10)).toBe('F');
    expect(evalGrade(150)).toBe('F');
    expect(evalGrade('95')).toBe('F');
    expect(evalGrade(null)).toBe('F');
    expect(evalGrade(undefined)).toBe('F');
  });

  test('Task 2: 삼항 연산자를 이용해 면허와 나이를 검증해야 합니다.', () => {
    expect(checkAccess(20, true)).toBe('granted');
    expect(checkAccess(18, true)).toBe('granted');
    expect(checkAccess(17, true)).toBe('denied');
    expect(checkAccess(20, false)).toBe('denied');
    expect(checkAccess(15, false)).toBe('denied');
  });

  test('Task 3: switch 문을 이용해 역할 코드를 이름으로 변환해야 합니다.', () => {
    expect(getRoleName('ADMIN')).toBe('관리자');
    expect(getRoleName('EDITOR')).toBe('편집자');
    expect(getRoleName('USER')).toBe('일반 사용자');
    expect(getRoleName('GUEST')).toBe('알 수 없는 역할');
    expect(getRoleName(null)).toBe('알 수 없는 역할');
  });
});
