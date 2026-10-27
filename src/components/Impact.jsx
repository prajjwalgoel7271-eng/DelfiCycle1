export default function Impact({ impact = {} }) {
  const items = [
    ['Waste diverted', `${impact.wasteDivertedKg ?? 0} kg`, 'material kept in use'],
    ['Products prototyped', impact.productsMade ?? 0, 'ideas made tangible'],
    ['Students reached', impact.studentsReached ?? 0, 'learning by doing'],
    ['Workshops', impact.workshops ?? 0, 'community sessions'],
    [
      'EcoCoins awarded',
      (impact.coinsAwarded ?? 0).toLocaleString(),
      'participation rewarded',
    ],
    ['Community partners', impact.communityPartners ?? 0, 'people building together'],
  ];

  return (
    <section className="section impact" id="impact">
      <div className="section-heading centered">
        <p className="eyebrow">IMPACT DASHBOARD</p>
        <h2>Small loops. Measurable change.</h2>
        <p>Prototype metrics for the DelfiCycle model.</p>
      </div>
      <div className="impact-grid">
        {items.map(([label, value, description]) => (
          <div className="impact-card" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{description}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
