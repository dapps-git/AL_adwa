'use client';
import { useEffect } from 'react';

export default function ImageProtection() {
  useEffect(() => {
    // 1. Prevent right-click context menu on all images and image wrappers
    const handleContextMenu = (e) => {
      if (
        e.target.tagName === 'IMG' ||
        e.target.tagName === 'PICTURE' ||
        e.target.closest('img') ||
        e.target.style.backgroundImage
      ) {
        e.preventDefault();
        return false;
      }
    };

    // 2. Prevent dragging images
    const handleDragStart = (e) => {
      if (e.target.tagName === 'IMG' || e.target.tagName === 'PICTURE') {
        e.preventDefault();
        return false;
      }
    };

    // 3. Prevent keyboard shortcuts like Ctrl+S (Save) or Ctrl+U (View Source) if targeting images
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S' || e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
}
