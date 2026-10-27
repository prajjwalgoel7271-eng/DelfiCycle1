import { useState, useMemo, useEffect } from 'react';

// Generates case-insensitive and all basic image extension variants
function buildImageCandidates(src, fallbacks = []) {
  const inputs = [src, ...fallbacks].filter(Boolean);
  const candidates = [];
  const seen = new Set();

  const extensions = ['jpeg', 'jpg', 'png', 'webp', 'JPEG', 'JPG', 'PNG', 'WEBP'];

  for (const input of inputs) {
    if (input.startsWith('blob:') || input.startsWith('data:')) {
      if (!seen.has(input)) {
        seen.add(input);
        candidates.push(input);
      }
      continue;
    }

    const raw = input.startsWith('/') ? input.slice(1) : input;
    const base = raw.replace(/\.(jpeg|jpg|png|webp|svg)$/i, '');

    const caseVariants = [
      base,
      base.toLowerCase(),
      base.toUpperCase(),
      base.charAt(0).toUpperCase() + base.slice(1).toLowerCase(),
    ];

    for (const variant of caseVariants) {
      for (const ext of extensions) {
        const path = `/${variant}.${ext}`;
        if (!seen.has(path)) {
          seen.add(path);
          candidates.push(path);
        }
      }
    }
  }

  return candidates;
}

export default function SmartImage({
  src,
  alt = '',
  fallbackImages = [],
  className = '',
}) {
  const candidates = useMemo(
    () => buildImageCandidates(src, fallbackImages),
    [src, fallbackImages]
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [candidates]);

  function handleError() {
    if (currentIndex + 1 < candidates.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  }

  if (candidates.length === 0) {
    return null;
  }

  return (
    <img
      src={candidates[currentIndex]}
      alt={alt}
      className={`smart-img ${className}`}
      onError={handleError}
    />
  );
}
