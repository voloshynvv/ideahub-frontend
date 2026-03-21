# IdeaHub Frontend

A minimalist app for sharing ideas and exploring a community feed.

## Links

- Live Site: https://ideahub-frontend.vercel.app
- Backend/API Repo: https://github.com/voloshynvv/ideahub-backend


## The Challenge

The goal of this project is to build a lightweight yet practical frontend that reflects real-world application workflows.

It includes `authentication`, `protected routes`, `authorized actions`, `optimistic UI updates`, and a `feature-based folder structure` for scalability and maintainability.

With this app, users can:

- browse a paginated feed of posts
- search posts by keyword
- create an account and sign in
- open full post details
- react to posts with emojis
- edit or delete their own posts



## Built With

- React
- TypeScript
- TanStack Router
- TanStack Query
- Tailwind
- Better Auth
- Axios
- Zod


## Folder Structure

```text
src/
  app/          # routing, providers, app-level setup
  components/   # shared UI and layout components
  features/     # feature-based modules like auth and posts
  lib/          # utilities, API client, auth client, date helpers
  types/        # api models
```


## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment variables

Copy `.env.example` into `.env` and provide the required values:

```env
VITE_API_BASE_URL=
VITE_AUTH_BASE_URL=
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```
