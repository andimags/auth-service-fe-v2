# Repository Rules & Architecture

## Stack
- Next.js 14 App Router
- TypeScript
- All backend communication via internal API routes

---

## ⚠️ Core Architecture Rule (STRICT — No Exceptions)

ALL backend requests must go through Next.js API routes.

| ❌ Never | ✅ Always |
|----------|-----------|
| Call backend directly from client components | Call `/api/*` routes from client |
| Use external backend URLs in client code | Proxy requests through `app/api/**/route.ts` |
| Put fetch/axios calls to backend in components | Keep backend logic inside route files only |

**Required flow:**

---

## API Route Rules

- All backend communication lives in `app/api/**/route.ts`
- Each route acts as a proxy — receive, forward, return, handle errors
- No backend URLs or fetch logic outside of route files

**Standard API route pattern:**
```ts
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/users`, {
      headers: { Authorization: req.headers.get('authorization') ?? '' },
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
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
- Directly call external APIs
- Hold fetch logic targeting the backend

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| API route folders | kebab-case | `app/api/user-profile/route.ts` |
| Components | PascalCase | `UserTable.tsx`, `RoleModal.tsx` |
| Hooks | camelCase + `use` prefix | `useUsers`, `useAuth` |
| API functions | camelCase verbs | `getUsers`, `createUser` |
| Variables | camelCase | `userData`, `isLoading` |

---

## Consistency Rule

If a pattern exists in the codebase, replicate it exactly.
Do not introduce new patterns for problems already solved.
One pattern per concern — no duplicates.