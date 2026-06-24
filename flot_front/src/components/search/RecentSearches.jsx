import React from "react";
import { Clock, X } from "lucide-react";
import styles from "./RecentSearches.module.css";

const RecentSearches = ({
  recentSearches,
  onClearAll,
  onRemove,
  onRecentClick,
}) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.recentHeader}>
        <h2 className={styles.sectionTitle}>최근 검색어</h2>
        {recentSearches.length > 0 && (
          <button onClick={onClearAll} className={styles.clearAllButton}>
            전체 삭제
          </button>
        )}
      </div>

      {recentSearches.length === 0 ? (
        <div className={styles.noDataView}>최근 검색 내역이 없습니다</div>
      ) : (
        <div className={styles.recentList}>
          {recentSearches.map((item, idx) => (
            <div
              key={idx}
              className={styles.recentItem}
              onClick={() => onRecentClick(item)}
            >
              <div className={styles.recentLeft}>
                <Clock size={16} className={styles.clockIcon} />
                <span>{item}</span>
              </div>
              <button
                onClick={(e) => onRemove(item, e)}
                className={styles.removeButton}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentSearches;
