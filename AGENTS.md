# Repository Rules & Architecture

## Stack

- Next.js 14 App Router
- TypeScript
- All backend communication via internal API routes

---

## ⚠️ Core Architecture Rule (STRICT — No Exceptions)

ALL backend requests must go through Next.js API routes.

| ❌ Never                                       | ✅ Always                                    |
| ---------------------------------------------- | -------------------------------------------- |
| Call backend directly from client components   | Call `/api/*` routes from client             |
| Use external backend URLs in client code       | Proxy requests through `app/api/**/route.ts` |
| Put fetch/axios calls to backend in components | Keep backend logic inside route files only   |

**Required flow:**

---

## Backend URL Rule

The backend is accessed exclusively via the `/backend/*` rewrite defined in `next.config.ts`.

```ts
// next.config.ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: "/backend/:path*",
                destination: `${process.env.AUTH_SERVICE_BASE_URL}/:path*`,
            },
        ]
    },
}

export default nextConfig
```

- `AUTH_SERVICE_BASE_URL` is set in `.env` and never hardcoded
- `/backend/*` is only called from inside `app/api/**/route.ts`
- Never use `AUTH_SERVICE_BASE_URL` directly in any file other than `next.config.ts`

---

## HTTP Client Rule

Always use the native `fetch` API for all HTTP requests.

❌ NEVER use `axios`, `ky`, or any third-party HTTP client
✅ ALWAYS use `fetch` — in API routes and anywhere else HTTP calls are made

## API Route Rules

- All backend communication lives in `app/api/**/route.ts`
- Each route calls `/backend/*` internally — never the external URL directly
- Each route: receive, forward, return, handle errors consistently

**Standard API route pattern:**

```ts
// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/backend/users`,
            {
                headers: {
                    Authorization: req.headers.get("authorization") ?? "",
                },
            }
        )
        const data = await res.json()
        return NextResponse.json(data, { status: res.status })
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}
```

---

## Client Component Rules

Client components may ONLY:

- Call internal `/api/*` routes
- Handle UI logic, state, and rendering

Client components must NEVER:

- Contain backend URLs
- Call `/backend/*` directly
- Directly call external APIs
- Hold fetch logic targeting the backend

---

## Naming Conventions

| Type              | Convention               | Example                          |
| ----------------- | ------------------------ | -------------------------------- |
| API route folders | kebab-case               | `app/api/user-profile/route.ts`  |
| Components        | PascalCase               | `UserTable.tsx`, `RoleModal.tsx` |
| Hooks             | camelCase + `use` prefix | `useUsers`, `useAuth`            |
| API functions     | camelCase verbs          | `getUsers`, `createUser`         |
| Variables         | camelCase                | `userData`, `isLoading`          |

---

## Consistency Rule

If a pattern exists in the codebase, replicate it exactly.
Do not introduce new patterns for problems already solved.
One pattern per concern — no duplicates.
