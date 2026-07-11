/**
 * Chapter 08: React 컴포넌트 Props 및 State 타이핑
 */

export interface FunctionComponent<P = any> {
  (props: P): string;
  requiredProps?: (keyof P)[];
  defaultProps?: Partial<P>;
}

/**
 * Task 1: 컴포넌트 렌더링 함수
 * 컴포넌트 함수와 속성 객체 props를 전달받아, defaultProps 병합 및 필수 Props 검증을 마친 후 HTML 문자열로 렌더링을 시뮬레이션합니다.
 * @template P
 * @param {FunctionComponent<P>} component - 렌더링할 모의 컴포넌트 함수
 * @param {any} props - 부모로부터 전달된 Props 객체
 * @returns {string} 렌더링 결과 HTML 문자열
 */
export function renderComponent<P>(
  component: FunctionComponent<P>,
  props: any
): string {
  // TODO: defaultProps 병합 및 requiredProps의 유효성을 검증(누락 시 Error 투척)한 후 component를 실행하여 문자열을 반환하세요.
  return "";
}
