import { useState } from 'react';
import Modal from './Modal';
import SmartImage from './SmartImage';

export default function DIYHub({ tutorials = [], completed = [], onComplete }) {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [customImages, setCustomImages] = useState({});
  const [customVideos, setCustomVideos] = useState({});

  const levels = ['All', 'Beginner', 'Intermediate'];
  const shown = tutorials.filter(
    (t) => filter === 'All' || t.level === filter
  );

  function handleImageFile(e, tutorialId) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomImages((prev) => ({ ...prev, [tutorialId]: url }));
    }
  }

  function handleVideoFile(e, tutorialId) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomVideos((prev) => ({ ...prev, [tutorialId]: url }));
    }
  }

  function closeModal() {
    setSelected(null);
  }

  return (
    <section className="section" id="diy">
      <div className="section-heading row">
        <div>
          <p className="eyebrow">DIY LEARNING HUB</p>
          <h2>Learn to make waste useful.</h2>
          <p>Interactive student tutorials with photos, videos, and EcoCoin rewards.</p>
        </div>
        <div className="filters">
          {levels.map((lvl) => (
            <button
              className={filter === lvl ? 'active' : ''}
              onClick={() => setFilter(lvl)}
              key={lvl}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="card-grid">
        {shown.map((t) => {
          const userPhoto = customImages[t.id];
          const hasVideo = Boolean(customVideos[t.id] || t.video);

          return (
            <article className="tutorial-card" key={t.id}>
              <div
                className="tutorial-visual"
                onClick={() => setSelected(t)}
                style={{ cursor: 'pointer' }}
                title={`Open ${t.title}`}
              >
                {userPhoto ? (
                  <img
                    src={userPhoto}
                    alt={t.title}
                    className="tutorial-card-img"
                  />
                ) : (
                  <SmartImage
                    src={t.image}
                    fallbackImages={t.fallbackImages}
                    alt={t.title}
                    className="tutorial-card-img"
                  />
                )}
              </div>
              <div className="card-body">
                <div className="tag-row">
                  <span>{t.level}</span>
                  <span>{t.minutes} min</span>
                </div>
                <h3>{t.title}</h3>
                <p>{t.waste}</p>
                <div className="tutorial-card-footer">
                  <button className="text-btn" onClick={() => setSelected(t)}>
                    {completed.includes(t.id) ? 'Review tutorial' : 'Open tutorial'} →
                  </button>
                  <div className="card-media-tags">
                    <span className="media-badge">📷 Photo</span>
                    {hasVideo && <span className="video-badge">🎬 Video</span>}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {selected && (
        <Modal title={selected.title} onClose={closeModal}>
          <div className="modal-meta-row">
            <span><b>Material:</b> {selected.waste}</span>
            <span><b>Duration:</b> {selected.minutes} mins</span>
            <span className="accent-pill">+{selected.coins} EcoCoins</span>
          </div>

          {/* Craft Photo Section with Choose Photo Button */}
          <div className="tutorial-media-box">
            <div className="media-box-header">
              <h4>📷 Craft Photo</h4>
              <label className="secondary small media-picker-btn">
                <span>📷 Choose Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageFile(e, selected.id)}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            <div className="modal-craft-preview">
              {customImages[selected.id] ? (
                <img
                  src={customImages[selected.id]}
                  alt={selected.title}
                  className="modal-craft-img"
                />
              ) : (
                <SmartImage
                  src={selected.image}
                  fallbackImages={selected.fallbackImages}
                  alt={selected.title}
                  className="modal-craft-img"
                />
              )}
            </div>

            <div className="media-tip-bar">
              <small>
                {customImages[selected.id] ? (
                  <span className="file-loaded-badge">✓ Custom photo loaded</span>
                ) : (
                  <span>
                    Tip: Click <b>Choose Photo</b> or place <code>{selected.image ? selected.image.replace('/', '') : `${selected.id}.png`}</code> into <code>public/</code>
                  </span>
                )}
              </small>
            </div>
          </div>

          {/* Video Tutorial Section with Choose Video Button (For ALL tutorials) */}
          <div className="tutorial-media-box tutorial-video-section">
            <div className="media-box-header">
              <h4>🎬 Video Tutorial</h4>
              <label className="secondary small media-picker-btn">
                <span>🎬 Choose Video</span>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleVideoFile(e, selected.id)}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            {customVideos[selected.id] ? (
              <video
                key={customVideos[selected.id]}
                src={customVideos[selected.id]}
                controls
                autoPlay
                className="tutorial-video-player"
              />
            ) : selected.video ? (
              <video
                key={selected.video}
                src={selected.video}
                controls
                className="tutorial-video-player"
              >
                {selected.videoFallbacks?.map((v) => (
                  <source key={v} src={v} />
                ))}
                Your browser does not support HTML5 video.
              </video>
            ) : (
              <div className="video-empty-state">
                <span className="empty-video-icon">🎬</span>
                <p>No video added yet</p>
                <small>Click <b>Choose Video</b> above to attach a video for this tutorial.</small>
              </div>
            )}

            <div className="media-tip-bar">
              <small>
                {customVideos[selected.id] ? (
                  <span className="file-loaded-badge">✓ Custom video active</span>
                ) : (
                  <span>
                    Tip: Click <b>Choose Video</b> or drop <code>{selected.video ? selected.video.replace('/', '') : `${selected.id}.mp4`}</code> into <code>public/</code>
                  </span>
                )}
              </small>
            </div>
          </div>

          <h4>Step-by-Step Instructions</h4>
          <ol className="steps">
            {selected.steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>

          <div className="tip">
            <strong>Safety & Design Note:</strong> {selected.tip}
          </div>

          <button
            className="primary full"
            onClick={() => {
              onComplete(selected);
              closeModal();
            }}
          >
            {completed.includes(selected.id)
              ? 'Completed ✓'
              : `Mark complete +${selected.coins} EcoCoins`}
          </button>
        </Modal>
      )}
    </section>
  );
}
