import React, { useState, useMemo } from "react";
import { Clock, User, Filter } from "lucide-react";
import styles from "./TodayStage.module.css";

const TodayStage = () => {
  const [activeTab, setActiveTab] = useState("show");
  const [selectedEvent, setSelectedEvent] = useState("all");

  const todaysShows = [
    {
      id: "today-1-1",
      title: "미오 프라텔로",
      type: 1,
      time: "16:00",
      location: "드림아트센터 1관",
      casts: ["정민", "김대현", "최호승"],
      event: "폴라데이",
    },
    {
      id: "today-1-2",
      title: "미오 프라텔로",
      type: 1,
      time: "20:00",
      location: "드림아트센터 1관",
      casts: ["김이안", "박규원", "동현"],
    },
    {
      id: "today-2-1",
      title: "히스토리 보이즈",
      type: 2,
      time: "20:00",
      location: "두산아트센터 연강홀",
      casts: ["오대석", "안재영", "김리현", "황순종"],
      event: "커튼콜 데이",
    },
    {
      id: "today-3-1",
      title: "사의 찬미",
      type: 1,
      time: "14:30",
      location: "TOM 1관",
      casts: ["주민진", "최연우", "정민"],
      event: "스페셜 티켓",
    },
    {
      id: "today-3-2",
      title: "사의 찬미",
      type: 1,
      time: "19:30",
      location: "TOM 1관",
      casts: ["신성민", "홍서영", "정민"],
      event: "폴라데이",
    },
    {
      id: "today-3-3",
      title: "사의 찬미",
      type: 2,
      time: "19:30",
      location: "LG아트센터",
      casts: ["배우1", "배우2", "배우3", "배우4", "배우5", "배우6"],
      event: "폴라데이",
    },
  ];

  const formattedDate = useMemo(() => {
    const today = new Date();
    return `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 오늘의 라인업`;
  }, []);

  const eventCategories = useMemo(() => {
    const events = new Set();
    todaysShows.forEach((show) => {
      if (show.event) events.add(show.event);
    });
    return ["all", ...Array.from(events)];
  }, [todaysShows]);

  const filteredShows = useMemo(() => {
    if (selectedEvent === "all") return todaysShows;
    return todaysShows.filter((show) => show.event === selectedEvent);
  }, [selectedEvent, todaysShows]);

  const groupedByShow = useMemo(() => {
    const groups = {};
    filteredShows.forEach((show) => {
      const groupKey = `${show.title}-${show.type}`;

      if (!groups[groupKey]) {
        groups[groupKey] = {
          title: show.title,
          type: show.type,
          location: show.location,
          schedules: [],
        };
      }
      groups[groupKey].schedules.push({
        id: show.id,
        time: show.time,
        casts: show.casts,
        event: show.event,
      });
    });

    Object.values(groups).forEach((group) => {
      group.schedules.sort((a, b) => a.time.localeCompare(b.time));
    });
    return Object.values(groups);
  }, [filteredShows]);

  const groupedByTimeList = useMemo(() => {
    const groups = {};
    filteredShows.forEach((show) => {
      if (!groups[show.time]) {
        groups[show.time] = [];
      }
      groups[show.time].push(show);
    });

    return Object.keys(groups)
      .sort((a, b) => a.localeCompare(b))
      .map((time) => ({
        time,
        shows: groups[time],
      }));
  }, [filteredShows]);

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeaderWithTabs}>
        <div className={styles.sectionHeaderLeft}>
          <h2 className={styles.sectionTitle}>오늘의 무대</h2>
          <span className={styles.sectionSub}>{formattedDate}</span>
        </div>

        <div className={styles.tabButtonGroup}>
          <button
            className={`${styles.tabButton} ${activeTab === "show" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("show")}
          >
            극별로 보기
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "time" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("time")}
          >
            시간대별 보기
          </button>
        </div>
      </div>

      <div className={styles.filterContainer}>
        <div className={styles.filterLabel}>
          <Filter size={14} />
          <span>현장 이벤트 필터:</span>
        </div>
        <div className={styles.filterChips}>
          {eventCategories.map((evt) => (
            <button
              key={evt}
              className={`${styles.filterChip} ${selectedEvent === evt ? styles.activeChip : ""}`}
              onClick={() => setSelectedEvent(evt)}
            >
              {evt === "all" ? "전체 목록" : evt}
            </button>
          ))}
        </div>
      </div>

      {filteredShows.length === 0 && (
        <div className={styles.noData}>
          선택하신 이벤트가 진행되는 오늘의 공연이 없습니다.
        </div>
      )}

      {activeTab === "show" ? (
        <div className={styles.todayGrid}>
          {groupedByShow.map((show, index) => (
            <div key={`${show.title}-${index}`} className={styles.todayCard}>
              <div className={styles.todayCardHeader}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h3 className={styles.todayShowTitle}>{show.title}</h3>
                  {show.type === 2 && (
                    <span className={styles.genreBadge}>- 연극</span>
                  )}
                </div>
                <span className={styles.todayLocation}>{show.location}</span>
              </div>

              <div className={styles.todayCardBody}>
                {show.schedules.map((sched) => (
                  <div key={sched.id} className={styles.scheduleRow}>
                    <div className={styles.scheduleMetaRow}>
                      <div className={styles.timeMeta}>
                        <Clock size={15} className={styles.metaIcon} />
                        <span className={styles.boldTime}>
                          {sched.time} 회차
                        </span>
                      </div>
                      {sched.event && (
                        <span className={styles.eventBadge}>{sched.event}</span>
                      )}
                    </div>

                    <div className={styles.castContainer}>
                      <div className={styles.castTitleRow}>
                        <User size={14} className={styles.metaIcon} />
                        <span>Cast</span>
                      </div>
                      <div className={styles.castTags}>
                        {sched.casts.map((cast, idx) => (
                          <span key={idx} className={styles.castTag}>
                            {cast}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.timelineContainer}>
          {groupedByTimeList.map((timeGroup) => (
            <div key={timeGroup.time} className={styles.timelineSection}>
              <div className={styles.timelineTimeHeader}>
                <Clock size={18} />
                <span>{timeGroup.time}</span>
              </div>

              <div className={styles.timelineList}>
                {timeGroup.shows.map((show) => (
                  <div key={show.id} className={styles.timelineItem}>
                    <div className={styles.timelineMainInfo}>
                      <div className={styles.timelineShowTitle}>
                        <span>{show.title}</span>
                        {show.type === 2 && (
                          <span className={styles.genreBadge}>- 연극</span>
                        )}
                      </div>

                      <div className={styles.timelineEventWrapper}>
                        {show.event ? (
                          <span className={styles.timelineEventBadge}>
                            {show.event}
                          </span>
                        ) : (
                          <span className={styles.timelineEventPlaceholder} />
                        )}
                      </div>

                      <div className={styles.timelineCastContainer}>
                        <span>{show.casts.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TodayStage;
