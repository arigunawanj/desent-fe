"use client";

import Image from "next/image";
import {
  Check,
  Plus,
  Monitor,
  Coffee,
  Bike,
  Waves,
  Armchair,
  Library,
  LampDesk,
  Sparkles,
} from "lucide-react";

const icons = {
  monitor: Monitor,
  coffeeMachine: Coffee,
  surfboard: Waves,
  motorcycle: Bike,
  beanBag: Armchair,
  toolShelf: Library,
  lamp: LampDesk,
};

export function ItemCard({
  name,
  priceFormatted,
  selected,
  onSelect,
  image,
  description,
  spec,
  badge,
  kind = "monitor",
}: {
  name: string;
  priceFormatted: string;
  selected: boolean;
  onSelect: () => void;
  image?: string;
  description: string;
  spec?: string;
  badge?: string;
  kind?: string;
}) {
  const Icon = (kind && icons[kind as keyof typeof icons]) || Monitor;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`product-card ${selected ? "is-selected" : ""}`}
    >
      <div className="product-art">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={240}
            height={180}
            sizes="160px"
            className="product-img"
          />
        ) : (
          <div className="product-art-fallback">
            <Icon size={38} strokeWidth={1.3} aria-hidden="true" />
          </div>
        )}
        {badge && (
          <span className="product-badge">
            <Sparkles size={10} />
            {badge}
          </span>
        )}
      </div>

      <div className="product-info">
        <div className="product-header">
          <strong>{name}</strong>
          <span className="selection-mark" aria-hidden="true">
            {selected ? <Check size={13} strokeWidth={2.4} /> : <Plus size={13} strokeWidth={2} />}
          </span>
        </div>

        <p className="product-desc">{description}</p>
        {spec && <span className="product-spec">{spec}</span>}

        <div className="product-price-row">
          <span className="product-price">
            {priceFormatted}
            <small> / month</small>
          </span>
          <span className={`product-status-tag ${selected ? "active" : ""}`}>
            {selected ? "In your space" : "Click to add"}
          </span>
        </div>
      </div>
    </button>
  );
}
