"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Armchair,
  Table2,
  Monitor,
  Sparkles,
  Palmtree,
  CheckCircle2,
} from "lucide-react";
import { ItemCard } from "./ItemCard";
import { MonitorStepper } from "./MonitorStepper";
import { ACCESSORIES, CHAIRS, DESKS, MONITOR_PRICE } from "@/lib/catalog";
import type { useWorkspaceSelection } from "@/hooks/use-workspace-selection";

type Selection = ReturnType<typeof useWorkspaceSelection>;

export function CatalogPanel({
  selection,
  selectDesk,
  selectChair,
  setMonitorCount,
  toggleAccessory,
  formatPrice,
}: Pick<
  Selection,
  | "selection"
  | "selectDesk"
  | "selectChair"
  | "setMonitorCount"
  | "toggleAccessory"
  | "formatPrice"
>) {
  // Lifestyle extras vs desk extras
  const deskExtras = ACCESSORIES.filter((a) => a.group === "accessories");
  const lifestyleExtras = ACCESSORIES.filter((a) => a.group !== "accessories");

  const deskSelectedCount = selection.deskId ? 1 : 0;
  const chairSelectedCount = selection.chairId ? 1 : 0;
  const deskExtrasCount = deskExtras.filter((a) => selection.accessories[a.id]).length;
  const lifestyleCount = lifestyleExtras.filter((a) => selection.accessories[a.id]).length;

  return (
    <Tabs defaultValue="desks" className="catalog-tabs">
      <div className="catalog-heading">
        <div className="flex items-center justify-between">
          <span className="catalog-badge">
            <Sparkles size={11} />
            EQUIPMENT CATALOGUE
          </span>
          <span className="text-xs text-muted-foreground font-mono">Bali 2026</span>
        </div>
        <h2>Customize Your Setup</h2>
        <p>Curated ergonomic and villa essentials. Mix, match, and watch it render live in 3D.</p>
      </div>

      <TabsList className="category-tabs" variant="line" aria-label="Equipment category">
        <TabsTrigger value="desks">
          <Table2 size={16} />
          <span>Desks</span>
          {deskSelectedCount > 0 && <span className="tab-pill">✓</span>}
        </TabsTrigger>
        <TabsTrigger value="chairs">
          <Armchair size={16} />
          <span>Chairs</span>
          {chairSelectedCount > 0 && <span className="tab-pill">✓</span>}
        </TabsTrigger>
        <TabsTrigger value="monitors">
          <Monitor size={16} />
          <span>Monitors</span>
          {selection.monitorCount > 0 && (
            <span className="tab-pill">{selection.monitorCount}</span>
          )}
        </TabsTrigger>
        <TabsTrigger value="extras">
          <Sparkles size={16} />
          <span>Desk Extras</span>
          {deskExtrasCount > 0 && <span className="tab-pill">{deskExtrasCount}</span>}
        </TabsTrigger>
        <TabsTrigger value="lifestyle">
          <Palmtree size={16} />
          <span>Bali Lifestyle</span>
          {lifestyleCount > 0 && <span className="tab-pill">{lifestyleCount}</span>}
        </TabsTrigger>
      </TabsList>

      <div className="catalog-content">
        {/* DESKS */}
        <TabsContent value="desks">
          <div className="category-caption">
            <div>
              <h3>Choose Your Work Desk</h3>
              <p>Pick 1 base desk to anchor your space.</p>
            </div>
            <span className="category-counter">Choose 1</span>
          </div>

          <div className="product-list">
            {DESKS.map((d) => (
              <ItemCard
                key={d.id}
                name={d.name}
                priceFormatted={formatPrice(d.price)}
                image={d.image}
                description={d.description ?? ""}
                spec={d.spec}
                badge={d.badge}
                selected={selection.deskId === d.id}
                onSelect={() => selectDesk(d.id)}
              />
            ))}
          </div>

          <div className="selection-tip">
            <CheckCircle2 size={15} />
            <p>
              Switch between Classic Teak or Electric Standing any time.
              <span> The 3D scene reloads with real dimensions automatically.</span>
            </p>
          </div>
        </TabsContent>

        {/* CHAIRS */}
        <TabsContent value="chairs">
          <div className="category-caption">
            <div>
              <h3>Select Ergonomic Chair</h3>
              <p>Engineered for all-day remote developer comfort.</p>
            </div>
            <span className="category-counter">Choose 1</span>
          </div>

          <div className="product-list">
            {CHAIRS.map((c) => (
              <ItemCard
                key={c.id}
                name={c.name}
                priceFormatted={formatPrice(c.price)}
                image={c.image}
                description={c.description ?? ""}
                spec={c.spec}
                badge={c.badge}
                selected={selection.chairId === c.id}
                onSelect={() => selectChair(c.id)}
              />
            ))}
          </div>
        </TabsContent>

        {/* MONITORS */}
        <TabsContent value="monitors">
          <div className="category-caption">
            <div>
              <h3>Screen Displays</h3>
              <p>Add 1, 2, or 3 monitors. Rendered with realistic IPS displays.</p>
            </div>
            <span className="category-counter">0 to 3 screens</span>
          </div>

          <MonitorStepper
            count={selection.monitorCount}
            onChange={setMonitorCount}
            priceFormatted={formatPrice(MONITOR_PRICE)}
          />

          <div className="mt-4 p-3 bg-muted/40 rounded-lg text-xs leading-relaxed text-muted-foreground border">
            <strong className="text-foreground block mb-1">Dual & Triple Screen Mount:</strong>
            All monitors include heavy-duty VESA desk clamp arms, HDMI 2.1 & 100W USB-C cables, and
            next-day cable routing done by our Bali tech crew.
          </div>
        </TabsContent>

        {/* DESK EXTRAS */}
        <TabsContent value="extras">
          <div className="category-caption">
            <div>
              <h3>Desk Ambience & Greens</h3>
              <p>Warm LED lighting and potted tropical plants.</p>
            </div>
            <span className="category-counter">Mix & match</span>
          </div>

          <div className="extras-list">
            {deskExtras.map((a) => (
              <ItemCard
                key={a.id}
                name={a.name}
                priceFormatted={formatPrice(a.price)}
                image={a.image}
                kind={a.id === "lamp" ? "lamp" : "monitor"}
                description={a.description ?? ""}
                spec={a.spec}
                badge={a.badge}
                selected={selection.accessories[a.id]}
                onSelect={() => toggleAccessory(a.id)}
              />
            ))}
          </div>
        </TabsContent>

        {/* BALI LIFESTYLE */}
        <TabsContent value="lifestyle">
          <div className="category-caption">
            <div>
              <h3>Bali Nomad Lifestyle Gear</h3>
              <p>From morning espresso to sunset surf sessions and scooters.</p>
            </div>
            <span className="category-counter">Optional add-ons</span>
          </div>

          <div className="extras-list">
            {lifestyleExtras.map((a) => (
              <ItemCard
                key={a.id}
                name={a.name}
                priceFormatted={formatPrice(a.price)}
                image={a.image}
                kind={a.id}
                description={a.description ?? ""}
                spec={a.spec}
                badge={a.badge}
                selected={selection.accessories[a.id]}
                onSelect={() => toggleAccessory(a.id)}
              />
            ))}
          </div>
        </TabsContent>
      </div>

      <div className="catalog-note">
        <div className="flex items-center gap-2">
          <span className="note-dot" />
          <span>Flexible rentals for nomads & startups in Bali</span>
        </div>
        <small>Next-day delivery to your villa in Canggu, Ubud, Seminyak, or Uluwatu.</small>
      </div>
    </Tabs>
  );
}
