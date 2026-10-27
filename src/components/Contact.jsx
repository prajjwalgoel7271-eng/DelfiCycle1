import { useState } from 'react';

export default function Contact({ onSave }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (!form.name || !form.message) return;
    onSave(form);
    setForm({ name: '', email: '', message: '' });
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  }

  return (
    <section className="section contact" id="contact">
      <div className="contact-copy">
        <p className="eyebrow">JOIN THE LOOP</p>
        <h2>Have waste. Have an idea. Bring it.</h2>
        <p>
          Schools, students, communities and makers can collaborate with the
          studio through workshops, prototypes and waste audits.
        </p>
        <div className="contact-points">
          <span>✦ School workshops</span>
          <span>✦ Waste audits</span>
          <span>✦ Student collaborations</span>
        </div>
      </div>

      <form onSubmit={submit}>
        <label>
          Name
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>
        <label>
          Message
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            rows="5"
          />
        </label>
        <button className="primary full">
          {sent ? 'Message saved ✓' : 'Send message →'}
        </button>
        <small>Demo note: this form saves locally in your browser.</small>
      </form>
    </section>
  );
}
