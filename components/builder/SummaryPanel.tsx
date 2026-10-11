"use client";

import { useState } from "react";
import {
  Download,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Calendar,
  MessageSquare,
  Copy,
  Check,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  BALI_LOCATIONS,
  MONITOR_PRICE,
  RENTAL_DURATIONS,
} from "@/lib/catalog";
import type {
  AccessoryOption,
  ChairOption,
  DeskOption,
  RentalDuration,
} from "@/lib/types";

export function SummaryPanel({
  open,
  onOpenChange,
  desk,
  chair,
  monitorCount,
  accessories,
  monthlyTotal,
  periodTotal,
  duration,
  setDuration,
  location,
  setLocation,
  formatPrice,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  desk: DeskOption;
  chair: ChairOption;
  monitorCount: number;
  accessories: AccessoryOption[];
  monthlyTotal: number;
  periodTotal: number;
  duration: RentalDuration;
  setDuration: (d: RentalDuration) => void;
  location: string;
  setLocation: (loc: string) => void;
  formatPrice: (amount: number) => string;
}) {
  const [confirmed, setConfirmed] = useState(false);
  const [villaAddress, setVillaAddress] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [copied, setCopied] = useState(false);

  const durationObj =
    RENTAL_DURATIONS.find((d) => d.id === duration) ?? RENTAL_DURATIONS[1];

  const rows = [
    { name: desk.name, price: desk.price, category: "Desk", badge: desk.badge },
    { name: chair.name, price: chair.price, category: "Chair", badge: chair.badge },
    ...(monitorCount > 0
      ? [
          {
            name: `${monitorCount} × Xiaomi 27" 4K IPS Monitor${monitorCount > 1 ? "s" : ""}`,
            price: monitorCount * MONITOR_PRICE,
            category: "Displays",
            badge: `${monitorCount} Screens`,
          },
        ]
      : []),
    ...accessories.map((a) => ({
      name: a.name,
      price: a.price,
      category: a.group,
      badge: a.badge,
    })),
  ];

  function changeOpen(value: boolean) {
    if (!value) setConfirmed(false);
    onOpenChange(value);
  }

  const setupTextSummary = [
    "🌴 MONIS.RENT BALI — WORKSPACE SPECIFICATION",
    "=========================================",
    `Delivery Location: ${location}`,
    `Rental Duration: ${durationObj.label} (${durationObj.sublabel})`,
    villaAddress ? `Villa Address: ${villaAddress}` : null,
    whatsapp ? `WhatsApp Contact: ${whatsapp}` : null,
    "",
    "EQUIPMENT ITEMS:",
    ...rows.map(
      (r, i) =>
        `${i + 1}. ${r.name} — ${formatPrice(r.price)} / month (${r.category})`,
    ),
    "",
    "PRICING BREAKDOWN:",
    `Base Monthly Rate: ${formatPrice(monthlyTotal)} / month`,
    durationObj.discount > 0
      ? `Nomad Discount: -15% Applied for ${durationObj.label}`
      : null,
    `Total for ${durationObj.label}: ${formatPrice(periodTotal)}`,
    "White-glove Villa Delivery & Cable Setup: Included (FREE)",
    "Damage Cover / Free Swap: Included",
    "=========================================",
    "Created on monis.rent 3D Studio Bali (Desent Challenge)",
  ]
    .filter(Boolean)
    .join("\n");

  function download() {
    const blob = new Blob([setupTextSummary], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `monis-bali-workspace-${location.toLowerCase().replace(/\s+/g, "-")}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function copyQuote() {
    navigator.clipboard.writeText(setupTextSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  function rentViaWhatsApp() {
    const textEncoded = encodeURIComponent(
      `Hi Monis.rent team! 🌴 I just designed my workspace setup on the 3D Studio:\n\n${setupTextSummary}\n\nCan you confirm availability for next-day villa delivery?`,
    );
    window.open(`https://wa.me/6281234567890?text=${textEncoded}`, "_blank");
    setConfirmed(true);
  }

  return (
    <Sheet open={open} onOpenChange={changeOpen}>
      <SheetContent className="summary-sheet">
        <SheetHeader>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-primary uppercase">
            <Sparkles size={13} />
            <span>Setup Summary & Checkout</span>
          </div>
          <SheetTitle className="summary-title">
            Your Bali Workspace.
            <br />
            Ready for Delivery.
          </SheetTitle>
          <SheetDescription>
            Review pieces, choose rental duration, and confirm your villa delivery across Bali.
          </SheetDescription>
        </SheetHeader>

        {confirmed && (
          <div className="confirmation" role="status">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 size={28} className="text-emerald-500" />
              <h3 className="text-base font-semibold text-emerald-800 dark:text-emerald-300">
                Setup Reserved Successfully!
              </h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your setup has been transferred to Monis Bali concierge. Next-day delivery and
              professional assembly will be scheduled for your villa in {location}.
            </p>
          </div>
        )}

        {/* Duration & Location Selector */}
        <div className="summary-preferences">
          <div className="preference-group">
            <label className="text-xs font-medium text-foreground flex items-center gap-1.5 mb-1.5">
              <Calendar size={13} className="text-primary" />
              Rental Duration:
            </label>
            <div className="duration-grid">
              {RENTAL_DURATIONS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDuration(d.id)}
                  className={`duration-chip ${duration === d.id ? "active" : ""}`}
                >
                  <span className="duration-title">{d.label}</span>
                  <span className="duration-sub">{d.sublabel}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="preference-group">
            <label className="text-xs font-medium text-foreground flex items-center gap-1.5 mb-1.5">
              <MapPin size={13} className="text-primary" />
              Delivery Area in Bali:
            </label>
            <div className="location-select-wrap">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="location-select"
              >
                {BALI_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    📍 {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="summary-items">
          <div className="summary-items-header">
            <span>SELECTED PIECES ({rows.length})</span>
            <span>MONTHLY RATE</span>
          </div>
          {rows.map((r, i) => (
            <div className="summary-row" key={`${r.name}-${i}`}>
              <div className="summary-row-details">
                <span className="row-name">{r.name}</span>
                {r.badge && <span className="row-badge">{r.badge}</span>}
              </div>
              <strong className="row-price">{formatPrice(r.price)}</strong>
            </div>
          ))}
        </div>

        {/* Perks Box */}
        <div className="summary-perks">
          <div className="perk-item">
            <Truck size={14} className="text-primary" />
            <span>Next-Day Villa Delivery</span>
          </div>
          <div className="perk-item">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>Free Assembly & Cable Routing</span>
          </div>
        </div>

        {/* Optional Nomad Contact Fields */}
        <div className="summary-contact-fields">
          <input
            type="text"
            placeholder="Villa Name or Address (e.g., Villa Bamboo, Canggu)"
            value={villaAddress}
            onChange={(e) => setVillaAddress(e.target.value)}
            className="checkout-input"
          />
          <input
            type="text"
            placeholder="WhatsApp Number (e.g., +62 812... or +1...)"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="checkout-input"
          />
        </div>

        <SheetFooter className="summary-footer">
          <div className="summary-total-breakdown">
            <div className="total-row-monthly">
              <span>Standard Monthly Rate:</span>
              <span>{formatPrice(monthlyTotal)} / mo</span>
            </div>
            {durationObj.discount > 0 && (
              <div className="total-row-discount">
                <span>Long-Stay Nomad Discount (15% OFF):</span>
                <span className="text-emerald-600 font-semibold">
                  -15% Applied
                </span>
              </div>
            )}
            <div className="summary-total">
              <div>
                <span className="text-xs text-muted-foreground block">
                  Total for {durationObj.label} Stay
                </span>
                <strong>{formatPrice(periodTotal)}</strong>
              </div>
              <span className="deposit-tag">Rp 0 Deposit Required</span>
            </div>
          </div>

          <div className="summary-action-stack">
            {!confirmed ? (
              <button
                type="button"
                className="whatsapp-button"
                onClick={rentViaWhatsApp}
              >
                <MessageSquare size={17} />
                <span>Rent via WhatsApp (Instant Booking)</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                className="whatsapp-button"
                onClick={rentViaWhatsApp}
              >
                <MessageSquare size={17} />
                <span>Open WhatsApp Chat</span>
              </button>
            )}

            <div className="flex gap-2 w-full">
              <button
                type="button"
                className="secondary-btn flex-1"
                onClick={copyQuote}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                <span>{copied ? "Copied Spec!" : "Copy Spec"}</span>
              </button>

              <button
                type="button"
                className="secondary-btn flex-1"
                onClick={download}
              >
                <Download size={15} />
                <span>Download .txt</span>
              </button>
            </div>

            <button
              type="button"
              className="text-button"
              onClick={() => changeOpen(false)}
            >
              Continue customizing studio
            </button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
