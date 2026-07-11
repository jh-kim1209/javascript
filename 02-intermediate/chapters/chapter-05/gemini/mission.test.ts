import { wrapInContainer } from "./mission";

describe("Chapter 05: TypeScript 제네릭 기초 검증", () => {
  test("Task 1: 문자열을 입력받아 문자열 타입이 보존된 컨테이너 객체를 반환해야 합니다.", () => {
    const value = "Hello TypeScript";
    const result = wrapInContainer(value);

    expect(result.data).toBe(value);
    expect(typeof result.timestamp).toBe("number");
    expect(result.timestamp).toBeLessThanOrEqual(Date.now());
  });

  test("Task 1: 숫자형 데이터를 입력받아 숫자 타입이 보존된 컨테이너 객체를 반환해야 합니다.", () => {
    const value = 12345;
    const result = wrapInContainer(value);

    expect(result.data).toBe(value);
    expect(typeof result.timestamp).toBe("number");
  });

  test("Task 1: 복합 객체를 입력받아 객체 타입이 보존된 컨테이너 객체를 반환해야 합니다.", () => {
    const value = { id: 10, title: "Generic Container" };
    const result = wrapInContainer(value);

    expect(result.data).toEqual(value);
    expect(result.data.title).toBe("Generic Container"); // 타입 추론 보존 여부 검증
  });
});
