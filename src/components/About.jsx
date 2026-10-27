export default function About() {
  return (
    <section className="section about" id="about">
      <div className="section-heading">
        <p className="eyebrow">THE WHY</p>
        <h2>Waste isn't the end of a product's story.</h2>
      </div>
      <div className="about-grid">
        <div>
          <p className="lead">
            DelfiCycle Studio is a student-led experiment in circular design. Instead of asking, “How do we recycle this?”, we ask, “What useful thing could this become?”
          </p>
          <p>
            Our model connects design, DIY learning, school communities and a small marketplace. The goal is not to make more stuff — it is to keep materials useful for longer and make responsible choices easier to understand.
          </p>
        </div>
        <div className="stat-panel">
          <div>
            <b>01</b>
            <span>Collect difficult waste</span>
          </div>
          <div>
            <b>02</b>
            <span>Prototype useful products</span>
          </div>
          <div>
            <b>03</b>
            <span>Teach the process</span>
          </div>
          <div>
            <b>04</b>
            <span>Measure the impact</span>
          </div>
        </div>
      </div>
    </section>
  );
}
