import { useState } from 'react';
import SmartImage from './SmartImage';

export default function Marketplace({ products = [], onAdd }) {
  const cats = ['All', ...new Set(products.map((p) => p.category))];
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');

  const shown = products.filter(
    (p) =>
      (cat === 'All' || p.category === cat) &&
      (p.name + p.material).toLowerCase().includes(q.toLowerCase())
  );

  return (
    <section className="section market" id="marketplace">
      <div className="section-heading row">
        <div>
          <p className="eyebrow">MARKETPLACE</p>
          <h2>Objects with a second life.</h2>
          <p>Prototype storefront — purchases are simulated locally.</p>
        </div>
        <input
          className="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products..."
        />
      </div>

      <div className="filters market-filters">
        {cats.map((category) => (
          <button
            className={cat === category ? 'active' : ''}
            onClick={() => setCat(category)}
            key={category}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {shown.map((p) => (
          <article className="product-card" key={p.id}>
            <div className="product-art">
              <SmartImage
                src={p.image}
                fallbackImages={p.fallbackImages}
                alt={p.name}
                icon={p.icon}
                sublabel={p.material}
                className="product-card-img"
              />
            </div>
            <div className="product-info">
              <div className="tag-row">
                <span>{p.category}</span>
                <span>{p.stock} left</span>
              </div>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <div className="product-bottom">
                <strong>₹{p.price}</strong>
                <button className="primary small" onClick={() => onAdd(p)}>
                  Add to cart
                </button>
              </div>
              <small className="coin-reward">
                ◉ +{p.coins} EcoCoins on purchase
              </small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
