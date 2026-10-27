export default function Footer() {
  return (
    <footer>
      <div className="footer-brand">
        <span className="brand-mark">↻</span>
        <b>DelfiCycle Studio</b>
        <p>Waste less. Design more.</p>
      </div>
      <div>
        <b>Explore</b>
        <a href="#about">About</a>
        <a href="#diy">DIY Hub</a>
        <a href="#marketplace">Marketplace</a>
        <a href="#impact">Impact</a>
      </div>
      <div>
        <b>Build with us</b>
        <a href="#contact">Workshops</a>
        <a href="#contact">Waste audits</a>
        <a href="#contact">Student ideas</a>
      </div>
      <div>
        <b>Prototype</b>
        <p>
          Independent educational project.
          <br />
          Local demo database.
        </p>
      </div>
      <div className="footer-bottom">
        © 2026 DelfiCycle Studio · Built for circular thinking.
      </div>
    </footer>
  );
}
