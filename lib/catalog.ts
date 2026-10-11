import type { AccessoryOption, ChairOption, DeskOption } from "./types";

export const DESKS: DeskOption[] = [
  {
    id: "desk-classic",
    name: "Classic Oak Desk",
    price: 850_000,
    color: "#b08968",
    variant: "classic",
    description: "Natural oak · Warm & timeless",
    spec: "Solid wood · 160 × 80 cm",
    image: "/products/oak-desk.png",
  },
  {
    id: "desk-standing",
    name: "Studio Metal Desk",
    price: 1_200_000,
    color: "#d9d9d9",
    variant: "standing",
    description: "Brushed metal · Industrial character",
    spec: "Steel frame · Height adjustable",
    image: "/products/steel-desk.png",
  },
];

export const CHAIRS: ChairOption[] = [
  {
    id: "chair-ergo",
    name: "Ergo Pro Chair",
    price: 650_000,
    color: "#232323",
    variant: "ergo",
    description: "Graphite upholstery · Swivel base",
    spec: "Breathable mesh · Lumbar support",
    image: "/products/office-chair.png",
  },
  {
    id: "chair-mesh",
    name: "Oak Lounge Chair",
    price: 450_000,
    color: "#3a6ea5",
    variant: "mesh",
    description: "Solid wood frame · Cushioned comfort",
    spec: "Natural oak · Deep foam seat",
    image: "/products/lounge-chair.png",
  },
];

export const MONITOR_PRICE = 400_000;
export const MAX_MONITORS = 3;

export const ACCESSORIES: AccessoryOption[] = [
  {
    id: "plant",
    name: "Plant",
    price: 80_000,
    color: "#3f8e4f",
    group: "accessories",
    description: "Potted greenery · Terracotta pot",
    image: "/products/plant.png",
  },
  {
    id: "lamp",
    name: "Desk Lamp",
    price: 150_000,
    color: "#f2b705",
    group: "accessories",
    description: "Warm LED · Focused light",
    image: "/products/lamp.png",
  },
  {
    id: "coffeeMachine",
    name: "Coffee Machine",
    price: 300_000,
    color: "#5c3a21",
    group: "coffeeStation",
    description: "Coffee Station · Italian espresso maker",
    image: "/products/coffee.png",
  },
  {
    id: "surfboard",
    name: "Surfboard",
    price: 500_000,
    color: "#f26a4b",
    group: "outdoorGear",
    description: "Outdoor Gear · 6'4 funboard",
    image: "/products/surfboard.png",
  },
  {
    id: "motorcycle",
    name: "City Scooter",
    price: 2_500_000,
    color: "#1f1f1f",
    group: "outdoorGear",
    description: "Outdoor Gear · 155cc automatic",
    image: "/products/scooter.png",
  },
  {
    id: "beanBag",
    name: "Lounge Seat",
    price: 350_000,
    color: "#8e44ad",
    group: "relaxZone",
    description: "Relax Zone · Oak lounge armchair",
    image: "/products/lounge-chair.png",
  },
  {
    id: "toolShelf",
    name: "Oak Bookcase",
    price: 800_000,
    color: "#6b4f3a",
    group: "garageSpace",
    description: "Garage Space · 4-tier modular shelf",
    image: "/products/shelf.png",
  },
];

export const ACCESSORY_GROUP_LABEL: Record<AccessoryOption["group"], string> = {
  workstation: "Workstation",
  monitors: "Monitors",
  accessories: "Accessories",
  coffeeStation: "Coffee Station",
  outdoorGear: "Outdoor Gear",
  relaxZone: "Relax Zone",
  garageSpace: "Garage Space",
};
