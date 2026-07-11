# Chapter 13: 컨테이너화 가상화: Docker 파일 작성 및 로컬 개발용 컨테이너 빌드 (Dockerization)

## 📖 핵심 개념

애플리케이션의 개발 환경과 운영 환경 간의 차이를 극복하기 위해 소스 코드와 런타임 환경 전체를 격리된 표준 컨테이너 이미지로 빌드하는 Docker 기술과 Dockerfile 최적화 기법입니다.

- **컨테이너 가상화 (Containerization)**:
  - 호스트 OS 커널을 공유하면서 프로세스 단위로 환경을 완전 격리하는 경량 가상화 기술입니다. (자세한 내용은 [용어 사전](../../../../GLOSSARY.md#docker-layer-caching) 참고)
  - **Friendly_Tutor의 친절한 비유**: "이사 갈 때 온갖 가구와 요리 도구, 재료들을 날것 그대로 트럭에 싣다가 분실하거나 부딪혀 깨지는 대신, 규격화된 하나의 밀폐형 캐리어 박스(컨테이너)에 요리 도구와 레시피 재료를 담아두고 어디서든 그 박스만 열면 즉시 똑같은 주방(런타임 환경)이 차려지도록 만드는 패키징 설명서와 같습니다."
- **Docker 빌드 레이어 캐싱 (Build Layer Caching)과 병목 방지**:
  - Dockerfile의 명령어 수행 결과가 레이어 단위로 디스크에 캐싱되어 동일한 빌드 시 재사용되는 메커니즘을 고려한 빌드 최적화 설계입니다.
  - **Senior_Practitioner의 실무 팁**: "Dockerfile을 작성할 때 레이어 캐싱 순서를 고려하지 않고 `COPY . .`로 소스 전체를 복사한 뒤 `RUN npm install`을 실행하면, 소스 코드가 단 한 줄만 바뀌어도 `COPY` 레이어 캐시가 깨집니다. 이로 인해 후속 레이어인 `RUN npm install`이 매번 처음부터 다시 수행되어 무겁고 느린 `node_modules` 설치 병목 현상이 발생합니다. 이를 방지하려면 `package.json`과 `package-lock.json`만 먼저 `COPY`하여 의존성을 설치하고, 그 후에 나머지 소스 코드를 `COPY`하는 구조로 지시어 순서를 정렬해야 빌드 시간을 수십 배 단축할 수 있습니다."
- **Docker 이미지 레이어 시스템 및 멀티 스테이지 빌드**:
  - **PhD_Book_Author의 학술 스펙**: "Docker 이미지는 Copy-on-Write (CoW) 유니온 파일 시스템(UnionFS) 기반의 읽기 전용 레이어들이 스택처럼 적층된 구조입니다. `FROM`, `RUN`, `COPY` 등의 명령어는 각각 새로운 파일 시스템 레이어를 형성하므로, 빌드 시 레이어 개수를 최소화하고 불필요한 빌드 아티팩트를 배제해야 합니다. 이를 극복하기 위해 빌드 단계를 여러 스테이지(Multi-stage Build)로 나누어 첫 번째 스테이지에서는 무거운 컴파일러와 개발 도구를 포함해 빌드를 수행하고, 최종 스테이지에서는 컴파일된 결과물만 가져와 최소한의 런타임 환경 이미지 위에 얹어 경량의 프로덕션 이미지를 생성하는 최적화 스펙을 제공합니다."

## 🧪 실습 미션

- **미션 파일**: `mission.ts`
- **요구 사항**:
  1.  `validateDockerfile(dockerfileContent: string): { isValid: boolean; errors: string[] }`:
      - Dockerfile 텍스트 설정 내용을 줄 단위로 파싱하고 주석(샵 `#`로 시작하는 행) 및 빈 줄을 제거합니다.
      - Dockerfile 빌드에 반드시 요구되는 필수 지시어(`FROM`, `WORKDIR`, `COPY`, `RUN`, `CMD` 또는 `ENTRYPOINT`)가 누락되지 않고 포함되어 있는지 검증합니다. 누락 시 오류를 보고해야 합니다.
      - 레이어 캐싱 최적화 규칙을 준수했는지 정적 검증합니다. 소스 코드 전체 복사(`COPY . .` 등)가 종속성 설치(`RUN npm install` 등)보다 먼저 이루어진 빌드 병목 안티패턴 감지 시, 에러 배열에 `"Layer caching violation: Source code copied before installing dependencies."` 문구를 추가하고 `isValid: false`를 반환합니다.
      - 지시어의 물리적 순서 흐름이 올바른지 체크합니다. 베이스 이미지 선언(`FROM`)이 컨테이너 내 작업 디렉토리 지정(`WORKDIR`)보다 먼저 선언되어야 하며, 실행 명령(`CMD` 또는 `ENTRYPOINT`)은 파일 마지막 부분(최소한 `FROM` 이후)에 위치해야 합니다.

## 💡 힌트 및 트러블슈팅

- Dockerfile 지시어는 관례적으로 대문자로 작성되나, 소문자로 유입될 수 있으므로 대소문자 구분 없이(`toLowerCase()`) 명령어를 식별하도록 정규표현식이나 문자열 파싱 로직을 준비하세요.
- 지시어의 첫 단어(예: `FROM`, `WORKDIR`, `COPY`, `RUN`, `CMD`, `ENTRYPOINT`)를 줄 단위로 추출한 뒤, 이들이 나타난 순서를 배열에 수집하여 캐싱 최적화 안티패턴과 순서 무결성을 점검하십시오.
- 예를 들어 `COPY . .`나 `COPY src` 등이 나타난 인덱스가 `RUN npm install`이 나타난 인덱스보다 작다면 이는 캐싱 안티패턴으로 판정하여 에러를 던져야 합니다. (단, `COPY package.json`이나 `COPY package*.json` 등은 의존성 설치용 복사로 취급되어 정상 허용됩니다.)
