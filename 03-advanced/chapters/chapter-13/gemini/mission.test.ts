import { validateDockerfile } from './mission';

describe('Chapter 13: Dockerfile 검증용 정적 분석기 검증', () => {
  test('Task 1: 올바른 최적화 순서의 Dockerfile이 유입될 때 에러 없이 통과하는지 검증', () => {
    const dockerfile = `
      # Base image
      FROM node:18-alpine
      
      # App dir
      WORKDIR /app
      
      # Dependency installation
      COPY package*.json ./
      RUN npm install
      
      # Source copy
      COPY . .
      
      EXPOSE 3000
      CMD ["node", "index.js"]
    `;

    const result = validateDockerfile(dockerfile);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('Task 1: 필수 지시어(FROM, WORKDIR, CMD) 누락을 감지하고 에러를 보고하는지 검증', () => {
    const dockerfile = `
      COPY package*.json ./
      RUN npm install
      COPY . .
    `;

    const result = validateDockerfile(dockerfile);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Missing FROM directive');
    expect(result.errors).toContain('Missing WORKDIR directive');
    expect(result.errors).toContain('Missing CMD or ENTRYPOINT directive');
  });

  test('Task 1: COPY . . 가 RUN npm install 보다 먼저 선언되는 빌드 레이어 캐싱 위반 안티패턴 검증', () => {
    const dockerfile = `
      FROM node:18-alpine
      WORKDIR /app
      # 캐싱 위반: 소스 코드를 먼저 복사하고 의존성을 설치함
      COPY . .
      RUN npm install
      CMD ["node", "index.js"]
    `;

    const result = validateDockerfile(dockerfile);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain(
      'Layer caching violation: Source code copied before installing dependencies.'
    );
  });

  test('Task 1: FROM 선언이 WORKDIR 보다 나중에 위치하는 등의 순서 결함을 필터링하는지 검증', () => {
    const dockerfile = `
      WORKDIR /app
      FROM node:18-alpine
      COPY package*.json ./
      RUN npm install
      COPY . .
      CMD ["node", "index.js"]
    `;

    const result = validateDockerfile(dockerfile);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('FROM directive must be declared before WORKDIR');
  });
});
