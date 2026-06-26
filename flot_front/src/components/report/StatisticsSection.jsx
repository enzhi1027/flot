import React, { useState } from "react";
import styles from "./StatisticsSection.module.css";
import StatisticsDetail from "./StatisticsDetail";

const dummyShows = [
  { id: 1, title: "오페라의 유령", count: "12회" },
  { id: 2, title: "아트", count: "8회" },
  { id: 3, title: "레미제라블", count: "5회" },
  { id: 4, title: "프랑켄슈타인", count: "3회" },
  { id: 5, title: "엘리펀트 송", count: "2회" },
];

const dummyActors = [
  { id: 1, name: "홍광호", count: "15회" },
  { id: 2, name: "최재림", count: "10회" },
  { id: 3, name: "박은태", count: "7회" },
  { id: 4, name: "전동석", count: "4회" },
  { id: 5, name: "카이", count: "2회" },
];

const StatisticsSection = () => {
  const [viewMode, setViewMode] = useState("MAIN");
  const [detailType, setDetailType] = useState("SHOW");

  const handleMoreClick = (type) => {
    setDetailType(type);
    setViewMode("DETAIL");
  };

  const handleBackToMain = () => {
    setViewMode("MAIN");
  };

  const renderRow = (title, data, type) => (
    <div className={styles.sectionRow}>
      <div className={styles.rowHeader}>
        <h3 className={styles.rowTitle}>{title}</h3>
        <button
          className={styles.moreButton}
          onClick={() => handleMoreClick(type)}
        >
          more
        </button>
      </div>

      <div className={styles.scrollContainer}>
        {data.map((item, index) => {
          const rank = index + 1;
          return (
            <div key={item.id} className={styles.card}>
              {rank <= 3 && (
                <div className={styles.flagIcon}>
                  <span>{rank}</span>
                </div>
              )}
              <div className={styles.cardThumbnail}>
                <div className={styles.placeholderIcon}>
                  {type === "SHOW" ? "🎬" : "👤"}
                </div>
              </div>
              <div className={styles.cardInfo}>
                <p className={styles.itemTitle}>{item.title || item.name}</p>
                <p className={styles.itemCount}>{item.count}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (viewMode === "DETAIL") {
    return <StatisticsDetail type={detailType} onBack={handleBackToMain} />;
  }

  return (
    <div className={styles.wrapper}>
      {renderRow("자주 관람한 작품", dummyShows, "SHOW")}
      {renderRow("자주 관람한 배우", dummyActors, "ACTOR")}
    </div>
  );
};

export default StatisticsSection;
