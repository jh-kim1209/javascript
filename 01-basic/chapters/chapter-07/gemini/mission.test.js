import { greetUser, sumAll } from './mission.js';

describe('Chapter 07: 함수의 기본과 매개변수 검증', () => {
  test('Task 1: 매개변수 기본값이 올바르게 할당되어야 합니다.', () => {
    expect(greetUser('홍길동', '팀장')).toBe('안녕하세요, 홍길동 팀장님!');
    expect(greetUser('이순신')).toBe('안녕하세요, 이순신 회원님!');
    expect(greetUser(undefined, '관리자')).toBe('안녕하세요, 손님 관리자님!');
    expect(greetUser()).toBe('안녕하세요, 손님 회원님!');
  });

  test('Task 2: 나머지 매개변수를 활용해 인자들의 합을 구해야 합니다.', () => {
    expect(sumAll(1, 2, 3)).toBe(6);
    expect(sumAll(10, 20, 30, 40)).toBe(100);
    expect(sumAll()).toBe(0);
    expect(sumAll(5)).toBe(5);
  });
});
