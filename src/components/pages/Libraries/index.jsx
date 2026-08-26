import React, { useState } from "react";
import VideoModal from "../../UI/VideoModal";
import styles from "./Libraries.module.scss";
import { useTranslation } from "react-i18next";

const Libraries = () => {
  const { t } = useTranslation("pages/librariesPage");
  const videos = t("videos", { returnObjects: true });
  const [openVideo, setOpenVideo] = useState(null);

  return (
    <main className={styles["libraries-page"]}>
      <section className={styles.section} style={{ padding: "1rem 0" }}>
        <div className="container">
          <h1 className={styles["page-title"]}>Video Library</h1>
          <div className={styles.head}>
            <p>
              Curated videos about disappearing languages. Click a card to
              watch.
            </p>
          </div>

          <div className={styles["libraries-page"]}>
            <div className={styles["video-grid"]}>
              {Array.isArray(videos) &&
                videos.map((v) => (
                  <article
                    key={v.id}
                    className={styles["video-card"]}
                    onClick={() => setOpenVideo(v)}
                  >
                    <div className={styles.thumb}>
                      <img
                        src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                        alt={v.title}
                      />
                      <div className={styles["play-overlay"]} aria-hidden>
                        <span className={styles["play-circle"]} />
                      </div>
                    </div>
                    <div className={styles.meta}>
                      <h3 className={styles.title}>{v.title}</h3>
                      <p className={styles.desc}>{v.description}</p>
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
