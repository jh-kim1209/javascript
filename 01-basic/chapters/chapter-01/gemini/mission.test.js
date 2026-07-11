import { testScope, testConstReassignment } from "./mission.js";

describe("Chapter 01: 변수와 스코프 검증", () => {

  test("Task 1: 블록 내외 let 변수의 격리 동작이 정상적으로 수행되어야 합니다.", () => {
    expect(testScope()).toEqual(["outer", "inner"]);
  });

  test("Task 2: const 변수에 재할당을 시도할 때 TypeError가 발생하여 캐치되어야 합니다.", () => {
    expect(testConstReassignment()).toBe("reassignment_error");
  });

});
