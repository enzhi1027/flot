import React from "react";
import { StatusBadge } from "./StatusBadge";
import styles from "./ActorResultSection.module.css";

const ActorResultSection = ({ actors, isMoreView, onMoreClick }) => {
  return (
    <div className={styles.resultSection}>
      {!isMoreView && (
        <div className={styles.sectionHeaderRow}>
          <h2 className={styles.sectionTitle}>배우</h2>
          <button onClick={onMoreClick} className={styles.moreButton}>
            more
          </button>
        </div>
      )}

      <div
        className={isMoreView ? styles.actorGridInfinite : styles.actorGridRow}
      >
        {actors.map((actor) => (
          <div key={actor.id} className={styles.actorCard}>
            <div className={styles.actorProfilePlaceholder} />
            <h4 className={styles.actorName}>{actor.name}</h4>
            <div className={styles.actorFilmoList}>
              {actor.works.map((w) => (
                <div key={w.id} className={styles.filmoRow}>
                  <div className={styles.filmoLeft}>
                    <span className={styles.filmoTypeLabel}>
                      {w.type === 1 ? "뮤지컬" : "연극"}
                    </span>
                    <span className={styles.filmoTitle}>{w.title}</span>
                  </div>
                  <StatusBadge period={w.period} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isMoreView && (
        <div className={styles.infiniteScrollTriggerMock}>
          ⬇️ 무한 스크롤 구역
        </div>
      )}
    </div>
  );
};

export default ActorResultSection;
