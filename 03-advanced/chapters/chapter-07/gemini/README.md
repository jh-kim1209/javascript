# Chapter 07: Next.js App Router 아키텍처 분석 및 Server/Client Component 경계 설계 (Next.js App Router Boundary Design)

## 📖 핵심 개념
Next.js App Router 아키텍처 환경에서 서버 컴포넌트(Server Component)와 클라이언트 컴포넌트(Client Component)의 명확한 역할 정의 및 두 컴포넌트 간 물리적/개념적 실행 경계를 설계하여 번들 크기를 최적화하고 서버와 브라우저 자원을 효율적으로 분배하는 설계 원리입니다.

*   **서버 컴포넌트 vs 클라이언트 컴포넌트**:
    *   서버에서만 전적으로 렌더링을 담당하는 컴포넌트와 브라우저에서 하이드레이션을 통해 사용자 인터랙션을 부여하는 컴포넌트의 논리적 구분을 뜻합니다. (자세한 내용은 [용어 사전](../../../../GLOSSARY.md#server-client-components) 참고)
    *   **Friendly_Tutor의 친절한 비유**: "서버 컴포넌트는 백화점 지하 푸드코트 주방(서버)에서 밀키트를 완벽히 요리해 나오는 완제품 음식과 같습니다. 클라이언트는 완성품을 받아 먹기만 하면 되죠. 반면 클라이언트 컴포넌트는 테이블마다 설치된 1인 인덕션(클라이언트)과 같습니다. 손님이 고기를 직접 구우며 취향에 맞게 온도를 조절하는(버튼 클릭, 상태 변경 등 인터랙션) 경험을 주는 부분입니다."
*   **컴포넌트 바운더리 오류 및 컴파일 문제**:
    *   서버 컴포넌트는 클라이언트 번들에 포함되지 않으므로 브라우저 전용 동작을 구현할 수 없습니다.
    *   **Senior_Practitioner의 실무 팁**: "가장 흔히 저지르는 실수는 서버 컴포넌트 내부에서 리액트 State Hook(`useState`, `useEffect`)을 직접 호출하거나 JSX에 `onClick` 같은 이벤트 핸들러를 달아 컴파일 오류를 내는 것입니다. 또한, 'use client'가 붙은 클라이언트 컴포넌트 내부에 백엔드 로직이나 `server-only` 마크가 된 서버 전용 모듈(`node:fs` 등)을 임포트하면 브라우저 번들로 전송되려 하여 런타임 오류가 납니다. 이 경계를 정적 검사하는 도구를 갖추는 것이 대규모 프로젝트에서 매우 중요합니다."
*   **Next.js 렌더링 번들 분리 스펙**:
    *   **PhD_Book_Author의 학술 스펙**: "Next.js 컴파일 레이아웃에 따르면, 빌드 타임에 파일 최상단에 명시된 `use client` 지시어를 기준점(Boundary Entry Point)으로 삼아 클라이언트 렌더링 서브트리를 형성합니다. 이 지시어가 감지되면 번들러(Webpack/Turbopack)는 해당 지점부터 하위 임포트 트리에 걸쳐 있는 모든 컴포넌트를 브라우저로 전송할 자바스크립트 청크(JS Chunk)로 빌드 및 격리합니다. 따라서 클라이언트 컴포넌트 하위에 서버 컴포넌트를 임포트하고 싶을 땐 직접 임포트하지 않고 `children` Props 구조를 이용해 서버 컴포넌트 인스턴스를 주입받음으로써 서버 영역에서 사전 렌더링되게 설계해야 번들 오염을 막을 수 있습니다."

## 🧪 실습 미션
*   **미션 파일**: `mission.ts`
*   **요구 사항**:
    1.  `validateComponentBoundary(componentName: string, code: string)`:
        - 전달된 React 컴포넌트 코드의 'use client' 지시어 선언 여부에 따라 서버/클라이언트 컴포넌트로 자동 분류합니다.
        - **서버 컴포넌트**로 판단될 경우, 내부에서 리액트 상태/이펙트 훅(`useState`, `useEffect`, `useContext`, `useReducer`, `useRef`, `useMemo`, `useCallback`, `useLayoutEffect`, `useTransition`, `useDeferredValue` 등 10개 핵심 훅)을 호출하거나 JSX 이벤트 핸들러(`onClick`, `onChange` 등)를 선언하면 에러 메시지를 수집합니다.
        - **클라이언트 컴포넌트**로 판단될 경우, 서버 전용 지시 패키지인 `"server-only"`를 임포트하거나 Node.js 서버 라이브러리(`fs`, `child_process`, `net`, `dns`)를 임포트할 때 경계 오류로 적출해야 합니다.

## 💡 힌트 및 트러블슈팅
*   정적 분석을 위해 정밀 파서 대신 성능이 우수한 정규식(Regex)을 주로 활용할 수 있습니다.
*   예를 들어 `useState`가 쓰였는지는 `/\buseState\s*\(/`와 같은 표현식으로, JSX 이벤트 속성은 `/\bonClick\s*=/` 등으로 매칭할 수 있습니다.
*   `use client` 지시어는 코드 최상단의 공백과 주석 뒷부분에 위치할 수 있으므로 앞선 공백과 주석 패턴을 건너뛰고 정상 매칭되도록 고려해야 합니다.
