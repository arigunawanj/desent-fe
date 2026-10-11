"use client";

import { useState } from "react";
import { Download, ArrowRight, CheckCircle2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { MONITOR_PRICE } from "@/lib/catalog";
import type { AccessoryOption, ChairOption, DeskOption } from "@/lib/types";

export function SummaryPanel({
  open,
  onOpenChange,
  desk,
  chair,
  monitorCount,
  accessories,
  total,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  desk: DeskOption;
  chair: ChairOption;
  monitorCount: number;
  accessories: AccessoryOption[];
  total: number;
}) {
  const [confirmed, setConfirmed] = useState(false);

  const rows = [
    { name: desk.name, price: desk.price },
    { name: chair.name, price: chair.price },
    ...(monitorCount > 0
      ? [{ name: `Monitor × ${monitorCount}`, price: monitorCount * MONITOR_PRICE }]
      : []),
    ...accessories,
  ];

  function changeOpen(value: boolean) {
    if (!value) setConfirmed(false);
    onOpenChange(value);
  }

  function download() {
    const text = [
      "Your Forma workspace",
      ...rows.map((r) => `${r.name}: Rp${r.price.toLocaleString("id-ID")} / month`),
      `Total: Rp${total.toLocaleString("id-ID")} / month`,
      "",
      "Design challenge demo. Illustrative rates. monis.rent workspace builder.",
    ].join("\n");

    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "forma-workspace.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Sheet open={open} onOpenChange={changeOpen}>
      <SheetContent className="summary-sheet">
        <SheetHeader>
          <SheetTitle className="summary-title">
            Your next workspace.
            <br />
            All in one place.
          </SheetTitle>
          <SheetDescription>Review your pieces and monthly estimate.</SheetDescription>
        </SheetHeader>

        {confirmed && (
          <div className="confirmation" role="status">
            <CheckCircle2 size={32} strokeWidth={1.4} />
            <h3>Your setup is ready.</h3>
            <p>
              Demo rental confirmed. Download your selection below. Next-day delivery and setup
              available for Bali villas.
            </p>
          </div>
        )}

        <div className="summary-items">
          {rows.map((r) => (
            <div className="summary-row" key={r.name}>
              <span>{r.name}</span>
              <strong>Rp{r.price.toLocaleString("id-ID")}</strong>
            </div>
          ))}
        </div>

        <SheetFooter className="summary-footer">
          <div className="summary-total">
            <span>Monthly estimate</span>
            <strong>Rp{total.toLocaleString("id-ID")}</strong>
          </div>
          <p>
            Demo rental experience for monis.rent client challenge. Illustrative prices.
          </p>
          {!confirmed && (
            <button
              type="button"
              className="primary-button"
              onClick={() => setConfirmed(true)}
            >
              Confirm rental <ArrowRight size={17} />
            </button>
          )}
          <button type="button" className="secondary-button" onClick={download}>
            Download my setup <Download size={17} />
          </button>
          <button
            type="button"
            className="text-button"
            onClick={() => changeOpen(false)}
          >
            Back to my studio
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
