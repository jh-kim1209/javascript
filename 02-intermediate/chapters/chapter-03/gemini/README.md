# Chapter 03: 인터페이스와 타입 별칭의 차이 (Interface vs Type Alias)

## 📖 핵심 개념
TypeScript에서 객체의 타입을 정의하는 대표적인 두 가지 방식인 `interface`와 `type alias`의 특징과 뚜렷한 설계 목적의 차이를 비교 학습합니다.

*   **인터페이스 (Interface)**:
    *   객체의 형태(Shape)를 정의하기 위한 상속 및 확장에 열려있는 타입 선언 규격입니다. (예: [용어 사전](../../../../GLOSSARY.md#declaration-merging) 참고)
    *   **Friendly_Tutor의 친절한 비유**: "인터페이스는 확장 가능한 모듈형 수납함과 같습니다. 수납 칸이 모자라면 기존 모듈에 언제든 새로운 칸(속성)을 덧붙여 병합해 조립할 수 있습니다."
*   **타입 별칭 (Type Alias)**:
    *   특정 타입에 새로운 이름을 부여하는 별칭 규격으로, 선언 병합이 불가능하며 확장은 교집합(`&`) 연산자로만 가능합니다.
    *   **Senior_Practitioner의 실무 팁**: "선언 병합(Declaration Merging)이 지원되는 interface를 무분별하게 남용하면, 외부 라이브러리나 다른 파일의 동일한 이름의 interface 선언에 의해 예기치 않게 전역 객체(Window 등)의 타입이 덮어씌워지거나 오염되는 심각한 충돌 버그를 야기할 수 있습니다. 따라서 순수한 설정이나 일관된 데이터 전송 객체(DTO)를 선언할 때는 닫혀있는 `type`을 우선적으로 고려하는 것이 안전합니다."
*   **컴파일러 해석 및 확장성**:
    *   **PhD_Book_Author의 학술 스펙**: "TypeScript 컴파일러의 심볼 테이블(Symbol Table)에서 `interface`는 고유한 객체 타입의 기호로 할당되며, 컴파일 타임에 소스가 분석될 때 동일한 스코프 내의 동일한 이름의 interface 심볼을 자동으로 결합하는 **선언 병합(Declaration Merging)**을 수행합니다. 반면, `type alias`는 단순히 타입 표현식(Type Representation)에 대한 참조 별칭(Alias)에 불과합니다. 따라서 동일한 스코프 내에 같은 이름의 type을 중복 선언하면 'Duplicate identifier' 컴파일러 에러가 발생하며, 확장을 위해서는 관계를 직접 평가하는 교집합(`&`) 연산자를 통한 타입 관계 평가 방식을 사용해야 합니다."

## 🧪 실습 미션
*   **미션 파일**: `mission.ts`
*   **요구 사항**:
    1.  `BaseConfig` 인터페이스를 정의합니다:
        - `apiEndpoint`: string 타입
    2.  `AppConfig` 인터페이스는 `BaseConfig`를 상속(extends)받고 다음 속성을 갖습니다:
        - `timeout`: number 타입
    3.  `AppConfig`에 대해 선언 병합(Declaration Merging)을 수행하여 다음 선택적 속성을 추가합니다:
        - `retryCount`: 선택적(optional) number 타입
    4.  `mergeAndNormalize(config: AppConfig)`: 입력받은 설정을 정규화하여 객체로 반환합니다.
        - `apiEndpoint`는 양 끝의 공백을 제거한 값(trim)을 사용해야 합니다.
        - `timeout`은 0 미만의 값이 들어올 경우 0으로 보정해야 합니다.
        - `retryCount`가 생략되거나 없는 경우 기본값 `3`으로 채워 반환해야 합니다.

## 💡 힌트 및 트러블슈팅
*   **선언 병합의 설계**: `mission.ts` 내부에서 `AppConfig`라는 이름의 인터페이스를 두 번 나누어 작성해 보세요. 첫 번째 선언에서는 `BaseConfig`를 확장하도록 지정하고 `timeout`을 정의한 다음, 두 번째 선언에서 `retryCount` 속성을 추가로 정의하면 TypeScript 컴파일러가 알아서 병합해 줍니다.
*   **기본값 처리**: `config.retryCount`가 `undefined`일 때 `3`으로 반환하려면 널 병합 연산자(`??`)를 사용하는 것이 좋습니다. 단락 평가인 `||`를 쓸 경우 `retryCount`가 `0`인 경우에도 `3`으로 오염되어 반환될 수 있어 실무적인 오류를 유발할 수 있으므로 [용어 사전](../../../../GLOSSARY.md#nullish-coalescing)의 널 병합 연산자 개념을 적극 반영해 보세요.
