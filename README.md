# JavaScript & TypeScript & React 마스터 과정 (기초, 중급, 고급 3대 트랙)

이 프로젝트는 자바스크립트 학습의 다양한 진입 장벽을 정밀하게 맞추기 위해 **기초(01-basic)**, **중급(02-intermediate)**, **고급(03-advanced)**의 3대 독립적인 실습 트랙으로 나누어 구축되어 있습니다.

본 교육 과정은 시간적인 제약(주차별 일정)에 구애받지 않고, 학습자가 자신의 속도에 맞춰 순차적으로 마스터해 나가는 **챕터(Chapters) 기반의 자기주도형 학습 체계**를 따릅니다.

## 📂 폴더 구조 안내

```text
/Users/jaehkim/projects/javascript/
├── package.json               # [통합] 루트 의존성 및 스크립트 선언
├── tsconfig.json              # [통합] TypeScript 설정
├── eslint.config.js           # [통합] ESLint 설정
├── jest.config.js             # [통합] Jest 설정
├── .prettierrc                # [통합] Prettier 설정
├── node_modules/              # [통합] 루트에 단 하나만 존재
├── README.md                  # 루트 가이드 (본 파일)
│
├── 01-basic/                  # [기초 트랙 - 바닐라 JS]
│   ├── progress.md            # 기초 진도표 (기본 문법, 내장 고차 함수, DOM 제어 등 챕터별 관리)
│   └── README.md              # 기초 시작 가이드
│
├── 02-intermediate/           # [중급 트랙 - TS & React]
│   ├── progress.md            # 중급 진도표 (TypeScript 기초, React 기본, 전역 상태 등 챕터별 관리)
│   └── README.md              # 중급 시작 가이드
│
└── 03-advanced/               # [고급 트랙 - 프론트엔드 아키텍처]
    ├── progress.md            # 고급 진도표 (가상 DOM 설계, SSR/Hydration, 스트리밍 등 챕터별 관리)
    └── README.md              # 고급 시작 가이드
```

---

## 🚀 학습 시작 방법

각 트랙은 서로 영향을 받지 않도록 독립적으로 관리되며, 루트 경로의 단일 `node_modules`를 공유합니다. 루트 경로에서 패키지를 설치한 후 테스트 및 린트를 실행할 수 있습니다.

### 의존성 패키지 최초 1회 설치 (최상위 루트에서 실행)

```bash
npm install
```

### A. 기초 트랙 (01-basic) 테스트 구동

```bash
npm run test:basic
```

### B. 중급 트랙 (02-intermediate) 테스트 구동

```bash
npm run test:intermediate
```

### C. 고급 트랙 (03-advanced) 테스트 구동

```bash
npm run test:advanced
```

_현재 학습자의 진도에 맞추어 각 트랙의 실습 코드가 챕터별로 구성되어 대기 중입니다._
