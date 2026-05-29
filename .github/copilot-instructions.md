# Rules for This Repository

## Architecture Rule (STRICT)

ALL backend requests must go through Next.js API routes.

❌ NEVER call backend directly from client components  
❌ NEVER use external backend URLs in client code  

✅ ONLY call internal API routes from the client:

/api/*

Flow:
Client → Next.js API Route → Backend API

---

## API Route Location Rule

All backend communication must be implemented inside:

app/api/**/route.ts

Each route acts as a proxy to the backend.

---

## Client Rule

Client components are ONLY allowed to:
- call /api/*
- handle UI logic
- handle state and rendering

No backend logic in client components.

---

## API Pattern Rule

Every API route must:
- receive request from client
- forward request to backend
- return backend response
- handle errors consistently

---

## Naming Conventions

### Files & Folders
- API routes: kebab-case folders when needed
- Example: app/api/user-profile/route.ts

### Components
- PascalCase
- Example: UserTable.tsx, RoleModal.tsx

### Hooks
- camelCase starting with "use"
- Example: useUsers, useAuth

### API functions (inside route files or helpers)
- camelCase verbs
- Example: getUsers, createUser, deleteUser

### Variables
- camelCase only

---

## Code Structure Rule

- Keep API logic inside route.ts only
- Avoid scattering fetch logic across components
- Centralize backend communication through API routes
- Keep client components clean and UI-focused only

---

## Consistency Rule

If a pattern is used once in the codebase, reuse it everywhere.
No duplicate patterns for API handling.