import React from "react";
import { Calendar, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom"; // 💡 클릭 시 이동을 위한 useNavigate 추가
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
          // 💡 고도화된 castingRoles 배열에서 배우 이름들만 추출하여 평탄화(flatten)합니다.
          const allActors = show.castingRoles
            ? show.castingRoles.flatMap((roleGroup) => roleGroup.actors)
            : [];

          // 중복 이름이 있을 경우를 대비한 Set 처리 후 콤마로 연결
          const actorDisplayString = [...new Set(allActors)].join(", ");

          return (
            <div
              key={show.id}
              className={styles.showItemRow}
              /* 💡 카드를 클릭하면 해당 극의 상세 페이지(PlayDetail)로 라우팅되도록 설정 */
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
                {/* 💡 기존 show.casts.join 대신 변환한 actorDisplayString을 매핑 */}
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
