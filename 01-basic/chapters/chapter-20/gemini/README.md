# Chapter 20: ES Modules 모듈화 (ES Modules Modularization)

## 📖 핵심 개념

ES Modules는 ECMAScript 표준 모듈 시스템으로, 파일 단위로 독자적인 스코프를 유지하고 외부 파일과 코드를 연동하기 위한 업계 표준 사양입니다.

- **ES Modules (ESM)**:
  - ECMAScript 표준 모듈 시스템으로, `import` 및 `export` 문법을 사용해 파일 단위로 독자적인 스코프를 유지하고 외부 파일과 코드를 연동합니다. (예: [용어 사전](../../../../GLOSSARY.md#es-modules) 참고)
  - **Friendly_Tutor의 친절한 비유**: "레스토랑 주방 전체에서 요리사 모두가 양념통(전역 변수)을 공유해 쓰면 양념이 섞여 맛이 변하겠죠? 그래서 레스토랑의 메인 홀(메인 모듈)과 채소 칼질 전담실(수학 연산 모듈)을 별도 격리하고, 인터폰(`import`/`export`)을 통해서만 완성된 재료를 주고받는 것과 같습니다."
- **export와 import**:
  - `export` 키워드로 모듈 내부의 기능을 외부에 노출시키고, `import` 키워드로 외부 모듈을 안전하게 호출해 바인딩합니다.
  - **Senior_Practitioner의 실무 팁**: "과거 모듈 시스템이 없던 시절에는 여러 `<script>` 태그를 로드할 때 실행 및 로드 순서가 어긋나 `undefined reference` 에러가 나거나, 전역 변수 충돌로 인해 기껏 연산해 둔 변수값이 덮어씌워져 날아가는 전역 네임스페이스 오염(Global Pollution) 장애가 빈번했습니다. ES Modules를 사용하면 각 파일이 독립된 모듈 스코프를 보장받으므로 이런 부작용이 원천 차단됩니다."
- **ES Modules vs CommonJS**:
  - 두 시스템은 컴파일(평가) 시점에 정적으로 코드를 분석하는지, 런타임에 동적으로 처리하는지에 대한 명세 차이를 갖습니다.
  - **PhD_Book_Author의 학술 스펙**: "CommonJS의 `require()`는 런타임에 동기적으로 파일을 평가하여 객체를 복사(Dynamic copy)해 오는 반면, ES Modules의 `import`는 정적 분석 단계(Static Analysis Phase)에서 모듈 간의 의존성 그래프(Module Map)를 형성하고 심볼릭 링크를 바인딩(Static binding)합니다. 이로 인해 ESM은 빌드 단계에서 사용되지 않는 코드를 걸러내는 트리 쉐이킹(Tree Shaking)이 구조적으로 가능합니다."

## 🧪 실습 미션

- **미션 파일**: `mission.js`, `math.js`
- **요구 사항**:
  1.  `math.js` 모듈을 작성하고 `add(a, b)` 및 `subtract(a, b)` 함수를 정의하여 `export` 합니다.
  2.  `mission.js`에서 `math.js`로부터 두 함수를 `import` 합니다.
  3.  `mission.js` 내에 동일한 시그니처를 가진 `add(a, b)`와 `subtract(a, b)` 함수를 정의하고, `math.js` 모듈의 연산을 위임 호출하여 결과를 반환하도록 구현 및 `export` 하십시오.

## 💡 힌트 및 트러블슈팅

- 동일 폴더 내의 모듈을 임포트할 때는 반드시 확장자(`.js`)를 경로명 끝에 표기해 주어야 합니다: `import { add } from './math.js';`
- ES Modules에서는 브라우저 환경이나 Node.js 환경에서 최상단 블록(`Top-level Scope`)에 선언한 변수가 자동으로 전역 객체(`window` or `global`)에 결합되지 않고 독립 스코프가 보장됩니다.
