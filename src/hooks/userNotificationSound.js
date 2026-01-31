// useNotificationSound.js
import { useCallback, useRef } from "react";

function useNotificationSound() {
  const playedIds = useRef(new Set());

  const play = useCallback((id) => {
    // Skip if already played
    if (playedIds.current.has(id)) return;

    // Mark as played
    playedIds.current.add(id);

    // Create a NEW audio instance each time (avoids state issues)
    const audio = new Audio("/sounds/notification.mp3");
    audio.volume = 1.0;

    // Play the sound
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log(`Notification sound played for ${id}`);
        })
        .catch((error) => {
          console.warn("Audio play failed:", error);
          playedIds.current.delete(id); // Allow retry on failure
        });
    }

    // Clean up after playing
    audio.onended = () => {
      audio.remove();
    };
  }, []);

  const reset = useCallback(() => {
    playedIds.current.clear();
  }, []);

  return { play, reset };
}

export default useNotificationSound;
