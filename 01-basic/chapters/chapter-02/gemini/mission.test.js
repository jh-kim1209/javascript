import { checkPrimitiveType, formatUserWelcome } from "./mission.js";

describe("Chapter 02: 원시 자료형 및 템플릿 검증", () => {

  test("Task 1: checkPrimitiveType이 다양한 원시 타입들을 정확하게 식별해야 합니다.", () => {
    expect(checkPrimitiveType(42)).toBe("number");
    expect(checkPrimitiveType("hello")).toBe("string");
    expect(checkPrimitiveType(true)).toBe("boolean");
    expect(checkPrimitiveType(undefined)).toBe("undefined");
    expect(checkPrimitiveType(Symbol("id"))).toBe("symbol");
    expect(checkPrimitiveType(null)).toBe("object");
  });

  test("Task 2: formatUserWelcome이 백틱 템플릿 리터럴을 통해 문자열을 결합해야 합니다.", () => {
    expect(formatUserWelcome("홍길동", 3500)).toBe("안녕하세요, 홍길동님! 보유 포인트는 3500점입니다.");
    expect(formatUserWelcome(undefined, 100)).toBe("안녕하세요, 손님님! 보유 포인트는 100점입니다.");
  });

});
