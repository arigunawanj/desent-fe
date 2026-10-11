export type DeskVariant = "standing" | "classic";
export type ChairVariant = "ergo" | "mesh";

export interface DeskOption {
  id: string;
  name: string;
  price: number;
  color: string;
  variant: DeskVariant;
}

export interface ChairOption {
  id: string;
  name: string;
  price: number;
  color: string;
  variant: ChairVariant;
}

export interface AccessoryOption {
  id: AccessoryKey;
  name: string;
  price: number;
  color: string;
  group: AccessoryGroup;
}

export type AccessoryKey =
  | "lamp"
  | "plant"
  | "coffeeMachine"
  | "surfboard"
  | "motorcycle"
  | "beanBag"
  | "toolShelf";

export type AccessoryGroup =
  | "accessories"
  | "coffeeStation"
  | "outdoorGear"
  | "relaxZone"
  | "garageSpace";

export interface WorkspaceSelection {
  deskId: string;
  chairId: string;
  monitorCount: number;
  accessories: Record<AccessoryKey, boolean>;
}
