/**
 * Chapter 12: React Context API를 통한 상태 전파 및 리렌더링 최적화 한계
 */

export interface ContextListener {
  id: string;
  onRender: () => void;
}

/**
 * Task 1: Context API Notification Simulator
 * Simulates React Context update propagation.
 * @param {ContextListener[]} listeners - Consumer listeners
 * @param {any} oldVal - Previous context value
 * @param {any} newVal - New context value
 * @returns {boolean} Returns true if updated and propagated, false otherwise
 */
export function simulateContextNotification(
  listeners: ContextListener[],
  oldVal: any,
  newVal: any
): boolean {
  // TODO: oldVal과 newVal을 비교하여 상태 전파 여부를 결정하고 리스너들을 트리거하세요.
  return false;
}
