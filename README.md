# App Graph Builder

A responsive "App Graph Builder" UI — Frontend Intern take-home task.

🔗 **Live Demo:** [app-graph-builder.vercel.app](https://app-graph-builder.vercel.app)

---

## Setup

```bash
git clone https://github.com/sidharth-webdev/App-Graph-Builder.git
cd App-Graph-Builder
npm install
npm run dev
```

Open **http://localhost:5173**

---

## Scripts

| Script | Command |
|---|---|
| Dev | `npm run dev` |
| Build | `npm run build` |
| Preview | `npm run preview` |
| Lint | `npm run lint` |
| Typecheck | `npm run typecheck` |

---

## Tech Stack

- React + Vite + TypeScript (strict)
- ReactFlow (xyflow) — node graph canvas
- TanStack Query — mock API fetching and caching
- Zustand — UI state management
- Tailwind CSS + Radix UI (shadcn/ui base)

---

## Key Decisions

1. **Custom event bus** for ReactFlow and Inspector sync — avoids fighting ReactFlow internal state
2. **setTimeout mock APIs** instead of MSW — simpler, same pattern, no service worker needed
3. **Radix UI directly** — same base as shadcn/ui without CLI setup
4. **Zustand for UI only** — server state stays in TanStack Query

---

## Known Limitations

- Node positions reset on page refresh
- No edge deletion UI
- No undo / redo
- Settings toggles are visual only

---

## Bonus Features

- ✅ Add Node button
- ✅ Service vs Database node types
- ✅ Inspector edits persist to node data
- ✅ Keyboard shortcuts — Delete node, Fit View

---

## Author

**Sidharth Sankar Pradhan**
[GitHub](https://github.com/sidharth-webdev) · [LinkedIn](https://www.linkedin.com/in/sidharth-webdev) · [Portfolio](https://my-portfolio-kohl-one-13.vercel.app) 