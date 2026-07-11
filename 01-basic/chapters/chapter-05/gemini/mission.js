/**
 * Chapter 05: 조건문 분기
 */

/**
 * Task 1: evalGrade
 * 입력된 점수를 평가하여 학점('A', 'B', 'C', 'F')을 반환합니다.
 * @param {number} score - 평가할 점수
 * @returns {string} 학점 문자 ('A', 'B', 'C', 'F')
 */
export function evalGrade(score) {
  // TODO: score의 유효성을 검사하고 조건에 맞는 학점 문자를 반환하세요.
  return 'F';
}

/**
 * Task 2: checkAccess
 * 삼항 연산자를 활용해 나이와 면허 여부에 따른 접근 권한을 확인합니다.
 * @param {number} age - 나이
 * @param {boolean} hasLicense - 면허 소지 여부
 * @returns {string} 'granted' 또는 'denied'
 */
export function checkAccess(age, hasLicense) {
  // TODO: 삼항 연산자만을 사용하여 한 줄로 접근 여부를 판별해 반환하세요.
  return 'denied';
}

/**
 * Task 3: getRoleName
 * switch 문을 활용하여 권한 코드에 따른 역할 이름을 반환합니다.
 * @param {string} roleCode - 권한 코드 ('ADMIN', 'EDITOR', 'USER' 등)
 * @returns {string} 역할 이름
 */
export function getRoleName(roleCode) {
  // TODO: switch 문을 사용하여 코드를 판별하고, 해당되는 역할을 반환하세요.
  return '알 수 없는 역할';
}
