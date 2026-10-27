const steps = [
  ['01', 'Observe', 'Understand a real waste problem.'],
  ['02', 'Define', 'Frame the user + material challenge.'],
  ['03', 'Ideate', 'Generate useful second-life ideas.'],
  ['04', 'Prototype', 'Test, fail, improve, repeat.'],
  ['05', 'Share', 'Teach the process and story.'],
  ['06', 'Measure', 'Track waste, participation and value.'],
];

export default function Process() {
  return (
    <section className="section process" id="process">
      <div className="section-heading centered">
        <p className="eyebrow">DESIGN THINKING</p>
        <h2>From discarded to designed.</h2>
        <p>Every DelfiCycle product follows a simple loop.</p>
      </div>
      <div className="process-grid">
        {steps.map(([num, title, desc]) => (
          <article className="process-card" key={num}>
            <span>{num}</span>
            <h3>{title}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
