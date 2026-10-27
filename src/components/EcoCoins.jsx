export default function EcoCoins({ coins = 0, activity = [] }) {
  return (
    <section className="section coins-section">
      <div className="coin-hero">
        <div>
          <p className="eyebrow">ECOCOINS</p>
          <h2>Make good actions count.</h2>
          <p>
            In this prototype, EcoCoins reward learning, making and participating.
            Your balance is stored locally in this browser.
          </p>
        </div>
        <div className="coin-balance">
          <span>◉</span>
          <strong>{coins}</strong>
          <small>EcoCoins</small>
        </div>
      </div>

      <div className="activity">
        <h3>Recent activity</h3>
        {activity.length > 0 ? (
          <ul>
            {activity.slice(0, 5).map((a) => (
              <li key={a.id}>
                <span>{a.label}</span>
                <b>+{a.amount}</b>
              </li>
            ))}
          </ul>
        ) : (
          <p>No activity yet. Complete a DIY tutorial to start.</p>
        )}
      </div>
    </section>
  );
}
