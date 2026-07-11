import { updateUser, ReadonlyUser, PartialUpdate } from "./mission";

describe("Chapter 06: TypeScript 고급 유틸리티 타입 검증", () => {
  test("Task 1: 원본 객체의 불변성을 유지하면서 전달받은 필드만 변경된 새 객체를 반환해야 합니다.", () => {
    const original: ReadonlyUser = {
      id: 1,
      name: "홍길동",
      email: "hong@example.com",
      role: "user"
    };

    const update: PartialUpdate = {
      name: "이순신",
      role: "admin"
    };

    const result = updateUser(original, update);

    expect(result).toEqual({
      id: 1,
      name: "이순신",
      email: "hong@example.com",
      role: "admin"
    });

    expect(result).not.toBe(original);
    expect(original.name).toBe("홍길동");
  });

  test("Task 1: 빈 업데이트 객체가 전달되면 원본과 동일한 속성을 가진 새 객체를 반환해야 합니다.", () => {
    const original: ReadonlyUser = {
      id: 2,
      name: "김유신",
      email: "kim@example.com",
      role: "user"
    };

    const result = updateUser(original, {});

    expect(result).toEqual(original);
    expect(result).not.toBe(original);
  });
});
