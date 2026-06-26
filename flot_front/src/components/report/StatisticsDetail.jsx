import React, { useState, useEffect, useRef } from "react";
import styles from "./StatisticsDetail.module.css";

const parseCount = (countStr) => {
  return parseInt(countStr.replace(/[^0-9]/g, ""), 10) || 0;
};

const generateMockShows = (startIdx, count) =>
  Array.from({ length: count }, (_, i) => ({
    id: `show-${startIdx + i}`,
    title: `뮤지컬/연극 작품명 ${startIdx + i}`,
    count: `${Math.floor(Math.random() * 25) + 1}회`,
    posterUrl: "",
  }));

const generateMockActors = (startIdx, count) =>
  Array.from({ length: count }, (_, i) => ({
    id: `actor-${startIdx + i}`,
    name: `배우 이름 ${startIdx + i}`,
    count: `${Math.floor(Math.random() * 30) + 1}회`,
    avatarUrl: "",
    watchedShows: ["오페라의 유령", "레미제라블", "아트", "프랑켄슈타인"].slice(
      0,
      Math.floor(Math.random() * 4) + 1,
    ),
  }));

const StatisticsDetail = ({ type = "SHOW", onBack }) => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const observerRef = useRef(null);

  const loadMoreData = () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    setTimeout(() => {
      const currentLength = items.length;

      if (currentLength >= 50) {
        setHasMore(false);
        setIsLoading(false);
        return;
      }

      const newData =
        type === "SHOW"
          ? generateMockShows(currentLength + 1, 10)
          : generateMockActors(currentLength + 1, 10);

      setItems((prev) => {
        const combined = [...prev, ...newData];
        return combined.sort(
          (a, b) => parseCount(b.count) - parseCount(a.count),
        );
      });

      setIsLoading(false);
    }, 600);
  };

  useEffect(() => {
    const initialData =
      type === "SHOW" ? generateMockShows(1, 15) : generateMockActors(1, 15);
    const sortedData = initialData.sort(
      (a, b) => parseCount(b.count) - parseCount(a.count),
    );

    setItems(sortedData);
    setHasMore(true);
  }, [type]);

  useEffect(() => {
    const observerTarget = observerRef.current;
    if (!observerTarget) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMoreData();
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(observerTarget);
    return () => observer.disconnect();
  }, [items, hasMore, isLoading]);

  return (
    <div className={styles.detailContainer}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          ← 통계로 돌아가기
        </button>
        <h2 className={styles.headerTitle}>
          {type === "SHOW"
            ? "자주 관람한 작품 전체보기"
            : "자주 관람한 배우 전체보기"}
        </h2>
      </div>

      <div className={styles.listWrapper}>
        {items.map((item, index) => {
          const rank = index + 1;

          return (
            <div key={item.id} className={styles.listItem}>
              <div
                className={`${styles.rankBadge} ${rank <= 3 ? styles.topRank : ""}`}
              >
                {rank}
              </div>

              <div
                className={`${styles.thumbnail} ${type === "ACTOR" ? styles.circleThumbnail : ""}`}
              >
                {type === "SHOW" ? (
                  item.posterUrl ? (
                    <img src={item.posterUrl} alt={item.title} />
                  ) : (
                    <span className={styles.placeholder}>🎬</span>
                  )
                ) : item.avatarUrl ? (
                  <img src={item.avatarUrl} alt={item.name} />
                ) : (
                  <span className={styles.placeholder}>👤</span>
                )}
              </div>

              <div className={styles.infoArea}>
                <div className={styles.mainInfo}>
                  <span className={styles.itemTitle}>
                    {item.title || item.name}
                  </span>
                  <span className={styles.itemCount}>{item.count} 관람</span>
                </div>

                {type === "ACTOR" && item.watchedShows && (
                  <div className={styles.subHistoryTags}>
                    {item.watchedShows.map((show, sIdx) => (
                      <span key={sIdx} className={styles.showTag}>
                        {show}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <div ref={observerRef} className={styles.loadingTrigger}>
          {isLoading && (
            <div className={styles.spinner}>데이터를 불러오는 중입니다...</div>
          )}
          {!hasMore && (
            <div className={styles.endMessage}>모든 기록을 조회했습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticsDetail;
