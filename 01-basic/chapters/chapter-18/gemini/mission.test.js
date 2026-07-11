/**
 * @jest-environment jsdom
 */
import { jest } from '@jest/globals';
import { setupFormSubmit } from './mission.js';

describe('Chapter 18: 이벤트 리스너와 이벤트 객체 검증', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('Task 1: submit 이벤트 발생 시 preventDefault를 호출해 리로드를 막고 callback에 폼 데이터를 전달해야 합니다.', () => {
    // 폼 및 입력 필드 구성
    const form = document.createElement('form');
    form.id = 'test-form';

    const inputName = document.createElement('input');
    inputName.name = 'username';
    inputName.value = 'gemini';
    form.appendChild(inputName);

    const inputEmail = document.createElement('input');
    inputEmail.name = 'email';
    inputEmail.value = 'gemini@example.com';
    form.appendChild(inputEmail);

    document.body.appendChild(form);

    const callback = jest.fn();
    setupFormSubmit('test-form', callback);

    // submit 이벤트 생성 및 디스패치
    const event = new Event('submit', { bubbles: true, cancelable: true });

    // preventDefault 감시를 위해 스파이 설정
    const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

    form.dispatchEvent(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith({
      username: 'gemini',
      email: 'gemini@example.com',
    });
  });

  test('Task 1: 존재하지 않는 formId를 넘기면 에러 없이 무시해야 합니다.', () => {
    const callback = jest.fn();
    expect(() => {
      setupFormSubmit('non-existent-form', callback);
    }).not.toThrow();
  });
});
