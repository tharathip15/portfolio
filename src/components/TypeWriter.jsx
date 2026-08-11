import React, { useState, useEffect } from 'react';

const TypeWriter = ({
  texts = [],
  speed = 80,
  deleteSpeed = 40,
  pauseTime = 2000,
  typingSpeed,
  deletingSpeed,
  pauseDuration
}) => {
  const actualSpeed = typingSpeed ?? speed;
  const actualDeleteSpeed = deletingSpeed ?? deleteSpeed;
  const actualPauseTime = pauseDuration ?? pauseTime;
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    let timeout;
    
    const fullText = texts[currentTextIndex];

    if (isDeleting) {
      if (currentText === '') {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        timeout = setTimeout(() => {}, 50);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(fullText.substring(0, currentText.length - 1));
        }, actualDeleteSpeed);
      }
    } else {
      if (currentText === fullText) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, actualPauseTime);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        }, actualSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts, actualSpeed, actualDeleteSpeed, actualPauseTime]);

  return (
    <span style={{ fontFamily: 'var(--font-mono, monospace)', display: 'inline-flex', alignItems: 'center' }}>
      {currentText}
      <span 
        style={{ 
          color: 'var(--accent-cyan)', 
          animation: 'blink 1s step-end infinite',
          marginLeft: '4px',
          fontWeight: 'bold'
        }}
      >
        |
      </span>
      <style>
        {`
          @keyframes blink {
            from, to { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
    </span>
  );
};

export default TypeWriter;
