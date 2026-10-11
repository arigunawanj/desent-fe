"use client";

import { useMemo, useState } from "react";
import {
  ACCESSORIES,
  BALI_LOCATIONS,
  CHAIRS,
  DESKS,
  MAX_MONITORS,
  MONITOR_PRICE,
  RENTAL_DURATIONS,
  USD_RATE,
} from "@/lib/catalog";
import type {
  AccessoryKey,
  AmbienceMode,
  CameraView,
  Currency,
  RentalDuration,
  WorkspaceSelection,
} from "@/lib/types";

const INITIAL_SELECTION: WorkspaceSelection = {
  deskId: DESKS[0].id,
  chairId: CHAIRS[0].id,
  monitorCount: 1,
  accessories: {
    lamp: false,
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
  const [ambience, setAmbience] = useState<AmbienceMode>("day");
  const [cameraView, setCameraView] = useState<CameraView>("iso");
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [duration, setDuration] = useState<RentalDuration>("1month");
  const [location, setLocation] = useState<string>(BALI_LOCATIONS[0]);
  const [currency, setCurrency] = useState<Currency>("IDR");

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

  const monthlyTotal = useMemo(() => {
    const monitorsTotal = selection.monitorCount * MONITOR_PRICE;
    const accessoriesTotal = activeAccessories.reduce((sum, a) => sum + a.price, 0);
    return desk.price + chair.price + monitorsTotal + accessoriesTotal;
  }, [desk, chair, selection.monitorCount, activeAccessories]);

  const currentDurationInfo = useMemo(
    () => RENTAL_DURATIONS.find((d) => d.id === duration) ?? RENTAL_DURATIONS[1],
    [duration],
  );

  // Period total calculated according to duration multiplier
  const periodTotal = useMemo(() => {
    return Math.round(monthlyTotal * currentDurationInfo.mult);
  }, [monthlyTotal, currentDurationInfo]);

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

  function formatPrice(idrAmount: number): string {
    if (currency === "USD") {
      const usd = Math.round(idrAmount / USD_RATE);
      return `$${usd}`;
    }
    return `Rp${idrAmount.toLocaleString("id-ID")}`;
  }

  return {
    selection,
    desk,
    chair,
    activeAccessories,
    monthlyTotal,
    periodTotal,
    duration,
    currentDurationInfo,
    location,
    currency,
    ambience,
    cameraView,
    showHotspots,
    setAmbience,
    setCameraView,
    setShowHotspots,
    setDuration,
    setLocation,
    setCurrency,
    selectDesk,
    selectChair,
    setMonitorCount,
    toggleAccessory,
    formatPrice,
  };
}
