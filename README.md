# Forma — Design Your Workspace

A 3D workspace builder for [monis.rent](https://www.monis.rent/), built for the Desent Solutions developer challenge.

**Live URL:** https://desent.arigunawanj.com/

## Approach

The brief asked for something "cool, visual, fun" instead of just another catalog grid, so that's what I went for: a 3D room that updates live as you pick things — desk, chair, monitors, lamp, plant, coffee station, outdoor gear, relax zone, garage space. The catalog panel on the side is grouped by category, and once you're happy with the setup you can open the summary to see everything itemized plus the total before "renting."

Flow: pick a desk and chair (one each, required) → add monitors with a stepper → toggle whatever extras you want → review it all and the total in a slide-over → confirm.

## Why these tools

- **Next.js 16 (App Router) + React 19 + TypeScript** — required by the brief, and a natural fit for this kind of single interactive page.
- **Three.js via `@react-three/fiber` + `@react-three/drei`** — lets the scene be written as React components (OrbitControls, lighting, ContactShadows) instead of raw imperative Three.js, which made the room/furniture composition much easier to reason about.
- **GSAP + `@gsap/react`** — hero and summary panel reveal animations, using `useGSAP` so cleanup on unmount is handled for you.
- **Tailwind CSS + shadcn/ui** — already set up in the repo, so I reused the existing `Tabs`, `Sheet`, `Button` instead of rebuilding them.
- **Plain React state** (`useState` in a `useWorkspaceSelection` hook) — it's a single page, no real need for Zustand or Redux.
- **Vercel** for deployment, as required.

## What I'd do with more time

- Proper furniture models/materials — a couple of pieces (coffee machine, scooter) still borrow geometry from other items as a time-saving shortcut.
- Tune 3D performance on mobile — it works, but isn't optimized (LOD, shadow resolution, etc).
- Persist the chosen setup (query string or localStorage) so a reload or shared link doesn't reset to default.
- Pull pricing/availability from a real API instead of a static catalog file.
- A real checkout flow — "Rent this setup" is currently just a confirmation UI, not an actual reservation.

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
