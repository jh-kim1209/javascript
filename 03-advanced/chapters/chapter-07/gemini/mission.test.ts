import { validateComponentBoundary } from "./mission";

describe("Chapter 07: Next.js App Router 아키텍처 및 경계 설계 검증", () => {
  test("Task 1: 정상적인 서버 컴포넌트 검증 (훅/이벤트가 없고 DB 접근)", () => {
    const code = `
      import { db } from "./db";
      export default async function UserProfile() {
        const user = await db.query("SELECT * FROM users LIMIT 1");
        return <div>{user.name}</div>;
      }
    `;
    const result = validateComponentBoundary("UserProfile", code);
    expect(result.isClient).toBe(false);
    expect(result.errors).toEqual([]);
  });

  test("Task 1: 서버 컴포넌트에서 useState 훅 및 onClick 이벤트 사용 시 에러 검출 검증", () => {
    const code = `
      import { useState } from "react";
      export default function Counter() {
        const [count, setCount] = useState(0);
        return <button onClick={() => setCount(count + 1)}>{count}</button>;
      }
    `;
    const result = validateComponentBoundary("Counter", code);
    expect(result.isClient).toBe(false);
    expect(result.errors).toContain(
      'Server Component "Counter" cannot use client hook "useState".'
    );
    expect(result.errors).toContain(
      'Server Component "Counter" cannot use event handler "onClick".'
    );
  });

  test("Task 1: 정상적인 클라이언트 컴포넌트 검증 ('use client' 선언 및 훅 사용)", () => {
    const code = `
      "use client";
      import { useState, useEffect } from "react";
      export default function ToggleButton() {
        const [on, setOn] = useState(false);
        useEffect(() => {
          console.log("Toggled");
        }, [on]);
        return <button onClick={() => setOn(!on)}>Toggle</button>;
      }
    `;
    const result = validateComponentBoundary("ToggleButton", code);
    expect(result.isClient).toBe(true);
    expect(result.errors).toEqual([]);
  });

  test("Task 1: 클라이언트 컴포넌트에서 server-only 모듈 임포트 시 에러 검출 검증", () => {
    const code = `
      'use client';
      import "server-only";
      export default function SafeComponent() {
        return <div>Safe</div>;
      }
    `;
    const result = validateComponentBoundary("SafeComponent", code);
    expect(result.isClient).toBe(true);
    expect(result.errors).toContain(
      'Client Component "SafeComponent" cannot import "server-only".'
    );
  });

  test("Task 1: 클라이언트 컴포넌트에서 node:fs 모듈 임포트 시 에러 검출 검증", () => {
    const code = `
      "use client";
      import fs from "node:fs";
      export default function ConfigViewer() {
        const config = fs.readFileSync("./config.json", "utf-8");
        return <pre>{config}</pre>;
      }
    `;
    const result = validateComponentBoundary("ConfigViewer", code);
    expect(result.isClient).toBe(true);
    expect(result.errors).toContain(
      'Client Component "ConfigViewer" cannot import node module "fs".'
    );
  });
});
