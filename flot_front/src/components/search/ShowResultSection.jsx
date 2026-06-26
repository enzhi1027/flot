import React from "react";
import { Calendar, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "./StatusBadge";
import styles from "./ShowResultSection.module.css";

const ShowResultSection = ({ shows, isMoreView, onMoreClick }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.resultSection}>
      {!isMoreView && (
        <div className={styles.sectionHeaderRow}>
          <h2 className={styles.sectionTitle}>극</h2>
          <button onClick={onMoreClick} className={styles.moreButton}>
            more
          </button>
        </div>
      )}

      <div className={styles.showResultList}>
        {shows.map((show) => {
          const allActors = show.castingRoles
            ? show.castingRoles.flatMap((roleGroup) => roleGroup.actors)
            : [];

          const actorDisplayString = [...new Set(allActors)].join(", ");

          return (
            <div
              key={show.id}
              className={styles.showItemRow}
              onClick={() =>
                navigate(`/search/plays/${show.title}/${show.season}`)
              }
              style={{ cursor: "pointer" }}
            >
              <div className={styles.showMetaInfo}>
                <div className={styles.titleBadgeRow}>
                  <span className={styles.showMetaType}>
                    {show.type === 1 ? "뮤지컬" : "연극"}
                  </span>
                  <h3 className={styles.showMetaTitle}>{show.title}</h3>
                </div>
                <p className={styles.metaText}>
                  <Calendar size={13} /> {show.period}
                </p>
                <p className={styles.metaText}>
                  <MapPin size={13} /> {show.place}
                </p>
                <p className={styles.metaCasts}>{actorDisplayString}</p>
              </div>
              <StatusBadge period={show.period} />
            </div>
          );
        })}
      </div>

      {isMoreView && (
        <div className={styles.paginationBarMock}>페이지네이션 바</div>
      )}
    </div>
  );
};

export default ShowResultSection;
