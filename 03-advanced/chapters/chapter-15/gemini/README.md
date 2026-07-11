# Chapter 15: [고급 종합 프로젝트] 실시간 AI 대시보드 Vercel/Docker 최종 배포 (Final AI Dashboard Integration)

## 📖 핵심 개념

지금까지 학습한 네트워크 스트리밍, AI LLM API 스트리밍 렌더러, Docker 컨테이너 가상화 및 CI/CD 워크플로우를 하나로 통합하여 실제 클라우드 환경에 서비스 가능한 수준의 실시간 AI 대시보드를 구축하고 배포하는 종합 프로젝트입니다.

- **실시간 AI 대시보드 통합 배포 (AI Dashboard)**:
  - 스트리밍 데이터 파이프라인과 프론트엔드 실시간 UI가 결합하여 클라우드 컨테이너 환경에 최종 릴리즈되는 생명 주기 아키텍처입니다. (자세한 내용은 [용어 사전](../../../../GLOSSARY.md#pre-deployment-verification) 참고)
  - **Friendly_Tutor의 친절한 비유**: "각 부품별로 꼼꼼히 조립해두었던 엔진(스트리밍 파서), 통신 장비(LLM API), 타이어와 차체(Docker 가상화), 그리고 자동 안전 검사 장치(CI/CD)를 모두 결합하여 마침내 완성된 스마트 자율주행 소방차를 소방서(Vercel/Docker 클라우드 배포) 정식 출고 배치하는 것과 같습니다."
- **환경 변수(Env Vars) 매핑 결함 및 CORS 예외 레이아웃 스위칭**:
  - 로컬과 프로덕션 환경의 호스트 주소 불일치 및 환경 변수 누락으로 발생하는 통신 차단(CORS)을 디버깅하고 에러 예외 화면을 제공하는 기술입니다.
  - **Senior_Practitioner의 실무 팁**: "클라우드 배포 시 가장 흔하게 마주하는 장벽은 환경 변수(`process.env.API_URL`) 설정 누락입니다. 백엔드 주소가 잘못 매핑되면 브라우저는 즉시 CORS(Cross-Origin Resource Sharing) 차단 에러를 내뱉으며 화면이 빈 칸으로 굳어버립니다. 이를 방지하기 위해 프론트엔드 대시보드 코드는 스트림 유입 시 연결 실패(CORS 및 네트워크 에러)를 감지하는 즉시, 화면 레이아웃을 '에러 전용 안내 화면(CORS Layout)'으로 매끄럽게 스위칭(스위치 컴포넌트 구조)하여 사용자에게 환경 변수 설정 점검 조치를 명확히 제시하도록 설계해야 합니다."
- **고급 아키텍처 수명 주기 및 클라우드 배포 통합**:
  - **PhD_Book_Author의 학술 스펙**: "본 통합 과정은 프론트엔드의 비동기 스트리밍(WHATWG Streams) 런타임 수명 주기, Docker 컨테이너 격리 프로세스의 파일 시스템 계층 구조, GitHub Actions 러너의 빌드/테스트 분산 파이프라인 단계를 종단 간으로 연동합니다. Vercel의 Serverless Edge Network 환경 또는 Docker 가상화 런타임 호스팅 환경에서 클라이언트 브라우저와 클라우드 백엔드가 무상태성(Stateless) 연결을 이루어 SSE 데이터를 주고받는 전체 라이프사이클의 무결성을 확보합니다."

## 🧪 실습 미션

- **미션 파일**: `mission.ts`
- **요구 사항**:
  1.  `initAiDashboard(containerId: string, streamSource: ReadableStream<Uint8Array>): void`:
      - 브라우저의 DOM에서 `containerId`를 갖는 컨테이너 엘리먼트를 조회합니다. 존재하지 않는 경우 에러를 반환합니다.
      - 컨테이너 내부 구조를 초기화합니다. 정상 상태의 실시간 텍스트가 렌더링될 출력 노드(`<div class="dashboard-output"></div>`)와 연결 상태 및 에러를 표시할 모니터링 노드(`<div class="dashboard-status"></div>`)를 하위 노드로 동적 삽입합니다.
      - `streamSource`의 리더를 획득하여 청크를 지속적으로 읽어 들이고 디코딩하여 `.dashboard-output`에 누적 렌더링합니다. (Chapter 12의 SSE 토큰 파싱 기법 적용)
      - 스트림 처리 과정에서 네트워크 에러, CORS 예외 혹은 디코딩 에러가 발생하는 경우 즉시 `try-catch` 블록으로 이를 가로채고, `.dashboard-status` 영역에 `"CORS_OR_NETWORK_ERROR"`라는 에러 상태 클래스를 추가한 뒤 `"CORS or Network Failure"`라는 에러 안내 메시지 문자열을 렌더링하는 레이아웃 스위칭 흐름을 완성합니다.

## 💡 힌트 및 트러블슈팅

- 테스트 코드 작성을 위해 `mission.test.ts` 상단에 `/** @jest-environment jsdom */`을 기재하십시오.
- CORS 또는 네트워크 에러는 `streamSource`의 리더로부터 `read()`를 호출할 때 Promise가 Reject 되는 현상으로 모사할 수 있습니다. `try-catch` 구문으로 비동기 루프를 감싸 예외 발생 시 에러 뷰 레이아웃을 그리도록 코딩하십시오.
- 에러 상태로 스위칭 시 기존 `.dashboard-output` 영역은 흐리게(Opacity 등) 처리하거나 숨김 처리하고, 에러 안내문이 중앙에 표시되도록 CSS 클래스를 결합해 주는 것이 좋습니다.
- *(보안 경고): 신뢰할 수 없는 외부 소스(LLM 스트림 등)의 텍스트를 DOM에 삽입할 때 `innerHTML`을 사용하면 XSS 취약점이 발생할 수 있습니다. 가급적 `textContent`를 사용하거나 철저한 이스케이프 처리를 병행해야 합니다.*
