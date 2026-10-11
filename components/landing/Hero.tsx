import { ArrowUpRight, MapPin } from "lucide-react";

export function Hero() {
  return (
    <>
      <header className="site-header">
        <div className="header-left">
          <a href="#" className="wordmark" aria-label="Forma home">
            <span className="brand-mark" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            forma<span className="brand-period">.</span>
          </a>
          <span className="header-divider" />
          <span className="studio-label">THE WORKSPACE STUDIO</span>
        </div>
        <nav aria-label="Main navigation">
          <a href="#how-it-works" className="how-it-works-link">
            How it works <ArrowUpRight size={14} />
          </a>
          <span className="location">
            <MapPin size={14} /> Bali, Indonesia
          </span>
        </nav>
      </header>

      <section className="intro">
        <h1>
          A better place <span>to do your thing.</span>
        </h1>
        <p>
          Choose your pieces. See your space.
          <br />
          Rent a setup that works for you.
        </p>
      </section>
    </>
  );
}
