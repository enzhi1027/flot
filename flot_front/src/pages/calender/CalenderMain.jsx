import React, { useState } from "react";
import Calendar from "../../components/calender/Calendar";
import {
  myData,
  favoriteActors,
  favoriteShows,
  myFriends,
  getPersonColor,
} from "../../components/calender/mockData";
import styles from "./CalendarMain.module.css";

const CalendarMain = () => {
  const [activeTab, setActiveTab] = useState("mine");

  const [selectedActor, setSelectedActor] = useState(
    favoriteActors[0]?.id || "",
  );
  const [selectedShow, setSelectedShow] = useState(favoriteShows[0]?.id || "");

  const [showMyScheduleWithFriend, setShowMyScheduleWithFriend] =
    useState(false);

  const [friendMixSelected, setFriendMixSelected] = useState([
    myFriends[0]?.id || "",
  ]);

  const handleFriendMixToggle = (id) => {
    setFriendMixSelected((prev) =>
      prev.includes(id)
        ? prev.length === 1
          ? prev
          : prev.filter((i) => i !== id)
        : prev.length >= 4
          ? (alert("최대 4명까지 조합 가능합니다."), prev)
          : [...prev, id],
    );
  };

  let currentDisplayData = [];

  if (activeTab === "mine") {
    currentDisplayData = myData.schedules.map((s) => ({
      ...s,
      dataType: "personal",
      ownerId: "me",
    }));
  } else if (activeTab === "actor") {
    const actorObj = favoriteActors.find((a) => a.id === selectedActor);
    currentDisplayData = actorObj
      ? actorObj.castings.map((c) => ({
          ...c,
          dataType: "actor_cast",
          ownerId: selectedActor,
          title: c.showName,
        }))
      : [];
  } else if (activeTab === "friend") {
    if (showMyScheduleWithFriend) {
      currentDisplayData.push(
        ...myData.schedules.map((s) => ({
          ...s,
          dataType: "personal",
          ownerId: "me",
        })),
      );
    }

    myFriends.forEach((f) => {
      if (friendMixSelected.includes(f.id)) {
        currentDisplayData.push(
          ...f.schedules.map((s) => ({
            ...s,
            dataType: "personal",
            ownerId: f.id,
          })),
        );
      }
    });
  } else if (activeTab === "show") {
    currentDisplayData =
      favoriteShows
        .find((s) => s.id === selectedShow)
        ?.entireSchedules.map((s) => ({ ...s, dataType: "show_entire" })) || [];
  }

  return (
    <div className={styles.calendarMainContainer}>
      <div className={styles.tabNavbar}>
        {[
          { id: "mine", label: "MY" },
          { id: "show", label: "애정극" },
          { id: "actor", label: "애배" },
          { id: "friend", label: "친구 일정" },
        ].map((tab) => (
          <div
            key={tab.id}
            className={`${styles.tabItem} ${activeTab === tab.id ? styles.activeTab : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      <div className={styles.contentBody}>
        {activeTab !== "mine" && (
          <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              {activeTab === "actor" && "배우 목록"}
              {activeTab === "show" && "찜한 극 목록"}
              {activeTab === "friend" && "친구 목록"}
            </div>

            <div
              className={`${styles.sidebarList} ${activeTab === "friend" ? styles.scrollableList : ""}`}
            >
              {activeTab === "actor" &&
                favoriteActors.map((a) => (
                  <button
                    key={a.id}
                    className={`${styles.rowBtn} ${selectedActor === a.id ? styles.activeRow : ""}`}
                    onClick={() => setSelectedActor(a.id)}
                  >
                    <span
                      className={styles.colorCircle}
                      style={{ backgroundColor: getPersonColor(a.id).bg }}
                    />
                    {a.name}
                  </button>
                ))}

              {activeTab === "show" &&
                favoriteShows.map((s) => (
                  <button
                    key={s.id}
                    className={`${styles.rowBtn} ${selectedShow === s.id ? styles.activeRow : ""}`}
                    onClick={() => setSelectedShow(s.id)}
                  >
                    {s.name}
                  </button>
                ))}

              {activeTab === "friend" &&
                myFriends.map((f) => (
                  <label
                    key={f.id}
                    className={`${styles.checkRow} ${friendMixSelected.includes(f.id) ? styles.activeCheck : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={friendMixSelected.includes(f.id)}
                      onChange={() => handleFriendMixToggle(f.id)}
                    />
                    <span
                      className={styles.colorCircle}
                      style={{ backgroundColor: getPersonColor(f.id).bg }}
                    />
                    <span>{f.name}</span>
                  </label>
                ))}
            </div>

            {activeTab === "friend" && (
              <div className={styles.myCombineWrapper}>
                <button
                  className={`${styles.combineBtn} ${showMyScheduleWithFriend ? styles.combineBtnActive : ""}`}
                  onClick={() =>
                    setShowMyScheduleWithFriend(!showMyScheduleWithFriend)
                  }
                >
                  {showMyScheduleWithFriend
                    ? "🟢 내 스케줄 겹쳐보는 중"
                    : "⚪ 내 스케줄 합쳐보기"}
                </button>
              </div>
            )}
          </div>
        )}

        <div className={styles.calendarContainer}>
          <Calendar
            isPlayCalendar={activeTab === "show"}
            displayData={currentDisplayData}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarMain;
