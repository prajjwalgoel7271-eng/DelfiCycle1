import { useState } from 'react';
import Modal from './Modal';
import SmartImage from './SmartImage';

export default function Challenge({ challenge, onSubmit }) {
  const [open, setOpen] = useState(false);
  const [idea, setIdea] = useState('');
  const [materials, setMaterials] = useState('');

  if (!challenge) return null;

  return (
    <section className="challenge-corner" id="challenge">
      <div className="challenge-content">
        <div className="challenge-badge">
          <span>✦ {challenge.badge || 'Weekly Eco Challenge Corner'}</span>
        </div>
        <p className="eyebrow">WEEKLY ECO CHALLENGE CORNER</p>
        <h2>{challenge.title}</h2>
        <p className="challenge-description">{challenge.prompt}</p>

        <div className="challenge-meta">
          <div className="meta-item">
            <span className="meta-label">Mascot</span>
            <strong className="meta-value">PlastiFish 𓆝</strong>
          </div>
          <div className="meta-item">
            <span className="meta-label">Focus</span>
            <strong className="meta-value">Ocean Plastic Upcycling</strong>
          </div>
          <div className="meta-item">
            <span className="meta-label">Reward</span>
            <strong className="meta-value accent">+{challenge.reward} EcoCoins</strong>
          </div>
        </div>

        <div className="challenge-actions">
          <button className="primary" onClick={() => setOpen(true)}>
            Submit Your PlastiFish Idea →
          </button>
          <span className="challenge-hint">
            Drop <code>Plastifish.png</code> or <code>Plastifish.jpg</code> in <code>public/</code> to display your photo
          </span>
        </div>
      </div>

      <div className="challenge-visual-card">
        <div className="challenge-image-wrap">
          <SmartImage
            src={challenge.image || '/Plastifish.png'}
            fallbackImages={challenge.fallbackImages || ['/Plastifish.jpg', '/plastifish.png', '/plastifish.jpg']}
            alt={challenge.title}
            icon="𓆝"
            sublabel="PlastiFish Mascot Preview"
            className="challenge-img"
          />
        </div>
        <div className="visual-caption">
          <strong>The PlastiFish Initiative</strong>
          <small>Transforming discarded bottles & caps into marine awareness art</small>
        </div>
      </div>

      {open && (
        <Modal
          title={`Submit: ${challenge.title}`}
          onClose={() => setOpen(false)}
        >
          <div className="modal-challenge-header">
            <p><strong>Challenge Goal:</strong> {challenge.prompt}</p>
          </div>

          <label className="modal-label">
            Materials Used
            <input
              type="text"
              value={materials}
              onChange={(e) => setMaterials(e.target.value)}
              placeholder="e.g. 1 PET bottle, 6 blue caps, scrap plastic fins..."
              className="challenge-input"
            />
          </label>

          <label className="modal-label">
            Describe Your PlastiFish Prototype
            <textarea
              className="challenge-input"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Explain how you shaped the fish, attached the fins/scales, and the message behind it..."
              rows="5"
            />
          </label>

          <button
            className="primary full"
            disabled={!idea.trim()}
            onClick={() => {
              const fullSubmission = materials.trim()
                ? `[Materials: ${materials}] ${idea}`
                : idea;
              onSubmit(challenge, fullSubmission);
              setOpen(false);
              setIdea('');
              setMaterials('');
            }}
          >
            Submit Entry · Earn +{challenge.reward} EcoCoins
          </button>
        </Modal>
      )}
    </section>
  );
}
