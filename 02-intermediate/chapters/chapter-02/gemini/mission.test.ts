import { formatUser } from "./mission";

describe("Chapter 02: TypeScript 기본 타입 바인딩 검증", () => {
  test("Task 1: admin 역할의 유저를 입력받아 대문자 [ADMIN] 포맷으로 변환해야 합니다.", () => {
    const adminUser = {
      id: 1,
      name: "Alice",
      role: "admin" as const
    };
    expect(formatUser(adminUser)).toBe("[ADMIN] Alice (ID: 1)");
  });

  test("Task 1: user 역할의 유저를 입력받아 대문자 [USER] 포맷으로 변환해야 합니다.", () => {
    const normalUser = {
      id: 99,
      name: "Bob",
      role: "user" as const
    };
    expect(formatUser(normalUser)).toBe("[USER] Bob (ID: 99)");
  });
});
