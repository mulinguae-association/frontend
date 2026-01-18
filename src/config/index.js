import introVideos from "./introVideos.json";

export function getIntroVideo(lang = "en") {
  if (!lang) lang = "en";
  const short = (lang || "en").split("-")[0];
  // prefer config JSON
  if (introVideos && introVideos[short]) return introVideos[short];

  // fallback to environment variables for backwards compatibility (Vite)
  const env = import.meta.env || {};
  switch (short) {
    case "en":
      return env.VITE_INTRO_VIDEO_EN || env.VITE_INTRO_VIDEO || "";
    case "es":
      return env.VITE_INTRO_VIDEO_ES || env.VITE_INTRO_VIDEO || "";
    case "fr":
      return env.VITE_INTRO_VIDEO_FR || env.VITE_INTRO_VIDEO || "";
    default:
      return env.VITE_INTRO_VIDEO_EN || env.VITE_INTRO_VIDEO || "";
  }
}

const config = { getIntroVideo };
export default config;
