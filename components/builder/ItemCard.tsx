"use client";
import Image from "next/image";
import { Check, Plus, Monitor, Coffee, Bike, Waves, Armchair, ShelvingUnit } from "lucide-react";
const icons = {monitor: Monitor, coffeeMachine: Coffee, surfboard: Waves, motorcycle: Bike, beanBag: Armchair, toolShelf: ShelvingUnit};
export function ItemCard({name,price,selected,onSelect,image,description,kind='monitor'}: {name: string; price: number; selected: boolean; onSelect: () => void; image?: string; description: string; kind?: keyof typeof icons}) {
  const Icon = icons[kind];
  return <button type="button" onClick={onSelect} aria-pressed={selected} className={`product-card ${selected ? 'is-selected' : ''}`}>
    <span className="product-art">{image ? <Image src={image} alt="" width={240} height={180} sizes="140px" /> : <Icon size={42} strokeWidth={1.1} aria-hidden="true" />}</span>
    <span className="product-info"><strong>{name}</strong><span>{description}</span><span className="product-price">Rp{price.toLocaleString('id-ID')}<small> / mo</small></span></span>
    <span className="selection-mark">{selected ? <Check size={13} /> : <Plus size={13} />}</span>
  </button>;
}
