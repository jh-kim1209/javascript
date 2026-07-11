/**
 * Chapter 06: TypeScript 고급 유틸리티 타입
 */

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export type ReadonlyUser = Readonly<User>;
export type PartialUpdate = Partial<Omit<User, "id">>;

/**
 * Task 1: 사용자 정보 업데이트 함수
 * 원본 사용자 객체의 불변성을 유지하면서 전달받은 필드만 변경된 새 객체를 반환합니다.
 * @param {ReadonlyUser} original - 원본 사용자 객체 (읽기 전용)
 * @param {PartialUpdate} fieldsToUpdate - 업데이트할 필드 객체 (id 제외, 선택적)
 * @returns {ReadonlyUser} 업데이트된 새로운 사용자 객체
 */
export function updateUser(original: ReadonlyUser, fieldsToUpdate: PartialUpdate): ReadonlyUser {
  // TODO: 원본 객체의 불변성을 지키면서 fieldsToUpdate의 속성을 얕은 복사 및 병합하여 반환하세요.
  return original;
}
