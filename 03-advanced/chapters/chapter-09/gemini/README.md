# Chapter 09: SSR 및 Static Generation (SSG) 빌드 메커니즘 (SSG vs SSR vs ISR)

## 📖 핵심 개념
웹 애플리케이션의 성능 최적화와 서버 자원 효율화를 위해 HTML 페이지의 생성 시점(빌드 타임 vs 실시간 요청 타임) 및 주기적 갱신 여부에 따른 렌더링 전략인 SSR(Server-Side Rendering), SSG(Static Site Generation), ISR(Incremental Static Regeneration)의 분류 기준과 빌드 단계에서의 결정 원리입니다.

*   **렌더링 전략 (SSR vs SSG vs ISR)**:
    *   요청이 들어올 때마다 서버가 HTML을 새로 만드는 방식(SSR), 빌드 시 정적 파일로 미리 만드는 방식(SSG), 빌드 시 만든 후 백그라운드에서 주기적으로 재생성하는 방식(ISR)의 구분입니다. (자세한 내용은 [용어 사전](../../../../GLOSSARY.md#rendering-strategies) 참고)
    *   **Friendly_Tutor의 친절한 비유**: "손님이 주문할 때마다 즉시 셰프가 요리를 시작하는 것이 SSR(실시간 동적 렌더링)이고, 손님이 몰릴 것을 대비하여 인기 요리 100개를 미리 오전에 만들어 진열해 두고 주문 즉시 바로 건네주는 것이 SSG(정적 생성)입니다. 그리고 진열된 정적 요리가 식거나 오래되지 않도록 30분 간격(revalidate)으로 백그라운드에서 신선한 요리로 조용히 교체하는 것이 ISR(증분 정적 재생성)입니다."
*   **정적/동적 라우트 빌드 결정 오류**:
    *   라우트별 콘텐츠 특성에 맞지 않는 부적절한 빌드 전략을 지정하면 불필요한 서버 비용이 발생하거나 페이지 응답 시간이 증가합니다.
    *   **Senior_Practitioner의 실무 팁**: "회사 소개 페이지나 블로그 글 목록처럼 내용이 거의 바뀌지 않는 정적 정보 페이지를 무조건 매 요청마다 새로 그리는 SSR로 설정해 두면, 불필요한 DB 조회로 인해 서버 자원이 극도로 낭비되고 서버 최초 응답 시간(TTFB)이 크게 느려집니다. 반대로 변경이 잦은 금융 거래 데이터나 개인화된 장바구니 페이지를 SSG로 잘못 지정해 빌드해 두면 사용자에게 만료되거나 잘못된 캐시 정보가 서빙되는 사고가 발생하므로, 라우트 속성 및 사용 API를 정확히 분석해 빌드 전략을 자동 분류하고 스케줄러로 처리하는 메커니즘을 구축해야 합니다."
*   **Next.js Dynamic Routing 빌드 스펙**:
    *   **PhD_Book_Author의 학술 스펙**: "Next.js 빌드 엔진(Next.js Compiler)의 정적/동적 판정(Static to Dynamic Optimization) 기준에 따르면, 컴파일 타임에 코드 내부에서 `cookies()`, `headers()` 또는 `searchParams` Props와 같이 HTTP Request Context를 직접 조회하는 API(Dynamic Functions) 호출을 정적으로 감지하여 해당 라우트를 무조건 Dynamic Rendering(SSR)으로 자동 강제 지정합니다. 만약 동적 API 호출이 없고 동적 세그먼트(`[id]` 등)만 있는 경우, `generateStaticParams` 함수의 명세를 통해 반환된 미리 정의된 매개변수 리스트는 완전 정적(SSG) 파일로 빌드하고, 그 외의 요청이나 `revalidate` 설정이 있으면 캐시 무효화 주기와 백그라운드 재유효화(Revalidation) 스케줄러가 관여하는 ISR로 동작 방식을 승격시켜 처리합니다."

## 🧪 실습 미션
*   **미션 파일**: `mission.ts`
*   **요구 사항**:
    1.  `resolveRouteBuildStrategy(route: string, hasHeadersCall: boolean, hasParams: boolean)`:
        - 라우트의 경로 문자열, 동적 헤더 API 호출 여부, 라우트 매개변수 존재 여부를 해석하여 렌더링 전략(`SSG`, `SSR`, `ISR`)을 리턴하는 라우트 빌드 전략 결정 헬퍼 함수를 구현합니다.
        - `hasHeadersCall`이 `true`이면 무조건 `'SSR'`로 결정합니다.
        - `hasHeadersCall`이 `false`이고, 라우트에 매개변수가 있거나 경로명에 대괄호(`[`, `]`)가 포함되어 있으면 `'ISR'`로 결정합니다.
        - 그 외에 동적 호출도 없고 매개변수도 없는 고정 경로일 경우에는 `'SSG'`로 결정합니다.

## 💡 힌트 및 트러블슈팅
*   라우트 경로에 대괄호가 들어가는지는 단순 `String.prototype.includes('[')` 및 `includes(']')` 메서드를 통해 정적 파싱에 활용할 수 있습니다.
*   매개변수 존재 여부(`hasParams`) 필드와 경로 문자열 검사 결과를 논리합(`||`) 연산하여 처리하면 편리합니다.
