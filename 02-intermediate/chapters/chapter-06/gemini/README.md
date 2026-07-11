# Chapter 06: TypeScript 고급 유틸리티 타입 (Advanced Utility Types)

## 📖 핵심 개념
TypeScript의 내장 유틸리티 타입은 기존 타입을 변환하여 새로운 타입을 생성하는 강력한 도구입니다. Mapped Types와 Index Signatures 스펙을 활용하여 타입 안전성을 높이고 코드 중복을 최소화합니다.

*   **Readonly 타입과 Partial 타입**:
    *   객체의 모든 속성을 읽기 전용으로 만들거나(`Readonly`), 모든 속성을 선택적으로 만들어(`Partial`) 객체 업데이트 시 일부 필드만 안전하게 갱신할 수 있도록 지원합니다. (예: `[용어 사전](../../../../GLOSSARY.md#immutability)` 참고)
    *   **Friendly_Tutor의 친절한 비유**: "원하는 옵션만 골라 담아 출고하는 커스텀 자동차 패키지 상자처럼, 전체 설계도에서 필요한 부분만 선택적으로 떼어내거나 잠금장치를 걸어 관리하는 것과 같습니다."
*   **Omit 타입과 Pick 타입**:
    *   기존 타입에서 특정 속성을 제거하거나(`Omit`), 원하는 속성만 선택적으로 골라내어(`Pick`) 정밀한 서브 타입을 정의합니다.
    *   **Senior_Practitioner의 실무 팁**: "Readonly 타입을 적용하지 않고 객체를 직접 수정했다가 상태 추적이 꼬이거나, Partial의 모든 속성이 optional인 성질 때문에 null/undefined 에러를 가드하지 않아 런타임 장애로 확산되는 위험이 있습니다. 객체 갱신 시에는 항상 불변성을 지키고, 선택적 속성은 반드시 옵셔널 체이닝이나 Nullish 병합 연산자로 안전하게 가드 처리해야 합니다."
*   **Mapped Types와 Index Signatures**:
    *   **PhD_Book_Author의 학술 스펙**: "TypeScript 컴파일러는 Mapped Types(`{ [P in K]: T }`)와 Index Signatures를 이용하여 컴파일 타임에 키 집합을 순회(Iterate)하며 새로운 타입을 매핑합니다. 이를 통해 원본 타입 변경 시 파생된 유틸리티 타입들도 자동으로 연동되어 정적 분석 수준에서 완전한 타입 정합성을 유지합니다."

## 🧪 실습 미션
*   **미션 파일**: `mission.ts`
*   **요구 사항**:
    1.  `updateUser(original: ReadonlyUser, fieldsToUpdate: PartialUpdate): ReadonlyUser`:
        - 원본 사용자 객체의 불변성을 지키며 일부 필드만 업데이트된 새로운 사용자 객체를 생성합니다.
        - `original` 객체는 `ReadonlyUser` 타입이어야 하며, 직접 수정(Mutation)되지 않아야 합니다.
        - `fieldsToUpdate`는 `PartialUpdate` 타입이어야 하며, 사용자 ID(`id`) 속성은 업데이트 대상에서 제외(`Omit`)되어야 합니다.
        - 최종적으로 얕은 복사(Shallow Copy) 및 병합(Merge)을 수행하여 업데이트된 `ReadonlyUser` 객체를 반환합니다.

## 💡 힌트 및 트러블슈팅
*   스프레드 연산자(`...`)를 사용하여 불변성을 유지하는 얕은 복사를 수행하세요. `ReadonlyUser`와 `PartialUpdate` 타입을 올바르게 설정하여 컴파일 타임에 `id` 변경 시도를 감지하고 차단해야 합니다.
