import React from "react";
import { Calendar } from "lucide-react";
import styles from "./ShowCard.module.css";

const ShowCard = ({ show, isMyShow = false }) => {
  return (
    <div className={styles.showCard}>
      <div className={styles.posterWrapper}>
        <img src={show.poster} alt={show.title} className={styles.posterImg} />
        {isMyShow && show.seat && (
          <div className={styles.seatBadge}>{show.seat}</div>
        )}
      </div>
      <div className={styles.showInfo}>
        <h3 className={styles.showTitle}>{show.title}</h3>
        {isMyShow ? (
          <p className={styles.myDateText}>
            <Calendar size={14} style={{ marginRight: "4px", flexShrink: 0 }} />
            {show.date}
          </p>
        ) : (
          <>
            <p className={styles.showDetail}>{show.place}</p>
            <p className={styles.showDate}>{show.period}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ShowCard;
