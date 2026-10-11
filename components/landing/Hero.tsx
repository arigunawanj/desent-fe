"use client";

import {
  MapPin,
  Sparkles,
  Zap,
  Shield,
  Truck,
  ArrowDown,
  Layers,
  HeartHandshake,
} from "lucide-react";

export function Hero({
  currency,
  onCurrencyToggle,
  onOpenCheckout,
  itemsCount,
  location,
}: {
  currency: "IDR" | "USD";
  onCurrencyToggle: () => void;
  onOpenCheckout: () => void;
  itemsCount: number;
  location: string;
}) {
  return (
    <>
      {/* Top Notice Banner */}
      <div className="monis-top-banner">
        <div className="banner-content">
          <span className="live-pulse-dot" />
          <span>
            <strong>Bali Villa Express:</strong> Next-day delivery & white-glove setup active across{" "}
            {location}
          </span>
          <span className="banner-badge">⚡ 24h Turnaround</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="site-header">
        <div className="header-brand-wrap">
          <a href="#" className="monis-brand" aria-label="Monis Rent Bali">
            {/* Monis wordmark SVG */}
            <span className="brand-logo-text">monis<span>.rent</span></span>
            <span className="brand-pill">3D STUDIO</span>
          </a>
        </div>

        <nav className="header-nav" aria-label="Main navigation">
          <div className="nav-location-pill">
            <MapPin size={13} className="text-primary" />
            <span>Bali, Indonesia</span>
          </div>

          {/* Currency Toggle */}
          <button
            type="button"
            onClick={onCurrencyToggle}
            className="currency-toggle-btn"
            title="Toggle Currency (IDR / USD)"
          >
            <span className={currency === "IDR" ? "font-bold text-primary" : "text-muted-foreground"}>
              IDR
            </span>
            <span className="text-muted-foreground/40">/</span>
            <span className={currency === "USD" ? "font-bold text-primary" : "text-muted-foreground"}>
              USD
            </span>
          </button>

          <a href="#how-it-works" className="nav-link">
            How it works
          </a>

          <button
            type="button"
            onClick={onOpenCheckout}
            className="nav-checkout-btn"
            aria-label="View current setup"
          >
            <Layers size={14} />
            <span>Setup ({itemsCount})</span>
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-intro">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={13} />
            <span>INTERACTIVE WORKSPACE BUILDER · BALI</span>
          </div>

          <h1 className="hero-title">
            Design your dream office.
            <br />
            <span>Delivered to your Bali villa.</span>
          </h1>

          <p className="hero-subtitle">
            Skip the spreadsheet. Pick your desk, ergonomic chair, multi-screen monitors, and island
            gear in real-time 3D. Hit rent and work comfortably next week in paradise.
          </p>

          {/* Nomad Value Pillars */}
          <div className="hero-pillars">
            <div className="pillar-item">
              <Truck size={15} className="text-primary" />
              <span>Next-Day Villa Delivery</span>
            </div>
            <div className="pillar-item">
              <Zap size={15} className="text-amber-500" />
              <span>Plug & Play Ergonomics</span>
            </div>
            <div className="pillar-item">
              <Shield size={15} className="text-emerald-500" />
              <span>Zero Buying Headache</span>
            </div>
            <div className="pillar-item">
              <HeartHandshake size={15} className="text-primary" />
              <span>Free Setup & Cable Tidy</span>
            </div>
          </div>
        </div>

        <div className="hero-action-hint">
          <a href="#builder" className="scroll-hint-link">
            <span>Scroll to 3D Designer</span>
            <ArrowDown size={14} />
          </a>
        </div>
      </section>
    </>
  );
}
