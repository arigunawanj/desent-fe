# monis.rent — 3D Workspace Studio (Bali)

An interactive 3D workspace designer and equipment rental experience built for [monis.rent](https://monis.rent/) as part of the **Desent Solutions Developer Challenge**.

**Live URL:** [https://desent.arigunawanj.com/](https://desent.arigunawanj.com/)  
**GitHub Repository:** [https://github.com/arigunawanj/desent-fe](https://github.com/arigunawanj/desent-fe) (Collaborator: `desent-bot`)

---

## The Challenge & Concept

Digital nomads and remote developers landing in Bali need a productive, ergonomic workspace without the friction of buying furniture or scrolling through rigid spreadsheets. 

This app transforms workspace rental into an engaging, visual sandbox:
1. **Interactive 3D Villa Studio**: Real-time 3D room powered by Three.js that updates dynamically as furniture, monitors, and lifestyle equipment are selected.
2. **Day / Sunset / Night Ambience Engine**: Experience your setup in bright Bali morning sunlight, golden hour sunset, or warm nighttime studio glow with interactive desk lamp spotlights and glowing monitor screens.
3. **Interactive 3D Hotspots**: Floating pulse pins situated right in the 3D room (matching the design sketch wireframe) allowing 1-click toggling of monitors, desk lamps, tropical plants, coffee stations, surfboards, and scooters directly on the model.
4. **Multiple Camera Perspectives**: Seamlessly toggle between Isometric 3D, Nomad Desk Focus (front view), and Top-down architectural plan view.
5. **Categorized Bali Nomad Catalogue**:
   - **Desks**: Classic Teak/Oak Desk vs Dual-Motor Electric Standing Desk
   - **Chairs**: Ergo Pro Mesh Chair (8+ hrs focus) vs Oak Studio Lounge Chair
   - **Displays**: Multi-screen monitor stepper (1 to 3 Xiaomi 4K IPS displays with VESA mounts)
   - **Desk Extras**: Smart LED desk lamp, Tropical Monstera pot
   - **Bali Lifestyle**: Barista espresso machine, 6'4 Canggu surfboard, Yamaha NMAX scooter, villa bean bag lounge, industrial oak bookcase
6. **Bali Delivery & Rental Customizer**:
   - Duration selector (1 Week sprint, 1 Month standard, 3 Months with 15% Nomad Long Stay discount)
   - Bali delivery area selector (Canggu & Berawa, Pererenan, Seminyak, Ubud, Uluwatu, Sanur)
   - Dual currency support (IDR `Rp` / USD `$`)
7. **Complete Checkout & Summary Flow**:
   - Instant WhatsApp rental order generator (prefilled with full gear specs and villa delivery location for direct concierge booking)
   - Downloadable setup specification receipt (`.txt`)
   - 1-click clipboard spec copy

---

## Tech Stack

- **Next.js 16 (App Router) + React 19 + TypeScript**: Modern React architecture with Server Components and client-side 3D interactivity.
- **Three.js + `@react-three/fiber` + `@react-three/drei`**: Declarative 3D room, real-time lighting shaders, ContactShadows, and 3D `<Html>` interactive hotspot pins.
- **Tailwind CSS v4 + Radix/Base UI**: Modern responsive design, responsive drawers, glassmorphism toolbars, and micro-interactions.
- **Vercel**: Continuous deployment via Git push.

---

## What I'd Improve With More Time

1. **Custom GLTF Model Optimization**: Convert heavy assets into Draco-compressed GLB files with LOD (Level of Detail) tiers for mobile devices.
2. **Room Layout Customization**: Allow users to drag and rearrange furniture positions in the room via 3D gizmos or grid snapping.
3. **Persisted Shareable URLs**: Encode room configuration into URL hash/params (`?desk=standing&chair=ergo&monitors=2&surfboard=1`) for instant team sharing.
4. **Live Stripe / Midtrans Payment Gateway**: Connect direct checkout with payment links and automated villa delivery dispatch.

---

## Getting Started Locally

```bash
git clone https://github.com/arigunawanj/desent-fe.git
cd desent-fe
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the 3D Workspace Studio.
