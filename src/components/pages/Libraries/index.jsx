import React, { useState, useEffect } from "react";
import VideoModal from "../../UI/VideoModal";
import "./Libraries.scss";

const videos = [
  {
    id: "frh81KFbxpg",
    title: "Documentary: Languages Lost and Remembered",
    description:
      "A broad, accessible documentary tracing the causes of language loss — migration, assimilation, and globalization — with interviews and archival recordings.",
  },
  {
    id: "K1YCXLea9p0",
    title: "Case Study: A Language's Final Speakers",
    description:
      "An intimate case study following the last speakers of a threatened language, showing cultural impact and personal stories.",
  },
  {
    id: "bFWcT3Gbrw4",
    title: "Revival & Documentation Efforts",
    description:
      "Focuses on linguists, communities, and grassroots projects working to document, archive, and revive endangered languages.",
  },
];

const Libraries = () => {
  const [openVideo, setOpenVideo] = useState(null);
  const [cardWidth, setCardWidth] = useState(320);

  useEffect(() => {
    const update = () => {
      if (typeof window === "undefined") return;
      const w = window.innerWidth;
      if (w <= 640) setCardWidth("100%");
      else if (w <= 980) setCardWidth("48%");
      else setCardWidth(320);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <main className="libraries-page">
      <section className="section" style={{ padding: "1rem 0" }}>
        <div className="container">
          <h1 className="page_title">Video Library</h1>
          <div className="head">
            <p>
              Curated videos about disappearing languages. Click a card to
              watch.
            </p>
          </div>

          <div className="libraries-page">
            <div className="video-grid">
              {videos.map((v) => (
                <article
                  key={v.id}
                  className="video-card"
                  style={{ width: cardWidth }}
                  onClick={() => setOpenVideo(v)}
                >
                  <div className="thumb">
                    <img
                      src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                      alt={v.title}
                    />
                    <div className="play-overlay" aria-hidden>
                      <span className="play-circle" />
                    </div>
                  </div>
                  <div className="meta">
                    <h3 className="title">{v.title}</h3>
                    <p className="desc">{v.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <VideoModal
            show={Boolean(openVideo)}
            onClose={() => setOpenVideo(null)}
            videoId={openVideo?.id}
            title={openVideo?.title}
            autoplay={true}
          />
        </div>
      </section>
    </main>
  );
};

export default Libraries;
