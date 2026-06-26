import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Calendar from "../../components/calender/Calendar";
import { DUMMY_SHOWS } from "../../components/search/searchMockData";
import { favoriteShows } from "../../components/calender/calendarMockData";
import styles from "./PlayDetail.module.css";

const PlayDetail = () => {
  const { playName, season } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("cast");

  const showInfo =
    DUMMY_SHOWS.find((s) => s.title === playName && s.season === season) ||
    DUMMY_SHOWS.find((s) => s.title === playName) ||
    DUMMY_SHOWS[0];

  const calendarShow = favoriteShows.find((s) => s.name === playName);
  const calendarData = calendarShow
    ? calendarShow.entireSchedules.map((s) => ({
        ...s,
        dataType: "show_entire",
      }))
    : [];

  return (
    <div className={styles.detailContainer}>
      <div className={styles.playHeader}>
        <div className={styles.posterMainPlaceholder}></div>
        <div className={styles.playInfo}>
          <h2>
            [{showInfo?.type === 1 ? "뮤지컬" : "연극"}] {showInfo?.title}
          </h2>
          <p>
            <span>일시</span> {showInfo?.period}
          </p>
          <p>
            <span>장소</span> {showInfo?.place}
          </p>
          <p>
            <span>관람등급</span> 만 13세 이상 관람가
          </p>
          <p>
            <span>관람시간</span> 110분 (인터미션 없음)
          </p>
        </div>
      </div>

      <div className={styles.tabNavbar}>
        <div
          className={`${styles.tabItem} ${activeTab === "cast" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("cast")}
        >
          출연진
        </div>
        <div
          className={`${styles.tabItem} ${activeTab === "schedule" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("schedule")}
        >
          스케줄
        </div>
      </div>

      <div className={styles.contentBody}>
        {activeTab === "cast" ? (
          <div className={styles.castContainer}>
            {showInfo?.castingRoles.map((roleGroup, idx) => (
              <div key={idx} className={styles.roleGroupRow}>
                <div className={styles.roleNameLabel}>
                  {roleGroup.roleName} 역
                </div>
                <div className={styles.actorGrid}>
                  {roleGroup.actors.map((actorName, aIdx) => (
                    <div
                      key={aIdx}
                      className={styles.actorCard}
                      onClick={() => navigate(`/search/actors/${actorName}`)}
                    >
                      <div className={styles.actorImgPlaceholder}></div>
                      <span className={styles.actorNameText}>{actorName}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.calendarWrapper}>
            <Calendar isPlayCalendar={true} displayData={calendarData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayDetail;
