export default function Navbar({ cartCount = 0, coins = 0, onCart }) {
  return (
    <header className="nav">
      <a className="brand" href="#top">
        <span className="brand-mark">↻</span>
        <span>
          Delfi<span>Cycle</span>
        </span>
      </a>
      <nav>
        <a href="#about">About</a>
        <a href="#process">Process</a>
        <a href="#diy">DIY Hub</a>
        <a href="#marketplace">Marketplace</a>
        <a href="#impact">Impact</a>
      </nav>
      <div className="nav-actions">
        <span className="coin-pill">◉ {coins}</span>
        <button className="cart-btn" onClick={onCart}>
          Cart <b>{cartCount}</b>
        </button>
      </div>
    </header>
  );
}
