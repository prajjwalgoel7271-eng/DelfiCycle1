import { useState } from 'react';

const answers = {
  plastic:
    'Try sorting plastic by type first. PET bottles, HDPE caps and multilayer packaging behave very differently, so the material should guide the product idea.',
  coins:
    'Complete a DIY tutorial, submit a challenge entry or make a simulated marketplace purchase to earn EcoCoins.',
  idea:
    'Start with a waste item you see every day. Ask: what is its strongest useful property — flexibility, rigidity, texture, colour or modularity?',
  impact:
    'Track three things: material diverted, useful products made and people who learned a new action.',
};

function reply(query) {
  const s = query.toLowerCase();
  if (s.includes('coin')) return answers.coins;
  if (s.includes('plastic')) return answers.plastic;
  if (s.includes('idea') || s.includes('make')) return answers.idea;
  return answers.impact;
}

export default function EcoBuddy() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState([
    {
      from: 'bot',
      text: 'Hi! I’m EcoBuddy. Ask me about plastic, EcoCoins, product ideas or impact.',
    },
  ]);

  function send() {
    if (!input.trim()) return;
    const q = input.trim();
    setMsgs((m) => [
      ...m,
      { from: 'you', text: q },
      { from: 'bot', text: reply(q) },
    ]);
    setInput('');
  }

  return (
    <>
      <button
        className="buddy-fab"
        onClick={() => setOpen(!open)}
        aria-label="Toggle EcoBuddy assistant"
      >
        ✦ EcoBuddy
      </button>

      {open && (
        <div className="buddy">
          <div className="buddy-head">
            <b>EcoBuddy</b>
            <button onClick={() => setOpen(false)} aria-label="Close EcoBuddy">
              ×
            </button>
          </div>
          <div className="buddy-msgs">
            {msgs.map((m, i) => (
              <div className={m.from} key={i}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="buddy-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask EcoBuddy..."
            />
            <button onClick={send} aria-label="Send message">
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
