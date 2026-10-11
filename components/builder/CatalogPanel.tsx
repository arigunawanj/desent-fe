"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Armchair, Table2, SlidersHorizontal, Check } from "lucide-react";
import { ItemCard } from "./ItemCard";
import { MonitorStepper } from "./MonitorStepper";
import { ACCESSORIES, ACCESSORY_GROUP_LABEL, CHAIRS, DESKS } from "@/lib/catalog";
import type { useWorkspaceSelection } from "@/hooks/use-workspace-selection";

type Selection = ReturnType<typeof useWorkspaceSelection>;
export function CatalogPanel({selection,selectDesk,selectChair,setMonitorCount,toggleAccessory}: Pick<Selection, 'selection'|'selectDesk'|'selectChair'|'setMonitorCount'|'toggleAccessory'>) {
  return <Tabs defaultValue="desks" className="catalog-tabs">
    <div className="catalog-heading"><h2>Make it your own.</h2><p>A few good pieces. Endless possibilities.</p></div>
    <TabsList className="category-tabs" variant="line" aria-label="Equipment category"><TabsTrigger value="desks"><Table2 size={17} />Desks</TabsTrigger><TabsTrigger value="chairs"><Armchair size={17} />Chairs</TabsTrigger><TabsTrigger value="extras"><SlidersHorizontal size={17} />Extras</TabsTrigger></TabsList>
    <div className="catalog-content">
      <TabsContent value="desks"><div className="category-caption"><h3>Set the foundation</h3><span>Choose one</span></div><div className="product-list">{DESKS.map(d=><ItemCard key={d.id} {...d} image={`/products/${d.variant==='classic'?'oak-desk':'steel-desk'}.png`} description={d.variant==='classic'?'Natural oak · Warm & timeless':'Brushed metal · Industrial character'} selected={selection.deskId===d.id} onSelect={()=>selectDesk(d.id)} />)}</div><div className="selection-tip"><Check size={15} /><p>One desk, one starting point.<br /><span>Switch pieces any time. Your room updates instantly.</span></p></div></TabsContent>
      <TabsContent value="chairs"><div className="category-caption"><h3>Take your favourite seat</h3><span>Choose one</span></div><div className="product-list">{CHAIRS.map(c=><ItemCard key={c.id} {...c} image={`/products/${c.variant==='ergo'?'office-chair':'lounge-chair'}.png`} description={c.variant==='ergo'?'Graphite upholstery · Swivel base':'Solid wood frame · Cushioned comfort'} selected={selection.chairId===c.id} onSelect={()=>selectChair(c.id)} />)}</div></TabsContent>
      <TabsContent value="extras"><div className="category-caption"><h3>The finishing touches</h3><span>Mix & match</span></div><MonitorStepper count={selection.monitorCount} onChange={setMonitorCount} /><div className="extras-list">{ACCESSORIES.map(a=><ItemCard key={a.id} {...a} kind={a.id==='lamp'||a.id==='plant'?'monitor':a.id} image={a.id==='lamp'||a.id==='plant'?`/products/${a.id}.png`:a.id==='beanBag'?'/products/lounge-chair.png':undefined} description={ACCESSORY_GROUP_LABEL[a.group]} selected={selection.accessories[a.id]} onSelect={()=>toggleAccessory(a.id)} />)}</div></TabsContent>
    </div>
    <div className="catalog-note"><span className="note-dot" /> Designed for your stay, not forever.<small>Concept catalogue · Illustrative monthly prices</small></div>
  </Tabs>;
}
