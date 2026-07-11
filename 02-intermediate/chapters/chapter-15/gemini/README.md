# Chapter 15: [중급 종합 프로젝트] 영화 검색 대시보드 구축 (Movie Search Dashboard Project)

## 📖 핵심 개념
중급 과정의 종합 프로젝트로, TypeScript와 상태 관리 패턴, 비동기 API 연동 및 DOM 조작과 테스트 기법을 모두 결합하여 신뢰성 있고 완성도 높은 영화 검색 대시보드 웹 애플리케이션을 조립합니다.

*   **비동기 API 연동과 컴포넌트 통합**:
    *   API에서 영화 데이터를 가져오는 동안 UI의 상태(로딩, 결과 목록, 에러)를 유기적으로 전환시키는 상태 기계(State Machine) 역할을 하는 컨트롤러 또는 스토어를 구축하고 화면에 렌더링합니다. (예: `[용어 사전](../../../../GLOSSARY.md#asynchronous)` 및 `[용어 사전](../../../../GLOSSARY.md#promise-states)` 참고)
    *   **Friendly_Tutor의 친절한 비유**: "자동차 공장에서 각각 따로 생산된 바퀴, 엔진, 전조등을 올바른 프레임(대시보드 컨테이너) 위에 차례대로 완벽하게 결합하여 작동 가능한 하이브리드 차량을 출고하는 것과 같습니다."
*   **실무 UX 가드 설계 누락**:
    *   **Senior_Practitioner의 실무 팁**: "네트워크가 매우 느린 환경이나 서버 장애 상황을 대비하여 로딩 가드(`loading = true`)와 예외 에러 가드(`error = message`) 처리를 꼼꼼하게 배치하십시오. 이러한 방어적 가드 코드가 없으면 데이터를 가져오는 동안 빈 화면이 덩그러니 방치되거나 데이터 렌더링 루프가 터져 화면 레이아웃이 흉하게 깨진 상태로 멈추게 되어, 사용자가 서비스를 이탈하게 되는 치명적인 UX 감점을 초래합니다."
*   **컴포넌트 생명주기와 비동기 업데이트 흐름**:
    *   **PhD_Book_Author의 학술 스펙**: "영화 검색 대시보드는 비동기 프로미스(Promise)의 상태 전이(Pending ➔ Fulfilled 또는 Rejected)에 따라 로컬/전역 상태 스토어의 값을 동기식으로 업데이트하고, 이를 관찰하고 있는 렌더러가 DOM을 재빌드하는 순환 주기를 갖습니다. 검색 버튼이 트리거되면 이전 이벤트 바인딩을 제거하고 신규 네트워크 태스크를 매크로태스크 큐(Macrotask Queue)로 위임하며, 마운트 해제 시 리스너 및 타이머 참조를 정리하여 메모리 누수를 완전히 방지하는 라이프사이클 관리를 엄밀하게 수행해야 합니다." (예: `[용어 사전](../../../../GLOSSARY.md#useeffect-cleanup)` 참고)

## 🧪 실습 미션
*   **미션 파일**: `mission.ts`
*   **요구 사항**:
    1.  `initMovieDashboard(containerId: string, searchCallback: (term: string) => Promise<any>): void`:
        - 지정된 ID(`containerId`)를 가진 DOM 컨테이너 내부에 영화 검색 대시보드 UI를 초기화하고 부착(Mount)합니다.
        - 대시보드는 아래 엘리먼트 구조를 충족해야 합니다:
          - 검색 입력창: `<input id="movie-search-input" type="text" />`
          - 검색 실행 버튼: `<button id="movie-search-button">Search</button>`
          - 로딩 표시 엘리먼트: `<div id="movie-loading">Loading...</div>` (로딩 상태일 때만 DOM에 표시)
          - 에러 표시 엘리먼트: `<div id="movie-error">Error message</div>` (에러 상태일 때만 DOM에 표시하며, API가 던진 에러 메시지를 텍스트로 렌더링)
          - 영화 목록 컨테이너: `<ul id="movie-list">...</ul>` (각 영화 데이터는 `<li class="movie-item">영화제목</li>` 형태로 노출, 로딩 및 에러 상태가 아닐 때만 노출)
        - 사용자가 검색 버튼을 클릭하면 `searchCallback` 함수를 호출하여 데이터를 비동기 fetch합니다.
        - API 요청이 대기 상태(Pending)에 들어가면 `loading: true`로 설정해 로딩 표시만 노출하고 기존 리스트나 에러는 감추어야 합니다.
        - 성공(Fulfilled) 시 로딩을 해제하고 결과를 영화 목록에 바인딩하여 출력합니다.
        - 실패(Rejected) 시 에러 메시지를 `#movie-error` 영역에 바인딩하여 안전하게 표시해야 합니다.

## 💡 힌트 및 트러블슈팅
*   검색 버튼 클릭 이벤트 핸들러 내부에서 `input` 엘리먼트의 현재 입력값을 추출하고, 공백 제거 후 비어 있지 않은 경우에만 `searchCallback`을 트리거하세요.
*   `innerHTML`을 사용해 화면을 새로 그릴 때 기존 엘리먼트가 새로 파싱되므로 이벤트 리스너도 다시 바인딩해야 합니다. 렌더링 직후 `document.getElementById` 또는 `querySelector`를 통해 버튼과 입력을 찾아 재바인딩해 주는 구조를 수립하세요.
