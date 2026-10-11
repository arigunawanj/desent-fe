"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  ArrowRight,
  RotateCcw,
  ShoppingBag,
  Box,
  LampDesk,
  Sprout,
  Check,
  MapPin,
  Sun,
  Sunset,
  Moon,
  Eye,
  Maximize2,
  Coffee,
  Waves,
  Sparkles,
  Clock,
  Wrench,
} from "lucide-react";
import { useWorkspaceSelection } from "@/hooks/use-workspace-selection";
import { CatalogPanel } from "./CatalogPanel";
import { SummaryPanel } from "./SummaryPanel";
import { Hero } from "@/components/landing/Hero";
import { RENTAL_DURATIONS } from "@/lib/catalog";

const WorkspaceScene = dynamic(
  () => import("./scene/WorkspaceScene").then((m) => m.WorkspaceScene),
  {
    ssr: false,
    loading: () => (
      <div className="scene-loading" role="status">
        <Box size={32} strokeWidth={1.2} className="animate-spin text-primary" />
        <span className="font-medium text-foreground">Preparing your 3D Bali Studio…</span>
        <small className="text-xs text-muted-foreground">
          Loading furniture models, textures, and ambient lighting
        </small>
      </div>
    ),
  },
);

export function Builder() {
  const workspace = useWorkspaceSelection();
  const {
    selection,
    desk,
    chair,
    activeAccessories,
    monthlyTotal,
    periodTotal,
    duration,
    currentDurationInfo,
    location,
    currency,
    ambience,
    cameraView,
    showHotspots,
    setAmbience,
    setCameraView,
    setShowHotspots,
    setDuration,
    setLocation,
    setCurrency,
    toggleAccessory,
    setMonitorCount,
    formatPrice,
  } = workspace;

  const [summaryOpen, setSummaryOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const count = 2 + selection.monitorCount + activeAccessories.length;

  return (
    <>
      <Hero
        currency={currency}
        onCurrencyToggle={() => setCurrency(currency === "IDR" ? "USD" : "IDR")}
        onOpenCheckout={() => setSummaryOpen(true)}
        itemsCount={count}
        location={location}
      />

      <section id="builder" className="studio" aria-label="Workspace designer">
        <div className="studio-layout">
          {/* Left: Product Catalog Panel */}
          <aside className="catalog">
            <CatalogPanel {...workspace} />
          </aside>

          {/* Right: 3D Studio Preview */}
          <div className="preview">
            {/* Top Bar Controls */}
            <div className="preview-top">
              <div className="preview-room-title">
                <span className="room-label">
                  <span className="live-dot" />
                  LIVE 3D WORKSPACE
                </span>
                <h2>The Bali Nomad Studio</h2>
                <p>Interactive villa workspace. Click pins in 3D or drag to orbit.</p>
              </div>

              <div className="studio-toolbar">
                {/* Ambience Modes */}
                <div className="segmented-control" role="group" aria-label="Lighting ambience">
                  <button
                    type="button"
                    className={`segment-btn ${ambience === "day" ? "active" : ""}`}
                    onClick={() => setAmbience("day")}
                    title="Bali Daylight"
                  >
                    <Sun size={13} />
                    <span>Day</span>
                  </button>
                  <button
                    type="button"
                    className={`segment-btn ${ambience === "sunset" ? "active" : ""}`}
                    onClick={() => setAmbience("sunset")}
                    title="Golden Hour Sunset"
                  >
                    <Sunset size={13} />
                    <span>Sunset</span>
                  </button>
                  <button
                    type="button"
                    className={`segment-btn ${ambience === "night" ? "active" : ""}`}
                    onClick={() => setAmbience("night")}
                    title="Villa Night (Glow)"
                  >
                    <Moon size={13} />
                    <span>Night</span>
                  </button>
                </div>

                {/* Camera Presets */}
                <div className="segmented-control" role="group" aria-label="Camera perspective">
                  <button
                    type="button"
                    className={`segment-btn ${cameraView === "iso" ? "active" : ""}`}
                    onClick={() => setCameraView("iso")}
                    title="Isometric 3D View"
                  >
                    <Box size={13} />
                    <span className="hidden sm:inline">3D Iso</span>
                  </button>
                  <button
                    type="button"
                    className={`segment-btn ${cameraView === "front" ? "active" : ""}`}
                    onClick={() => setCameraView("front")}
                    title="Nomad Desk View"
                  >
                    <Maximize2 size={13} />
                    <span className="hidden sm:inline">Desk</span>
                  </button>
                  <button
                    type="button"
                    className={`segment-btn ${cameraView === "top" ? "active" : ""}`}
                    onClick={() => setCameraView("top")}
                    title="Top-Down Plan"
                  >
                    <Eye size={13} />
                    <span className="hidden sm:inline">Top</span>
                  </button>
                </div>

                {/* Hotspot Toggle */}
                <button
                  type="button"
                  className={`icon-button ${showHotspots ? "bg-primary/10 text-primary border-primary/30" : ""}`}
                  onClick={() => setShowHotspots(!showHotspots)}
                  title={showHotspots ? "Hide 3D Hotspot Pins" : "Show 3D Hotspot Pins"}
                  aria-pressed={showHotspots}
                >
                  <Sparkles size={15} />
                </button>

                {/* Reset Camera */}
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => {
                    setCameraView("iso");
                    setResetKey((v) => v + 1);
                  }}
                  title="Reset 3D camera angle"
                  aria-label="Reset camera view"
                >
                  <RotateCcw size={15} />
                </button>
              </div>
            </div>

            {/* 3D Scene Container */}
            <div
              className="scene"
              role="img"
              aria-label={`3D workspace preview: ${desk.name}, ${chair.name}, ${selection.monitorCount} monitors`}
            >
              <WorkspaceScene
                key={`${resetKey}-${ambience}-${cameraView}`}
                desk={desk}
                chair={chair}
                selection={selection}
                ambience={ambience}
                cameraView={cameraView}
                showHotspots={showHotspots}
                onToggleAccessory={toggleAccessory}
                onIncrementMonitor={() =>
                  setMonitorCount((selection.monitorCount + 1) % 4)
                }
              />
            </div>

            {/* Bottom Overlay Controls */}
            <div className="preview-bottom">
              <span className="orbit-hint">
                <Box size={14} />
                <span>Drag to rotate · Pinch to zoom</span>
              </span>

              {/* Quick-add floating dock */}
              <div className="quick-add">
                <button
                  type="button"
                  aria-pressed={selection.accessories.lamp}
                  onClick={() => toggleAccessory("lamp")}
                >
                  <LampDesk size={15} />
                  <span>Lamp</span>
                  {selection.accessories.lamp ? <Check size={13} /> : <span>+</span>}
                </button>

                <button
                  type="button"
                  aria-pressed={selection.accessories.plant}
                  onClick={() => toggleAccessory("plant")}
                >
                  <Sprout size={15} />
                  <span>Plant</span>
                  {selection.accessories.plant ? <Check size={13} /> : <span>+</span>}
                </button>

                <button
                  type="button"
                  aria-pressed={selection.accessories.coffeeMachine}
                  onClick={() => toggleAccessory("coffeeMachine")}
                >
                  <Coffee size={15} />
                  <span>Espresso</span>
                  {selection.accessories.coffeeMachine ? (
                    <Check size={13} />
                  ) : (
                    <span>+</span>
                  )}
                </button>

                <button
                  type="button"
                  aria-pressed={selection.accessories.surfboard}
                  onClick={() => toggleAccessory("surfboard")}
                >
                  <Waves size={15} />
                  <span>Surfboard</span>
                  {selection.accessories.surfboard ? <Check size={13} /> : <span>+</span>}
                </button>
              </div>
            </div>

            <div className="scene-caption">
              <span>FURNITURE SCALE: 1:1 TRUE METRIC · BALI VILLA AMBIENCE</span>
              <span className="font-mono">MONIS 3D ENGINE</span>
            </div>
          </div>
        </div>

        {/* Sticky Rental Action Bar */}
        <div className="rental-bar">
          <div className="setup-count">
            <span className="bag-icon">
              <ShoppingBag size={20} />
            </span>
            <div>
              <strong>Your Custom Setup Assembled</strong>
              <small>
                {count} pieces · Deliver to {location}
              </small>
            </div>
          </div>

          <div className="rental-duration-selector">
            <span className="duration-label hidden md:inline">Duration:</span>
            <div className="duration-pills">
              {RENTAL_DURATIONS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  className={`duration-pill-btn ${duration === d.id ? "active" : ""}`}
                  onClick={() => setDuration(d.id)}
                >
                  <span>{d.label}</span>
                  {d.discount > 0 && <span className="discount-tag">-15%</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="rental-action">
            <div className="price" aria-live="polite">
              <small>
                {duration === "1month"
                  ? "Monthly estimate"
                  : `Estimated for ${currentDurationInfo.label}`}
              </small>
              <strong>
                {formatPrice(periodTotal)}
                <span> {duration === "1month" ? "/ month" : "total"}</span>
              </strong>
            </div>

            <button
              type="button"
              className="primary-button"
              onClick={() => setSummaryOpen(true)}
            >
              <span>Review & Rent</span>
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <div className="how-title">
          <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-primary">
              WORK REMOTE IN BALI
            </span>
            <h2>
              Land in Paradise.
              <br />
              Be productive by tomorrow.
            </h2>
          </div>
        </div>

        <div className="how-step-card">
          <div className="step-num">01</div>
          <div className="step-icon-wrap">
            <Box size={18} className="text-primary" />
          </div>
          <h3>Design in 3D</h3>
          <p>
            Choose your ergonomic desk, mesh chair, and multi-monitor layout in our interactive
            real-time studio.
          </p>
        </div>

        <div className="how-step-card">
          <div className="step-num">02</div>
          <div className="step-icon-wrap">
            <Clock size={18} className="text-amber-500" />
          </div>
          <h3>Next-Day Delivery</h3>
          <p>
            We deliver straight to your villa or guesthouse in Canggu, Ubud, Seminyak, or Uluwatu.
          </p>
        </div>

        <div className="how-step-card">
          <div className="step-num">03</div>
          <div className="step-icon-wrap">
            <Wrench size={18} className="text-emerald-500" />
          </div>
          <h3>White-Glove Setup</h3>
          <p>
            Our tech crew unboxes, levels your desk, clamps monitors, tests cables, and takes packaging
            away.
          </p>
        </div>
      </section>

      {/* Nomad Testimonials & Trust */}
      <section className="nomad-trust-section">
        <div className="trust-grid">
          <div className="trust-quote-card">
            <div className="quote-badge">⭐ Rented for 2 Months in Canggu</div>
            <p>
              &ldquo;Landed in Bali with just a laptop backpack. Had a motorized standing desk and
              dual 4K screens set up in my villa the next morning. Best remote work investment ever.&rdquo;
            </p>
            <div className="quote-author">
              <strong>Julian V.</strong> · Senior Frontend Dev (Berlin → Bali)
            </div>
          </div>

          <div className="trust-quote-card">
            <div className="quote-badge">⭐ Rented for 6 Months in Ubud</div>
            <p>
              &ldquo;No buying cheap furniture you have to resell on Facebook groups. Monis delivers,
              maintains, and swaps gear if anything breaks. Zero stress.&rdquo;
            </p>
            <div className="quote-author">
              <strong>Chloe M.</strong> · Product Designer (Nomad)
            </div>
          </div>
        </div>
      </section>

      {/* Site Footer */}
      <footer className="site-footer">
        <div className="footer-left">
          <span className="footer-brand">monis.rent</span>
          <span>Workspace Equipment Rentals for Digital Nomads & Startups in Bali.</span>
        </div>
        <div className="footer-right">
          <span>Desent Solutions · Developer Challenge Submission</span>
          <a
            href="https://github.com/arigunawanj/desent-fe"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-repo-link"
          >
            GitHub Repo
          </a>
        </div>
      </footer>

      {/* Checkout & Summary Panel Sheet */}
      <SummaryPanel
        open={summaryOpen}
        onOpenChange={setSummaryOpen}
        desk={desk}
        chair={chair}
        monitorCount={selection.monitorCount}
        accessories={activeAccessories}
        monthlyTotal={monthlyTotal}
        periodTotal={periodTotal}
        duration={duration}
        setDuration={setDuration}
        location={location}
        setLocation={setLocation}
        formatPrice={formatPrice}
      />
    </>
  );
}
