import type { AccessoryOption, ChairOption, DeskOption } from "./types";

export const DESKS: DeskOption[] = [
  {
    id: "desk-classic",
    name: "Classic Oak Desk",
    price: 850_000,
    color: "#b08968",
    variant: "classic",
  },
  {
    id: "desk-standing",
    name: "Studio Metal Desk",
    price: 1_200_000,
    color: "#d9d9d9",
    variant: "standing",
  },
];

export const CHAIRS: ChairOption[] = [
  {
    id: "chair-ergo",
    name: "Ergo Pro Chair",
    price: 650_000,
    color: "#232323",
    variant: "ergo",
  },
  {
    id: "chair-mesh",
    name: "Oak Lounge Chair",
    price: 450_000,
    color: "#3a6ea5",
    variant: "mesh",
  },
];

export const MONITOR_PRICE = 400_000;
export const MAX_MONITORS = 3;

export const ACCESSORIES: AccessoryOption[] = [
  { id: "lamp", name: "Desk Lamp", price: 150_000, color: "#f2b705", group: "accessories" },
  { id: "plant", name: "Plant", price: 80_000, color: "#3f8e4f", group: "accessories" },
  {
    id: "coffeeMachine",
    name: "Coffee Machine",
    price: 300_000,
    color: "#5c3a21",
    group: "coffeeStation",
  },
  {
    id: "surfboard",
    name: "Surfboard",
    price: 500_000,
    color: "#f26a4b",
    group: "outdoorGear",
  },
  {
    id: "motorcycle",
    name: "City Scooter",
    price: 2_500_000,
    color: "#1f1f1f",
    group: "outdoorGear",
  },
  {
    id: "beanBag",
    name: "Lounge Seat",
    price: 350_000,
    color: "#8e44ad",
    group: "relaxZone",
  },
  {
    id: "toolShelf",
    name: "Oak Bookcase",
    price: 600_000,
    color: "#6b4f3a",
    group: "garageSpace",
  },
];

export const ACCESSORY_GROUP_LABEL: Record<AccessoryOption["group"], string> = {
  accessories: "Accessories",
  coffeeStation: "Coffee Station",
  outdoorGear: "Outdoor Gear",
  relaxZone: "Relax Zone",
  garageSpace: "Garage Space",
};
