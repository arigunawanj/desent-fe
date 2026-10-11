"use client";

import { MAX_MONITORS } from "@/lib/catalog";
import { Minus, Plus, Monitor, Sparkles } from "lucide-react";

export function MonitorStepper({
  count,
  onChange,
  priceFormatted,
}: {
  count: number;
  onChange: (count: number) => void;
  priceFormatted: string;
}) {
  return (
    <div className="monitor-stepper-box">
      <div className="monitor-stepper-left">
        <div className="monitor-icon-badge">
          <Monitor size={22} strokeWidth={1.5} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <strong>Xiaomi 27&quot; 4K Displays</strong>
            <span className="product-badge">
              <Sparkles size={10} />
              Fast IPS · 4K
            </span>
          </div>
          <small className="text-muted-foreground block text-xs mt-0.5">
            {priceFormatted} / month per display (Up to {MAX_MONITORS} screens)
          </small>
        </div>
      </div>

      <div className="stepper-controls">
        <button
          type="button"
          className="stepper-btn"
          aria-label="Remove monitor"
          disabled={count <= 0}
          onClick={() => onChange(count - 1)}
        >
          <Minus size={15} />
        </button>
        <span className="stepper-count" aria-live="polite">
          {count} {count === 1 ? "Screen" : "Screens"}
        </span>
        <button
          type="button"
          className="stepper-btn"
          aria-label="Add monitor"
          disabled={count >= MAX_MONITORS}
          onClick={() => onChange(count + 1)}
        >
          <Plus size={15} />
        </button>
      </div>
    </div>
  );
}
