"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, Plus } from "lucide-react";
import { subscribeThumbnails } from "./ThumbnailGenerator";

const ID_TO_KEY: Record<string, string> = {
  scooter: "scooter",
  motorcycle: "scooter",
  shelf: "shelf",
  toolShelf: "shelf",
  surfboard: "surfboard",
  coffee: "coffee",
  coffeeMachine: "coffee",
  beanBag: "lounge-chair",
  "chair-mesh": "lounge-chair",
  lamp: "lamp",
};

export function ItemCard({
  id,
  name,
  price,
  selected,
  onSelect,
  image,
  description,
}: {
  id?: string;
  name: string;
  price: number;
  selected: boolean;
  onSelect: () => void;
  image?: string;
  description: string;
}) {
  const [thumb, setThumb] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const key = ID_TO_KEY[id];
    if (!key) return;
    return subscribeThumbnails((map) => {
      if (map[key]) setThumb(map[key]);
    });
  }, [id]);

  const activeSrc = thumb || image;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`product-card ${selected ? "is-selected" : ""}`}
    >
      <span className="product-art">
        {activeSrc && (
          <Image
            src={activeSrc}
            alt={name}
            width={240}
            height={180}
            sizes="140px"
            className="product-art-img"
            unoptimized={activeSrc.startsWith("data:")}
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
