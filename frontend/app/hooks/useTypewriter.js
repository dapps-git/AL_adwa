'use client';
import { useState, useEffect, useRef } from 'react';

export function useTypewriter(fullText, speed = 65, threshold = 0.15, externalVisible = null) {
  const [typedText, setTypedText] = useState('');
  const [internalVisible, setInternalVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (externalVisible !== null) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInternalVisible(true);
        } else {
          // Reset visibility and typed text when out of view so it re-triggers on every scroll
          setInternalVisible(false);
          setTypedText('');
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, externalVisible]);

  const isVisible = externalVisible !== null ? externalVisible : internalVisible;

  useEffect(() => {
    if (!isVisible || !fullText) {
      if (!isVisible) setTypedText('');
      return;
    }

    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [isVisible, fullText, speed]);

  return { ref, typedText, isVisible };
}
