"use client";

import { useMemo, useState } from "react";
import { ACCESSORIES, CHAIRS, DESKS, MAX_MONITORS, MONITOR_PRICE } from "@/lib/catalog";
import type { AccessoryKey, WorkspaceSelection } from "@/lib/types";

const INITIAL_SELECTION: WorkspaceSelection = {
  deskId: DESKS[0].id,
  chairId: CHAIRS[0].id,
  monitorCount: 2,
  accessories: {
    lamp: true,
    plant: false,
    coffeeMachine: false,
    surfboard: false,
    motorcycle: false,
    beanBag: false,
    toolShelf: false,
  },
};

export function useWorkspaceSelection() {
  const [selection, setSelection] = useState<WorkspaceSelection>(INITIAL_SELECTION);

  const desk = useMemo(
    () => DESKS.find((d) => d.id === selection.deskId) ?? DESKS[0],
    [selection.deskId],
  );
  const chair = useMemo(
    () => CHAIRS.find((c) => c.id === selection.chairId) ?? CHAIRS[0],
    [selection.chairId],
  );

  const activeAccessories = useMemo(
    () => ACCESSORIES.filter((a) => selection.accessories[a.id]),
    [selection.accessories],
  );

  const total = useMemo(() => {
    const monitorsTotal = selection.monitorCount * MONITOR_PRICE;
    const accessoriesTotal = activeAccessories.reduce((sum, a) => sum + a.price, 0);
    return desk.price + chair.price + monitorsTotal + accessoriesTotal;
  }, [desk, chair, selection.monitorCount, activeAccessories]);

  function selectDesk(id: string) {
    setSelection((prev) => ({ ...prev, deskId: id }));
  }

  function selectChair(id: string) {
    setSelection((prev) => ({ ...prev, chairId: id }));
  }

  function setMonitorCount(count: number) {
    setSelection((prev) => ({
      ...prev,
      monitorCount: Math.max(0, Math.min(MAX_MONITORS, count)),
    }));
  }

  function toggleAccessory(key: AccessoryKey) {
    setSelection((prev) => ({
      ...prev,
      accessories: { ...prev.accessories, [key]: !prev.accessories[key] },
    }));
  }

  return {
    selection,
    desk,
    chair,
    activeAccessories,
    total,
    selectDesk,
    selectChair,
    setMonitorCount,
    toggleAccessory,
  };
}
