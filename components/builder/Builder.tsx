"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  ArrowRight,
  Move,
  RotateCcw,
  ShoppingBag,
  Box,
  LampDesk,
  Sprout,
  Check,
  MapPin,
} from "lucide-react";
import { useWorkspaceSelection } from "@/hooks/use-workspace-selection";
import { CatalogPanel } from "./CatalogPanel";
import { SummaryPanel } from "./SummaryPanel";
import { Hero } from "@/components/landing/Hero";

const WorkspaceScene = dynamic(
  () => import("./scene/WorkspaceScene").then((m) => m.WorkspaceScene),
  {
    ssr: false,
    loading: () => (
      <div className="scene-loading" role="status">
        <Box size={30} strokeWidth={1} />
        Preparing your room…
      </div>
    ),
  },
);

export function Builder() {
  const workspace = useWorkspaceSelection();
  const { selection, desk, chair, activeAccessories, total, toggleAccessory } = workspace;
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [view, setView] = useState(0);
  const [front, setFront] = useState(false);

  const count = 2 + selection.monitorCount + activeAccessories.length;

  return (
    <>
      <Hero />

      <section id="builder" className="studio" aria-label="Workspace designer">
        <div className="studio-layout">
          <aside className="catalog">
            <CatalogPanel {...workspace} />
          </aside>

          <div className="preview">
            <div className="preview-top">
              <div>
                <span className="room-label">
                  <span className="live-dot" /> LIVE WORKSPACE
                </span>
                <h2>The everyday studio.</h2>
                <p>Room to focus. Space to be yourself.</p>
              </div>

              <div className="view-controls">
                <button
                  type="button"
                  className="view-toggle"
                  aria-pressed={front}
                  onClick={() => setFront((v) => !v)}
                >
                  <Box size={16} />
                  {front ? "Front view" : "Perspective"}
                </button>
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => {
                    setView((v) => v + 1);
                    setFront(false);
                  }}
                  aria-label="Reset camera view"
                >
                  <RotateCcw size={17} />
                </button>
              </div>
            </div>

            <div
              className="scene"
              role="img"
              aria-label={`3D workspace: ${desk.name}, ${chair.name}, ${selection.monitorCount} monitors${
                activeAccessories.length
                  ? ", " + activeAccessories.map((a) => a.name).join(", ")
                  : ""
              }`}
            >
              <WorkspaceScene
                key={`${view}-${front}`}
                desk={desk}
                chair={chair}
                selection={selection}
                front={front}
              />
            </div>

            <div className="preview-bottom">
              <span className="orbit-hint">
                <Move size={15} /> Drag to look around
              </span>
              <div className="quick-add">
                <button
                  type="button"
                  aria-pressed={selection.accessories.lamp}
                  onClick={() => toggleAccessory("lamp")}
                >
                  <LampDesk size={16} /> Desk lamp{" "}
                  {selection.accessories.lamp ? <Check size={14} /> : <span>+</span>}
                </button>
                <button
                  type="button"
                  aria-pressed={selection.accessories.plant}
                  onClick={() => toggleAccessory("plant")}
                >
                  <Sprout size={16} /> A little green{" "}
                  {selection.accessories.plant ? <Check size={14} /> : <span>+</span>}
                </button>
              </div>
            </div>

            <div className="scene-caption">
              <span>Furniture shown to scale. Room styling is illustrative.</span>
              <span>3D / INTERACTIVE</span>
            </div>
          </div>
        </div>

        <div className="rental-bar">
          <div className="setup-count">
            <span className="bag-icon">
              <ShoppingBag size={20} />
            </span>
            <span>
              <strong>Your workspace, assembled.</strong>
              <small>{count} pieces · Monthly rental estimate</small>
            </span>
          </div>

          <div className="rental-action">
            <div className="price" aria-live="polite">
              <small>Your monthly total</small>
              <strong>
                Rp{total.toLocaleString("id-ID")}
                <span> / month</span>
              </strong>
            </div>
            <button
              type="button"
              className="primary-button"
              onClick={() => setSummaryOpen(true)}
            >
              Rent this setup <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works">
        <div className="how-title">
          <MapPin size={17} />
          <h2>
            Land in Bali.
            <br />
            Make yourself at work.
          </h2>
        </div>
        <div>
          <span>01 / DESIGN</span>
          <h3>Find your flow</h3>
          <p>
            Pick a desk and chair. Add the extras that make a space feel like yours.
          </p>
        </div>
        <div>
          <span>02 / EXPLORE</span>
          <h3>See the whole picture</h3>
          <p>
            Look around your room. Change a piece. Watch your setup come together.
          </p>
        </div>
        <div>
          <span>03 / RENT</span>
          <h3>Make it happen</h3>
          <p>Review every piece and your monthly estimate in one simple checkout.</p>
        </div>
      </section>

      <footer className="site-footer">
        <span className="footer-brand">forma.</span>
        <span>A workspace that moves with you.</span>
        <span>Desent Solutions · Design challenge</span>
      </footer>

      <SummaryPanel
        open={summaryOpen}
        onOpenChange={setSummaryOpen}
        desk={desk}
        chair={chair}
        monitorCount={selection.monitorCount}
        accessories={activeAccessories}
        total={total}
      />
    </>
  );
}
