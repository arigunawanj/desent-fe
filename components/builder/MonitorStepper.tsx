"use client";

import { MAX_MONITORS, MONITOR_PRICE } from "@/lib/catalog";
import { Minus, Plus, Monitor } from "lucide-react";

export function MonitorStepper({
  count,
  onChange,
}: {
  count: number;
  onChange: (count: number) => void;
}) {
  return (
    <div className="monitor-stepper">
      <Monitor size={27} strokeWidth={1.4} />
      <div>
        <strong>Monitor</strong>
        <small>Rp{MONITOR_PRICE.toLocaleString("id-ID")} / month each</small>
      </div>
      <div className="stepper-controls">
        <button
          type="button"
          className="icon-button"
          aria-label="Remove monitor"
          disabled={count <= 0}
          onClick={() => onChange(count - 1)}
        >
          <Minus size={16} />
        </button>
        <output aria-live="polite" aria-label="Monitor count">
          {count}
        </output>
        <button
          type="button"
          className="icon-button"
          aria-label="Add monitor"
          disabled={count >= MAX_MONITORS}
          onClick={() => onChange(count + 1)}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
