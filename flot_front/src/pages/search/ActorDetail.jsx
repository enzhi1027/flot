import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DUMMY_ACTORS } from "../../components/search/searchMockData";
import { favoriteActors } from "../../components/calender/calendarMockData";
import styles from "./ActorDetail.module.css";
import Calendar from "../../components/calender/Calendar";

const ActorDetail = () => {
  const { actorName } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("works");

  const actorInfo =
    DUMMY_ACTORS.find((a) => a.name === actorName) || DUMMY_ACTORS[0];

  const calendarActor = favoriteActors.find((a) => a.name.includes(actorName));
  const calendarData = calendarActor
    ? calendarActor.castings.map((c) => ({
        ...c,
        dataType: "actor_cast",
        ownerId: calendarActor.id,
        title: c.showName,
      }))
    : [];

  return (
    <div className={styles.detailContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.profileImgPlaceholder}></div>
        <div className={styles.profileInfo}>
          <h2>{actorInfo?.name || actorName}</h2>
          <p>
            <span>직업</span> 연극/뮤지컬 배우
          </p>
          <p>
            <span>생년월일</span> 1995.03.29
          </p>
          <p>
            <span>사이트</span> 인스타, 트위터, 카페
          </p>
        </div>
      </div>

      <div className={styles.tabNavbar}>
        <div
          className={`${styles.tabItem} ${activeTab === "works" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("works")}
        >
          출연작품
        </div>
        <div
          className={`${styles.tabItem} ${activeTab === "schedule" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("schedule")}
        >
          스케줄
        </div>
      </div>

      <div className={styles.contentBody}>
        {activeTab === "works" ? (
          <div className={styles.worksGrid}>
            {actorInfo?.works.map((work) => (
              <div
                key={work.id}
                className={styles.workCard}
                onClick={() =>
                  navigate(`/search/plays/${work.title}/${work.season}`)
                }
              >
                <div className={styles.posterPlaceholder}></div>
                <div className={styles.workInfo}>
                  <h3>
                    <span className={styles.genreTag}>
                      {work.type === 1 ? "뮤지컬" : "연극"}
                    </span>{" "}
                    {work.title}
                  </h3>
                  <p>{work.period}</p>
                  <p className={styles.roleText}>{work.role} 역</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.calendarWrapper}>
            <Calendar isPlayCalendar={false} displayData={calendarData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ActorDetail;
