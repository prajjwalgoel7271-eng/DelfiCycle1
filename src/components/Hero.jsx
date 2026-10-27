export default function Hero({ onExplore }) {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">STUDENT-LED CIRCULAR DESIGN STUDIO</p>
        <h1>
          Waste less.
          <br />
          <em>Design more.</em>
        </h1>
        <p className="hero-text">
          We turn everyday waste into useful products, creative learning and
          measurable impact — proving that sustainability can be practical,
          desirable and fun.
        </p>
        <div className="hero-actions">
          <button className="primary" onClick={onExplore}>
            Explore the studio →
          </button>
          <a className="secondary" href="#diy">
            Start a DIY
          </a>
        </div>
        <div className="hero-proof">
          <span>
            184kg <small>waste diverted</small>
          </span>
          <span>
            427 <small>products prototyped</small>
          </span>
          <span>
            860 <small>students reached</small>
          </span>
        </div>
      </div>
      <div className="hero-art">
        <div className="orbit o1"></div>
        <div className="orbit o2"></div>
        <div className="art-card">
          <span>♻</span>
          <strong>WASTE</strong>
          <small>→ MATERIAL</small>
        </div>
        <div className="art-card mini">
          <span>✦</span>
          <strong>IDEA</strong>
          <small>→ PRODUCT</small>
        </div>
        <div className="leaf">⌁</div>
      </div>
    </section>
  );
}
