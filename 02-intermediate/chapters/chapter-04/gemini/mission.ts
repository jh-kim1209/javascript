/**
 * Chapter 04: TypeScript 함수 타이핑 및 선택적 매개변수
 */

/**
 * Task 1: 할인율 및 세율 계산 함수
 * 상품 원가, 선택적 할인율, 선택적 세율을 적용하여 계산된 최종 가격을 반환합니다.
 * @param {number} price - 상품 원가
 * @param {number} [discountRate] - 할인율 (생략 시 0%)
 * @param {number} [taxRate] - 세율 (생략 시 10%)
 * @returns {number} 최종 적용 가격
 */
export function calculateDiscount(
  price: number,
  discountRate?: number,
  taxRate?: number
): number {
  // TODO: discountRate가 생략되면 0%, taxRate가 생략되면 10%의 기본 세율이 적용되도록 처리하여 최종 금액을 계산해 보세요.
  return 0;
}
