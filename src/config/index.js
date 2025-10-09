import introVideos from "./introVideos.json";

export function getIntroVideo(lang = "en") {
  if (!lang) lang = "en";
  const short = (lang || "en").split("-")[0];
  // prefer config JSON
  if (introVideos && introVideos[short]) return introVideos[short];

  // fallback to environment variables for backwards compatibility
  switch (short) {
    case "en":
      return (
        process.env.REACT_APP_INTRO_VIDEO_EN ||
        process.env.REACT_APP_INTRO_VIDEO ||
        ""
      );
    case "es":
      return (
        process.env.REACT_APP_INTRO_VIDEO_ES ||
        process.env.REACT_APP_INTRO_VIDEO ||
        ""
      );
    case "fr":
      return (
        process.env.REACT_APP_INTRO_VIDEO_FR ||
        process.env.REACT_APP_INTRO_VIDEO ||
        ""
      );
    default:
      return (
        process.env.REACT_APP_INTRO_VIDEO_EN ||
        process.env.REACT_APP_INTRO_VIDEO ||
        ""
      );
  }
}

const config = { getIntroVideo };
export default config;
