import { deepCloneObject } from './mission.js';

describe('Chapter 13: 복사 패러다임과 불변성 검증', () => {
  test('Task 1: structuredClone을 사용해 깊은 복사본을 만들어야 합니다.', () => {
    const original = {
      name: 'Alice',
      details: {
        age: 30,
        hobbies: ['reading', 'gaming'],
      },
    };
    const cloned = deepCloneObject(original);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned.details).not.toBe(original.details);
    expect(cloned.details.hobbies).not.toBe(original.details.hobbies);
  });

  test('Task 1: 함수가 포함된 객체에서 폴백 동작이 작동해야 합니다.', () => {
    const original = {
      name: 'Bob',
      greet() {
        return 'hello';
      },
      details: {
        skills: ['js', 'ts'],
      },
    };

    // structuredClone은 함수가 있으면 DataCloneError를 유발하므로
    // deepCloneObject는 catch하여 폴백 복제 로직을 실행해야 합니다.
    const cloned = deepCloneObject(original);

    expect(cloned.name).toBe('Bob');
    expect(typeof cloned.greet).toBe('function');
    expect(cloned.greet()).toBe('hello');
    expect(cloned.details.skills).toEqual(['js', 'ts']);
    expect(cloned.details).not.toBe(original.details);
  });

  test('Task 1: 원시값 및 null 처리', () => {
    expect(deepCloneObject(null)).toBeNull();
    expect(deepCloneObject(42)).toBe(42);
    expect(deepCloneObject('string')).toBe('string');
  });
});
