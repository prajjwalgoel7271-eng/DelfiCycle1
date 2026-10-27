const merch = [
  ['DelfiCycle Studio Tee', '₹699', '↻'],
  ['Waste Less Tote', '₹399', '◇'],
  ['EcoCoin Sticker Sheet', '₹99', '◉'],
];

export default function Merch() {
  return (
    <section className="section merch">
      <div className="section-heading">
        <p className="eyebrow">SCHOOL MERCH</p>
        <h2>Wear the idea.</h2>
      </div>
      <div className="merch-grid">
        {merch.map(([name, price, icon]) => (
          <div className="merch-card" key={name}>
            <div className="merch-art">{icon}</div>
            <h3>{name}</h3>
            <p>{price}</p>
            <button className="secondary">Coming soon</button>
          </div>
        ))}
      </div>
    </section>
  );
}
