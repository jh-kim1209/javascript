# Chapter 14: 배포 자동화: GitHub Actions + Docker Registry CI/CD 파이프라인 (CI/CD Pipeline)

## 📖 핵심 개념

코드의 통합(CI)부터 컨테이너 이미지 자동 빌드 및 컨테이너 레지스트리(Docker Registry) 배포(CD)까지의 전 과정을 자동화하는 GitHub Actions 워크플로우 명세와 파이프라인 보안 강화 설계입니다.

- **CI/CD 배포 자동화 (CI/CD Pipeline)**:
  - 버전 관리 시스템의 이벤트를 트리거로 컴파일, 테스트, 배포 프로세스를 자동으로 구동하는 개발 프로세스입니다. (자세한 내용은 [용어 사전](../../../../GLOSSARY.md#github-actions-cicd) 참고)
  - **Friendly_Tutor의 친절한 비유**: "자동화된 최첨단 조립 공장과 같습니다. 개발자가 작업대(GitHub)에 코드 푸시(Push)라는 완료 버튼을 누르면, 조립 라인(GitHub Actions)이 즉시 가동되어 로봇 팔들이 부품을 조립하고(빌드), 불량품이 없는지 전수 검사하며(테스트), 이상이 없으면 상자에 담아 트럭에 싣고 배송(Docker Registry 배포)하는 과정이 물 흐르듯 자동으로 이루어집니다."
- **YAML 민감 정보 노출 보안 결함 및 Secrets 관리**:
  - CI/CD 자동화 파일에 기밀성 자격 증명(API Key, Password 등)을 노출하지 않고 안전하게 관리하는 설계 규칙입니다.
  - **Senior_Practitioner의 실무 팁**: "절대로 Docker Hub 패스워드나 클라우드 API Key를 GitHub Actions 워크플로우 YAML 파일에 하드코딩하여 작성하면 안 됩니다. 만약 퍼블릭 저장소에 노출되면 크롤러 봇에 의해 몇 초 만에 탈취당하고 비정상적인 서버 요금 폭탄을 맞거나 핵심 인프라가 마비됩니다. 따라서 모든 민감 정보는 GitHub Repository의 Secrets 메뉴에 안전하게 등록한 후, YAML 내부에서는 `${{ secrets.DOCKER_PASSWORD }}`와 같이 토큰 바인딩 문법을 통해서만 참조하도록 정적 검증을 의무화해야 합니다."
- **Workflow YAML 사양 및 독립 러너 동작 메커니즘**:
  - **PhD_Book_Author의 학술 스펙**: "GitHub Actions의 각 워크플로우는 YAML 포맷으로 정의되며, 트리거 조건인 `on` 지시어와 실제 작업을 수행하는 `jobs` 블록으로 나뉩니다. 각 `job`은 독립된 가상 환경 컨테이너(Runner)에서 개별적으로 구동되며, 병렬 혹은 의존성 순서(`needs`)에 따라 직렬 실행됩니다. 러너 내부에서는 선언된 `steps` 리스트에 정의된 액션(`uses`)과 쉘 커맨드(`run`)가 순차적이고 격리된 프로세스로 처리되며 상태가 관리됩니다."

## 🧪 실습 미션

- **미션 파일**: `mission.ts`
- **요구 사항**:
  1.  `validateGithubActionWorkflow(yamlContent: string): { isValid: boolean; errors: string[] }`:
      - GitHub Actions 워크플로우 YAML 문자열을 라인별로 파싱하여 정적 분석을 진행합니다.
      - 워크플로우 트리거 조건인 `on:`과 실행할 작업 정의부인 `jobs:` 지시어가 최상위 레벨에 누락 없이 들어있는지 검증합니다.
      - `jobs` 내부에 정의된 각 job들이 독립 실행 환경 사양인 `runs-on:`과 실행 세부 순서인 `steps:`를 모두 지정하고 있는지 검증합니다.
      - 보안 검증을 수행합니다. YAML 내용 중 `password`, `token`, `api-key`, `secret` 등의 자격 증명 관련 키워드가 선언되었을 때, 우측의 할당 값에 `${{ secrets.` 패턴이 포함되지 않고 텍스트 그대로 하드코딩되어 작성된 보안 위반을 감지하면 `"Security violation: Hardcoded credentials detected. Use GitHub Secrets instead."` 에러를 배열에 추가합니다.

## 💡 힌트 및 트러블슈팅

- YAML 특성상 콜론 `:`을 기준으로 키와 값이 분리되므로, 각 행을 `:` 단위로 분할하여 왼쪽 키와 오른쪽 값을 추출해 매핑 상태를 검사하세요.
- 주석(`#`로 시작하는 영역)은 파싱 단계에서 필터링하여 불필요한 키워드 검출 혼선을 줄여야 보안 위반 오탐지를 예방할 수 있습니다.
- `runs-on:` 지시어는 각 job의 자식 블록 내부에 적절한 들여쓰기와 함께 위치해야 함을 파싱 문맥에서 염두에 두십시오.
