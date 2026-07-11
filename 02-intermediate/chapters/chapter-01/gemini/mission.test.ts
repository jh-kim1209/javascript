import { getCompilerStatus } from "./mission";

describe("Chapter 01: TypeScript 설치 및 컴파일러 환경 구성 검증", () => {
  test("Task 1: 올바른 compilerOptions가 설정된 경우 정상적으로 값을 파싱하고 대소문자를 표준화해야 합니다.", () => {
    const config = {
      compilerOptions: {
        strict: true,
        target: "es2022",
        module: "NodeNext"
      }
    };
    expect(getCompilerStatus(config)).toEqual({
      strict: true,
      target: "ES2022",
      module: "nodenext"
    });
  });

  test("Task 1: 설정값이 빈 상태이거나 누락되었을 때 기본값(strict: false, target: ES3, module: commonjs)을 반환해야 합니다.", () => {
    expect(getCompilerStatus({})).toEqual({
      strict: false,
      target: "ES3",
      module: "commonjs"
    });
    expect(getCompilerStatus({ compilerOptions: {} })).toEqual({
      strict: false,
      target: "ES3",
      module: "commonjs"
    });
  });

  test("Task 1: strict 옵션이 Truthy/Falsy 값으로 주어졌을 때 명시적인 boolean 타입으로 변환해야 합니다.", () => {
    const config = {
      compilerOptions: {
        strict: "true"
      }
    };
    // @ts-ignore
    expect(getCompilerStatus(config).strict).toBe(true);
  });
});
