"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Armchair, Table2, SlidersHorizontal, Check } from "lucide-react";
import { ItemCard } from "./ItemCard";
import { MonitorStepper } from "./MonitorStepper";
import { ACCESSORIES, ACCESSORY_GROUP_LABEL, CHAIRS, DESKS } from "@/lib/catalog";
import type { useWorkspaceSelection } from "@/hooks/use-workspace-selection";

type Selection = ReturnType<typeof useWorkspaceSelection>;

export function CatalogPanel({
  selection,
  selectDesk,
  selectChair,
  setMonitorCount,
  toggleAccessory,
}: Pick<
  Selection,
  "selection" | "selectDesk" | "selectChair" | "setMonitorCount" | "toggleAccessory"
>) {
  return (
    <Tabs defaultValue="desks" className="catalog-tabs">
      <div className="catalog-heading">
        <h2>Make it your own.</h2>
        <p>A few good pieces. Endless possibilities.</p>
      </div>

      <TabsList className="category-tabs" variant="line" aria-label="Equipment category">
        <TabsTrigger value="desks">
          <Table2 size={16} />
          <span>Desks</span>
        </TabsTrigger>
        <TabsTrigger value="chairs">
          <Armchair size={16} />
          <span>Chairs</span>
        </TabsTrigger>
        <TabsTrigger value="extras">
          <SlidersHorizontal size={16} />
          <span>Extras</span>
        </TabsTrigger>
      </TabsList>

      <div className="catalog-content">
        <TabsContent value="desks">
          <div className="category-caption">
            <h3>Set the foundation</h3>
            <span>Choose one</span>
          </div>
          <div className="product-list">
            {DESKS.map((d) => (
              <ItemCard
                key={d.id}
                name={d.name}
                price={d.price}
                image={d.image}
                description={d.description ?? ""}
                selected={selection.deskId === d.id}
                onSelect={() => selectDesk(d.id)}
              />
            ))}
          </div>
          <div className="selection-tip">
            <Check size={15} />
            <p>
              One desk, one starting point.
              <br />
              <span>Switch pieces any time. Your room updates instantly.</span>
            </p>
          </div>
        </TabsContent>

        <TabsContent value="chairs">
          <div className="category-caption">
            <h3>Take your favourite seat</h3>
            <span>Choose one</span>
          </div>
          <div className="product-list">
            {CHAIRS.map((c) => (
              <ItemCard
                key={c.id}
                name={c.name}
                price={c.price}
                image={c.image}
                description={c.description ?? ""}
                selected={selection.chairId === c.id}
                onSelect={() => selectChair(c.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="extras">
          <div className="category-caption">
            <h3>The finishing touches</h3>
            <span>Mix & match</span>
          </div>
          <MonitorStepper count={selection.monitorCount} onChange={setMonitorCount} />
          <div className="extras-list">
            {ACCESSORIES.map((a) => (
              <ItemCard
                key={a.id}
                name={a.name}
                price={a.price}
                image={a.image}
                description={ACCESSORY_GROUP_LABEL[a.group]}
                selected={selection.accessories[a.id]}
                onSelect={() => toggleAccessory(a.id)}
              />
            ))}
          </div>
        </TabsContent>
      </div>

      <div className="catalog-note">
        <span className="note-dot" /> Designed for your stay, not forever.
        <small>Concept catalogue · Illustrative monthly prices</small>
      </div>
    </Tabs>
  );
}
