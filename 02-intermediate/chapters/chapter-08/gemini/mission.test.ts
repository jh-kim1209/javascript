import { renderComponent, FunctionComponent } from "./mission";

describe("Chapter 08: React 컴포넌트 Props 및 State 타이핑 검증", () => {
  interface UserProps {
    name: string;
    age?: number;
    role: string;
  }

  const UserComponent: FunctionComponent<UserProps> = (props) => {
    return `<div>${props.name} (${props.age}), Role: ${props.role}</div>`;
  };

  UserComponent.requiredProps = ["name", "role"];
  UserComponent.defaultProps = {
    age: 20
  };

  test("Task 1: 올바른 Props가 주어졌을 때 defaultProps와 병합하여 정상적으로 HTML 문자열을 렌더링해야 합니다.", () => {
    const props = { name: "홍길동", role: "admin" };
    const html = renderComponent(UserComponent, props);

    expect(html).toBe("<div>홍길동 (20), Role: admin</div>");
  });

  test("Task 1: defaultProps 값을 오버라이딩하여 정상적으로 렌더링해야 합니다.", () => {
    const props = { name: "이순신", age: 35, role: "user" };
    const html = renderComponent(UserComponent, props);

    expect(html).toBe("<div>이순신 (35), Role: user</div>");
  });

  test("Task 1: 필수 Props(name)가 누락되었을 때 에러를 발생시켜야 합니다.", () => {
    const props = { role: "guest" };

    expect(() => {
      renderComponent(UserComponent, props);
    }).toThrow("Missing required prop: name");
  });

  test("Task 1: 필수 Props(role)가 null로 전달되었을 때 에러를 발생시켜야 합니다.", () => {
    const props = { name: "김유신", role: null };

    expect(() => {
      renderComponent(UserComponent, props);
    }).toThrow("Missing required prop: role");
  });
});
