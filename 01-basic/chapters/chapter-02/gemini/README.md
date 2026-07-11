# Chapter 02: 원시 자료형 및 템플릿 (Primitive Types and Templates)

## 📖 핵심 개념
자바스크립트의 변경 불가능한 6대 원시 타입의 특징과 백틱(Backtick)을 활용하여 문자열을 동적으로 결합하는 템플릿 리터럴 문법을 학습합니다.

*   **원시 타입과 불변성**:
    *   원시 타입은 메모리에 실제 값 자체가 직접 저장되며, 한 번 생성되면 그 값을 변경할 수 없는 불변성(Immutability)을 가집니다. (예: [용어 사전](../../../../GLOSSARY.md#immutability) 참고)
    *   **Friendly_Tutor의 친절한 비유**: "원시 타입은 한 번 굳으면 절대 형태를 바꿀 수 없는 단단한 콘크리트 벽돌과 같습니다. 만약 다른 값을 넣고 싶다면 기존 벽돌을 깨부수는 게 아니라 완전히 새로운 벽돌을 찍어내어 교체해야 하죠. 반면 백틱 템플릿은 원하는 부품(변수)을 쏙쏙 끼워 조립할 수 있는 조립식 액자와 같습니다."
*   **typeof 연산자와 Symbol**:
    *   typeof 연산자는 피연산자의 데이터 타입을 문자열로 반환합니다. Symbol은 중복되지 않는 고유한 식별자를 만들기 위한 원시 타입입니다.
    *   **Senior_Practitioner의 실무 팁**: "실무에서 null 값을 객체로 오인하거나, 고유한 객체 프로퍼티 키로 Symbol을 활용하지 않아 발생하는 런타임 프로퍼티 충돌 버그를 조심해야 합니다. 특히 typeof null은 역사적 설계 결함으로 인해 'object'를 반환하므로, null을 검증할 때는 typeof 연산자 대신 strict equality(=== null)를 사용해 엄밀하게 판별하십시오."
*   **스택 메모리와 래퍼 객체**:
    *   **PhD_Book_Author의 학술 스펙**: "ECMAScript 명세상 원시 타입(String, Number, Boolean, Null, Undefined, Symbol)은 실행 컨텍스트의 스택(Stack) 영역에 실제 데이터 값이 직접 바인딩되어 빠르게 참조됩니다. 원시 값의 메서드(예: 'hello'.toUpperCase())를 호출할 때 엔진은 임시로 객체 래퍼(Wrapper Object)인 String 객체를 내부적으로 자동 생성(Autoboxing)하여 메서드를 실행한 뒤, 실행이 끝나면 즉시 해당 래퍼 객체를 메모리에서 소멸(Garbage Collection)시킵니다."

## 🧪 실습 미션
*   **미션 파일**: `mission.js`
*   **요구 사항**:
    1.  `checkPrimitiveType(val)`: 전달된 값의 typeof 문자열 반환
        - typeof 연산자를 사용해 피연산자의 데이터 타입 소문자 문자열을 반환합니다.
    2.  `formatUserWelcome(name, points)`: 백틱을 사용한 문장 합성
        - name의 기본값은 `'손님'`, points의 기본값은 `0`으로 설정합니다.
        - `"안녕하세요, [name]님! 보유 포인트는 [points]점입니다."` 형식의 템플릿 리터럴 가공 문자열을 반환합니다.

## 💡 힌트 및 트러블슈팅
*   자바스크립트에서 `typeof null`은 `"object"`를 반환합니다. 이 특수한 스펙에 유의하여 테스트를 작성하고, 템플릿 리터럴 내부에서는 `${expression}` 문법을 정확히 사용하여 변수 값을 결합하세요.
