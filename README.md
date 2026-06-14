# App Graph Builder

A responsive "App Graph Builder" UI — Frontend Intern take-home task.

🔗 **Live Demo:** [app-graph-builder.vercel.app](https://app-graph-builder-weld.vercel.app)

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
[GitHub](https://github.com/sidharth-webdev) · [LinkedIn](www.linkedin.com/in/sidharth-webdev)
<img width="1920" height="1080" alt="Screenshot 2026-06-15 005501" src="https://github.com/user-attachments/assets/e6716562-b0ac-41af-b7c6-fb73184e121f" />
<img width="1920" height="1080" alt="Screenshot 2026-06-15 004458" src="https://github.com/user-attachments/assets/8e7082da-eb71-4b32-81e5-f2665696accd" />
<img width="1920" height="1080" alt="Screenshot 2026-06-15 004448" src="https://github.com/user-attachments/assets/204f73f8-cfcc-4bbf-9a57-c1415951c462" />
<img width="1920" height="1080" alt="Screenshot 2026-06-15 004430" src="https://github.com/user-attachments/assets/3bfe7f34-911c-4db7-9b9d-d5d30fdb70ab" />
<img width="1920" height="1080" alt="Screenshot 2026-06-15 004049" src="https://github.com/user-attachments/assets/cba36d8e-c7dc-4670-8c65-c71e66450fb5" />
<img width="1920" height="1020" alt="Screenshot 2026-06-14 194510" src="https://github.com/user-attachments/assets/9ca484db-f580-4464-9868-176c3b930051" />
