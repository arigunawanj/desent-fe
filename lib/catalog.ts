import type { AccessoryOption, ChairOption, DeskOption } from "./types";

export const DESKS: DeskOption[] = [
  {
    id: "desk-classic",
    name: "Classic Teak / Oak Desk",
    price: 850_000,
    color: "#b08968",
    variant: "classic",
    badge: "Bali Classic",
    description: "Solid kiln-dried natural teak/oak top with smooth satin warm finish.",
    spec: "160 × 80 cm · 75 cm fixed height · Cable channel",
    image: "/products/oak-desk.png",
  },
  {
    id: "desk-standing",
    name: "Dual-Motor Electric Desk",
    price: 1_200_000,
    color: "#d9d9d9",
    variant: "standing",
    badge: "Nomad Choice",
    description: "Ultra-quiet dual motor standing desk with 4 memory height presets.",
    spec: "160 × 80 cm · 65–125 cm height · Anti-collision",
    image: "/products/steel-desk.png",
  },
];

export const CHAIRS: ChairOption[] = [
  {
    id: "chair-ergo",
    name: "Ergo Pro Mesh Chair",
    price: 650_000,
    color: "#232323",
    variant: "ergo",
    badge: "8+ Hrs Focus",
    description: "High-density breathable mesh back, 3D armrests, and dynamic lumbar.",
    spec: "Multi-angle tilt lock · Class 4 gas lift · Soft PU wheels",
    image: "/products/office-chair.png",
  },
  {
    id: "chair-mesh",
    name: "Oak Studio Lounge Chair",
    price: 450_000,
    color: "#3a6ea5",
    variant: "mesh",
    badge: "Villa Aesthetic",
    description: "Solid oak crafted frame with deep high-resilience foam cushion.",
    spec: "Relaxed ergonomic angle · Durable linen-blend fabric",
    image: "/products/lounge-chair.png",
  },
];

export const MONITOR_PRICE = 400_000;
export const MAX_MONITORS = 3;

export const ACCESSORIES: AccessoryOption[] = [
  {
    id: "lamp",
    name: "Smart LED Desk Lamp",
    price: 150_000,
    color: "#f2b705",
    group: "accessories",
    badge: "Warm Glow",
    description: "Flicker-free studio lamp with adjustable warmth & brightness control.",
    spec: "2700K–6500K CCT · Dual-axis rotation",
    image: "/products/lamp.png",
  },
  {
    id: "plant",
    name: "Tropical Monstera Pot",
    price: 80_000,
    color: "#3f8e4f",
    group: "accessories",
    badge: "Bali Greens",
    description: "Living tropical Monstera deliciosa in handcrafted terracotta pot.",
    spec: "Includes ceramic saucer · Low maintenance",
    image: "/products/plant.png",
  },
  {
    id: "coffeeMachine",
    name: "Barista Espresso Machine",
    price: 300_000,
    color: "#5c3a21",
    group: "coffeeStation",
    badge: "Nomad Fuel",
    description: "15-bar Italian pump espresso machine with steam wand & wooden bar.",
    spec: "Includes portafilter, tamper & milk pitcher",
  },
  {
    id: "surfboard",
    name: "Canggu 6'4 Surfboard",
    price: 500_000,
    color: "#f26a4b",
    group: "outdoorGear",
    badge: "Island Life",
    description: "Custom epoxy funboard perfect for Canggu & Uluwatu breaks.",
    spec: "Tri-fin FCS setup · Leash & board bag included",
  },
  {
    id: "motorcycle",
    name: "Yamaha NMAX Scooter 155cc",
    price: 2_500_000,
    color: "#1f1f1f",
    group: "outdoorGear",
    badge: "Bali Mobility",
    description: "Full automatic fuel-injected scooter with surfboard rack & 2 helmets.",
    spec: "Keyless smart key · Dual ABS · Villa delivery",
  },
  {
    id: "beanBag",
    name: "Sunbed Lounge Bean Bag",
    price: 350_000,
    color: "#8e44ad",
    group: "relaxZone",
    badge: "Sunset Chill",
    description: "Giant water-resistant outdoor fabric bean bag for terrace chill breaks.",
    spec: "Double-stitched Sunbrella canvas · EPS bead filling",
    image: "/products/lounge-chair.png",
  },
  {
    id: "toolShelf",
    name: "Industrial Oak Bookcase",
    price: 600_000,
    color: "#6b4f3a",
    group: "garageSpace",
    badge: "Organized Hub",
    description: "4-tier modular open shelf for camera gear, cords, monitors & luggage.",
    spec: "Steel frame · Solid oak shelves · 185 cm tall",
  },
];

export const ACCESSORY_GROUP_LABEL: Record<AccessoryOption["group"], string> = {
  workstation: "Workstation",
  monitors: "Monitors",
  accessories: "Desk Extras",
  coffeeStation: "Coffee Station",
  outdoorGear: "Outdoor & Mobility",
  relaxZone: "Relax Zone",
  garageSpace: "Storage Space",
};

export const BALI_LOCATIONS = [
  "Canggu & Berawa",
  "Pererenan",
  "Seminyak & Kerobokan",
  "Ubud",
  "Uluwatu & Bingin",
  "Sanur",
] as const;

export const RENTAL_DURATIONS = [
  { id: "1week", label: "1 Week", sublabel: "Sprint Stay", discount: 0, mult: 0.35 },
  { id: "1month", label: "1 Month", sublabel: "Standard Monthly", discount: 0, mult: 1 },
  { id: "3months", label: "3 Months", sublabel: "Nomad Deal (15% OFF)", discount: 0.15, mult: 2.55 },
] as const;

export const USD_RATE = 16_000;
