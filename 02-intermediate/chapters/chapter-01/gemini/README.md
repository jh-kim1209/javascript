# Chapter 01: TypeScript 설치 및 컴파일러 환경 구성 (TypeScript Compiler Configuration)

## 📖 핵심 개념
TypeScript의 동작 방식을 제어하는 컴파일러와 `tsconfig.json` 설정의 핵심 요소를 파악합니다.

*   **컴파일러 설정 (`tsconfig.json`)**:
    *   TypeScript 컴파일러(`tsc`)의 동작 옵션을 정의하는 환경 설정 파일입니다. (예: [용어 사전](../../../../GLOSSARY.md#typescript-strict-mode) 참고)
    *   **Friendly_Tutor의 친절한 비유**: "조립 가구의 상세 설명서와 정밀 조립 공구 세트와 같습니다. 설명서(tsconfig.json)의 규칙을 세밀하게 조정할수록 결과물이 오차 없이 완벽하게 조립됩니다."
*   **strict 옵션**:
    *   TypeScript의 타입 검사 수준을 극대화하여 코드의 안정성을 확보하는 엄격한 모드 설정입니다.
    *   **Senior_Practitioner의 실무 팁**: "tsconfig 설정의 strict 옵션을 true로 켜지 않으면 Any 타입이 방치되고, 이로 인해 런타임에 undefined 에러가 발생하여 TypeScript를 도입한 목적 자체를 잃게 됩니다."
*   **컴파일 단계와 타입 소거**:
    *   **PhD_Book_Author의 학술 스펙**: "TypeScript 컴파일러는 구문 분석을 통해 추상 구문 트리(AST)를 생성한 후 정적 타입 검사(Static Type Analysis)를 수행합니다. 이 단계가 끝나면 코드 생성기(Code Generator)가 모든 타입 선언 및 TypeScript 전용 문법을 완전히 제거하는 **타입 소거(Type Erasure)** 메커니즘을 거쳐 표준 ECMAScript 코드로 변환됩니다. 즉, 런타임에는 어떠한 타입 정보도 남아있지 않으며 런타임 성능 오버헤드가 전혀 발생하지 않습니다."

## 🧪 실습 미션
*   **미션 파일**: `mission.ts`
*   **요구 사항**:
    1.  `getCompilerStatus(config: any)`: `tsconfig.json` 객체를 입력받아 `strict`, `target`, `module` 속성의 설정 상태를 표준 객체로 변환하여 반환합니다.
        - `strict` 값은 boolean으로 강제 변환하여 반환해야 합니다.
        - `target` 값은 항상 대문자(Uppercase) 문자열로 반환하며, 값이 없거나 누락된 경우 기본값 `'ES3'`를 반환합니다.
        - `module` 값은 항상 소문자(Lowercase) 문자열로 반환하며, 값이 없거나 누락된 경우 기본값 `'commonjs'`를 반환합니다.

## 💡 힌트 및 트러블슈팅
*   **입력 데이터 구조 예외 처리**: `config` 객체가 `null`이거나 `compilerOptions` 속성이 없는 경우 객체 접근 시 `TypeError: Cannot read properties of undefined`가 발생하지 않도록 **단락 평가**나 **옵셔널 체이닝**을 적극 활용해 보세요.
*   **타입 변환**: `strict` 옵션이 boolean 이외의 타입(예: `"true"`, `1` 등)으로 제공될 수 있으므로 `Boolean(value)` 또는 이중 부정 연산자(`!!value`)를 사용하여 완벽한 불리언 형태로 형 변환해야 테스트를 통과할 수 있습니다.
