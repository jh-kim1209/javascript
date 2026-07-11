import { validateGithubActionWorkflow } from './mission';

describe('Chapter 14: GitHub Actions Workflow YAML 정적 분석기 검증', () => {
  test('Task 1: 올바른 형식과 Secrets 참조가 포함된 워크플로우 통과 검증', () => {
    const yaml = `
      name: Deploy Service
      on:
        push:
          branches: [ main ]
      jobs:
        build-and-push:
          runs-on: ubuntu-latest
          steps:
            - name: Checkout code
              uses: actions/checkout@v3
            - name: Log in to Docker Registry
              run: echo "\${{ secrets.DOCKER_PASSWORD }}" | docker login -u \${{ secrets.DOCKER_USERNAME }} --password-stdin
    `;

    const result = validateGithubActionWorkflow(yaml);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('Task 1: 필수 최상위 지시어(on, jobs) 누락 감지 검증', () => {
    const yaml = `
      name: Incomplete Workflow
      jobs:
        build:
          runs-on: ubuntu-latest
          steps:
            - run: echo "Hello"
    `;

    const result = validateGithubActionWorkflow(yaml);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Missing 'on' trigger specification");
  });

  test('Task 1: Job 정의 하위의 runs-on 또는 steps 누락 감지 검증', () => {
    const yaml = `
      on: [push]
      jobs:
        test-job:
          # runs-on 이 누락됨
          steps:
            - run: npm test
    `;

    const result = validateGithubActionWorkflow(yaml);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes('runs-on') && e.includes('test-job'))).toBe(true);
  });

  test('Task 1: secrets 식별자 없이 토큰/비밀번호가 하드코딩 노출된 보안 위반 감지 검증', () => {
    const yaml = `
      on: [push]
      jobs:
        deploy:
          runs-on: ubuntu-latest
          steps:
            - name: Deploy API
              env:
                # 하드코딩된 API Key 자격증명 노출
                API_KEY: "prod_live_secret_key_12345"
              run: npm run deploy
    `;

    const result = validateGithubActionWorkflow(yaml);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain(
      'Security violation: Hardcoded credentials detected. Use GitHub Secrets instead.'
    );
  });
});
