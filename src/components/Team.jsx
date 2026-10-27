export default function Team({ team = [] }) {
  return (
    <section className="section team">
      <div className="section-heading row">
        <div>
          <p className="eyebrow">THE STUDIO</p>
          <h2>Five roles. One circular mission.</h2>
        </div>
        <p className="team-note">
          A five-member student team driving innovation, sustainability research, prototyping, store operations, and community workshops.
        </p>
      </div>
      <div className="team-grid">
        {team.map((member, i) => (
          <article key={member.name}>
            <div className="avatar">{member.name[0]}</div>
            <span>0{i + 1}</span>
            <h3>{member.name}</h3>
            <b>{member.role}</b>
            <p>{member.bio}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
