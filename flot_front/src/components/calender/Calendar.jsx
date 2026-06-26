import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { getPersonColor } from "./calendarMockData";
import styles from "./Calendar.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Calendar({ displayData = [], isPlayCalendar = false }) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 5, 24));
  const [modalItem, setModalItem] = useState(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarDays = eachDayOfInterval({
    start: startOfWeek(monthStart),
    end: endOfWeek(monthEnd),
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <button
          className={styles.navArrow}
          onClick={() =>
            setCurrentMonth(
              (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
            )
          }
        >
          <ArrowBackIosIcon />
        </button>
        <span className={styles.title}>
          {format(currentMonth, "yyyy년 M월")}
        </span>
        <button
          className={styles.navArrow}
          onClick={() =>
            setCurrentMonth(
              (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
            )
          }
        >
          <ArrowForwardIosIcon />
        </button>
      </div>

      <div className={styles.weekHeader}>
        {["일", "월", "화", "수", "목", "금", "토"].map((w, idx) => (
          <div
            key={w}
            className={`${styles.weekCell} ${idx === 0 ? styles.sun : idx === 6 ? styles.sat : ""}`}
          >
            {w}
          </div>
        ))}
      </div>

      <div className={styles.dayGrid}>
        {calendarDays.map((day) => {
          const dateStr = format(day, "yyyy-MM-dd");
          const isCurrentMonth = isSameMonth(day, monthStart);

          const dayItems = displayData
            .filter((item) => item.date === dateStr)
            .sort((a, b) => (a.time || "").localeCompare(b.time || ""));

          return (
            <div
              key={dateStr}
              className={`${styles.dayCell} ${!isCurrentMonth ? styles.otherMonth : ""}`}
            >
              <span
                className={`${styles.dayNum} ${isSameDay(day, new Date()) ? styles.today : ""}`}
              >
                {format(day, "d")}
              </span>

              <div className={styles.itemLayer}>
                {dayItems.map((item, index) => {
                  if (isPlayCalendar) {
                    const currentEvents = item.event
                      ? item.event
                          .split(/,\s*/)
                          .map((e) => e.trim())
                          .filter(Boolean)
                      : [];

                    return (
                      <div key={index} className={styles.playItemBox}>
                        {currentEvents.length > 0 && (
                          <div className={styles.eventBadgeContainer}>
                            {currentEvents.map((evt, evtIdx) => (
                              <div
                                key={evtIdx}
                                className={styles.playEventBadge}
                              >
                                {evt}
                              </div>
                            ))}
                          </div>
                        )}
                        <div className={styles.playCastRow}>
                          <span className={styles.playTime}>• {item.time}</span>
                          <span className={styles.playActors}>
                            {item.actors}
                          </span>
                        </div>
                      </div>
                    );
                  } else {
                    const personColor = getPersonColor(item.ownerId);
                    return (
                      <div
                        key={index}
                        className={`${styles.cleanBlockBadge} ${item.isPending ? styles.pendingItem : ""}`}
                        style={{
                          backgroundColor: personColor.bg,
                          color: personColor.color,
                        }}
                        onClick={() => setModalItem(item)}
                      >
                        <span className={styles.cleanBlockTime}>
                          {item.time}
                        </span>
                        <span className={styles.blockTitle}>
                          {item.isPending && (
                            <span className={styles.pendingTag}>[미정] </span>
                          )}
                          {item.title || item.showName}
                        </span>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          );
        })}
      </div>

      {modalItem && (
        <div className={styles.modalOverlay} onClick={() => setModalItem(null)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalTop}>
              <span className={styles.modalDateInfo}>
                {modalItem.date} {modalItem.time}
              </span>
              <button
                className={styles.closeX}
                onClick={() => setModalItem(null)}
              >
                &times;
              </button>
            </div>
            <h2 className={styles.modalMainTitle}>
              {modalItem.dataType === "actor_cast"
                ? `[배우 스케줄] ${modalItem.showName}`
                : modalItem.title}
            </h2>
            <hr />
            <div className={styles.modalTable}>
              {modalItem.dataType === "actor_cast" ? (
                <>
                  <div className={styles.modalRow}>
                    <span className={styles.fixedKey}>공연장</span>
                    <strong>{modalItem.place || "-"}</strong>
                  </div>
                  <div className={styles.modalRow}>
                    <span className={styles.fixedKey}>이벤트</span>
                    <strong>{modalItem.event || "없음"}</strong>
                  </div>
                  <div className={styles.modalRow}>
                    <span className={styles.fixedKey}>출연진</span>
                    <strong>{modalItem.actors || "-"}</strong>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.modalRow}>
                    <span className={styles.fixedKey}>장르</span>
                    <strong>{modalItem.genre || "-"}</strong>
                  </div>
                  <div className={styles.modalRow}>
                    <span className={styles.fixedKey}>상태</span>
                    <strong>
                      {modalItem.isPending ? "미정 일정" : "확정 일정"}
                    </strong>
                  </div>
                  <div className={styles.modalRow}>
                    <span className={styles.fixedKey}>출연진</span>
                    <strong>{modalItem.actors || "-"}</strong>
                  </div>
                  <div className={styles.modalRow}>
                    <span className={styles.fixedKey}>장소</span>
                    <strong>{modalItem.place || "-"}</strong>
                  </div>
                  <div className={styles.modalRow}>
                    <span className={styles.fixedKey}>좌석</span>
                    <strong>{modalItem.seat || "-"}</strong>
                  </div>
                  <div className={styles.modalRow}>
                    <span className={styles.fixedKey}>금액</span>
                    <strong>{modalItem.price || "-"}</strong>
                  </div>
                  <div className={styles.modalRow}>
                    <span className={styles.fixedKey}>구매처</span>
                    <strong>{modalItem.shop || "-"}</strong>
                  </div>
                  <div className={styles.modalRow}>
                    <span className={styles.fixedKey}>메모</span>
                    <p className={styles.memoText}>
                      {modalItem.memo || "등록된 메모 없음"}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
