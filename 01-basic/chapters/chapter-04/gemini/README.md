# Chapter 04: 기본 연산자와 null 병합 연산자 (Basic Operators and Nullish Coalescing)

## 📖 핵심 개념
논리 연산자의 단락 평가(Short-circuit Evaluation) 동작을 이해하고, ES2020에 도입된 null 병합 연산자(??)와 기존 논리 OR 연산자(||)의 명세상 차이를 학습합니다.

*   **단락 평가와 null 병합 연산자**:
    *   단락 평가는 앞쪽 피연산자만으로 연산 결과가 이미 확정되었을 때 뒤쪽 연산을 생략하는 규칙입니다. null 병합 연산자는 오직 nullish(null/undefined)인 경우에만 우항을 평가합니다. (예: [용어 사전](../../../../GLOSSARY.md#short-circuit-evaluation) 및 [null 병합 연산자](../../../../GLOSSARY.md#nullish-coalescing) 참고)
    *   **Friendly_Tutor의 친절한 비유**: "|| 연산자는 편식하는 아이 같아서 0이나 빈 문자열도 맛이 없다며(Falsy) 내팽개치고 새 음식(기본값)을 달라고 떼를 씁니다. 반면 ?? 연산자는 우편물 구멍에 딱 맞는 마개 같아서, 오직 우편함이 비었을 때(null / undefined)만 대체물을 채워 넣고, 0이나 빈 문자열 같은 진짜 알맹이는 소중하게 그대로 보존해 줍니다."
*   **?? vs ||**:
    *   || 연산자는 좌항이 Falsy(false, 0, "", null, undefined, NaN)인 경우 우항을 반환합니다. 반면 ?? 연산자는 좌항이 Nullish(null, undefined)인 경우에만 우항을 반환합니다.
    *   **Senior_Practitioner의 실무 팁**: "사용자가 설정한 숫자 0(예: 장바구니 수량 0)이나 빈 문자열(예: 사용자 닉네임 "")을 유효한 값으로 취급해야 함에도 불구하고, 기존 || 연산자를 잘못 사용하여 기본값으로 강제 대체해 버리는 실무 장애가 매우 흔합니다. 0과 빈 문자열을 허용하는 기본값 설정 로직에는 반드시 ?? 연산자를 사용하십시오."
*   **CoalescingExpression 평가 규칙**:
    *   **PhD_Book_Author의 학술 스펙**: "ECMAScript 명세에 규정된 CoalescingExpression (?? 연산식)의 평가 규칙에 따르면, 좌항 식을 평가한 결과인 lval의 완성 타입이 Null 또는 Undefined 계열인지 내부적으로 판단합니다. 이는 일반적인 ToBoolean 추상 연산(Truthy/Falsy를 평가하기 위해 값을 Boolean으로 강제 형변환하는 스펙)에 의존하는 LogicalORExpression (|| 연산식)과 명확히 구분되며, 불필요한 Boolean 변환 오버헤드와 Falsy 부작용을 사전에 차단합니다."

## 🧪 실습 미션
*   **미션 파일**: `mission.js`
*   **요구 사항**:
    1.  `getFallbackName(name)`: 널 병합 연산자를 활용한 기본 이름 대체
        - name이 null 또는 undefined인 경우 기본값인 `'Guest'`를 반환하고, 빈 문자열 `""`을 포함한 다른 유효값인 경우 원래 값을 그대로 반환합니다.
    2.  `safeGetAge(age)`: 널 병합 연산자를 활용한 안전한 나이 조회
        - age가 0인 유효 숫자는 그대로 `0`을 반환하고, null 또는 undefined인 경우에만 `100`을 반환합니다.

## 💡 힌트 및 트러블슈팅
*   두 미션 모두 `??` 연산자를 활용하여 구현할 수 있습니다. `||` 연산자를 쓰면 빈 문자열 `""`이나 숫자 `0`이 Falsy로 판단되어 원치 않는 기본값으로 대체될 수 있음에 유의하십시오.
