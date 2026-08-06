'use client';
import { useEffect } from 'react';

export default function ImageProtection() {
  useEffect(() => {
    // 1. Bulletproof right-click context menu prevention on all images, canvas & wrappers
    const handleContextMenu = (e) => {
      const isImg = 
        e.target.tagName === 'IMG' ||
        e.target.tagName === 'PICTURE' ||
        e.target.tagName === 'CANVAS' ||
        e.target.closest('img') ||
        e.target.closest('picture') ||
        e.target.closest('[class*="Img"]') ||
        e.target.closest('[class*="img"]') ||
        e.target.closest('[class*="Card"]') ||
        e.target.closest('[class*="card"]') ||
        e.target.closest('[class*="Lightbox"]') ||
        e.target.closest('[class*="lightbox"]') ||
        (e.target.style && e.target.style.backgroundImage);

      if (isImg) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // 2. Prevent dragging images onto desktop or other tabs
    const handleDragStart = (e) => {
      if (
        e.target.tagName === 'IMG' ||
        e.target.tagName === 'PICTURE' ||
        e.target.closest('img')
      ) {
        e.preventDefault();
        return false;
      }
    };

    // 3. Prevent keyboard save shortcuts (Ctrl+S / Cmd+S / Ctrl+U)
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S' || e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu, true);
    document.addEventListener('dragstart', handleDragStart, true);
    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu, true);
      document.removeEventListener('dragstart', handleDragStart, true);
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, []);

  return null;
}
