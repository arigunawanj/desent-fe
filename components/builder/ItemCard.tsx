"use client";

import Image from "next/image";
import { Check, Plus } from "lucide-react";

export function ItemCard({
  name,
  price,
  selected,
  onSelect,
  image,
  description,
}: {
  name: string;
  price: number;
  selected: boolean;
  onSelect: () => void;
  image?: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`product-card ${selected ? "is-selected" : ""}`}
    >
      <span className="product-art">
        {image && (
          <Image
            src={image}
            alt={name}
            width={240}
            height={180}
            sizes="140px"
            className="product-art-img"
          />
        )}
      </span>
      <span className="product-info">
        <strong>{name}</strong>
        <span>{description}</span>
        <span className="product-price">
          Rp{price.toLocaleString("id-ID")}
          <small> / mo</small>
        </span>
      </span>
      <span className="selection-mark">
        {selected ? <Check size={13} /> : <Plus size={13} />}
      </span>
    </button>
  );
}
