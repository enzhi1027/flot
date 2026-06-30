import React, { useState } from "react";
import Calendar from "../../components/calender/Calendar";
import {
  myData,
  favoriteActors,
  favoriteShows,
  myFriends,
  getPersonColor,
} from "../../components/calender/calendarMockData";
import styles from "./CalendarMain.module.css";
import AddIcon from "@mui/icons-material/Add";

const CalendarMain = () => {
  const [activeTab, setActiveTab] = useState("mine");

  const [mySchedules, setMySchedules] = useState(myData.schedules);

  const [selectedActors, setSelectedActors] = useState([
    favoriteActors[0]?.id || "",
  ]);
  const [selectedShow, setSelectedShow] = useState(favoriteShows[0]?.id || "");
  const [showMyScheduleWithFriend, setShowMyScheduleWithFriend] =
    useState(false);
  const [friendMixSelected, setFriendMixSelected] = useState([
    myFriends[0]?.id || "",
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDateForAdd, setSelectedDateForAdd] = useState("");

  const handleActorToggle = (id) => {
    setSelectedActors((prev) =>
      prev.includes(id)
        ? prev.length === 1
          ? prev
          : prev.filter((i) => i !== id)
        : [...prev, id],
    );
  };

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

  const handleAddSchedule = (newSchedule) => {
    setMySchedules((prev) => [
      ...prev,
      { ...newSchedule, id: Date.now().toString() },
    ]);
  };

  const handleUpdateSchedule = (updatedSchedule) => {
    setMySchedules((prev) =>
      prev.map((s) => (s.id === updatedSchedule.id ? updatedSchedule : s)),
    );
  };

  const handleOpenAddModal = (dateStr) => {
    setSelectedDateForAdd(dateStr || new Date().toISOString().split("T")[0]);
    setIsAddModalOpen(true);
  };

  let currentDisplayData = [];

  if (activeTab === "mine") {
    currentDisplayData = mySchedules.map((s) => ({
      ...s,
      dataType: "personal",
      ownerId: "me",
    }));
  } else if (activeTab === "actor") {
    favoriteActors.forEach((actor) => {
      if (selectedActors.includes(actor.id)) {
        currentDisplayData.push(
          ...actor.castings.map((c) => ({
            ...c,
            dataType: "actor_cast",
            ownerId: actor.id,
            title: c.showName,
          })),
        );
      }
    });
  } else if (activeTab === "friend") {
    if (showMyScheduleWithFriend) {
      currentDisplayData.push(
        ...mySchedules.map((s) => ({
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
      <div className={styles.topMenuBar}>
        <div className={styles.tabNavbar}>
          {[
            { id: "mine", label: "MY" },
            { id: "show", label: "애정극" },
            { id: "actor", label: "애배" },
            { id: "friend", label: "친구" },
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
        {activeTab === "mine" && (
          <button
            className={styles.addScheduleMainBtn}
            onClick={() => handleOpenAddModal("")}
          >
            <AddIcon style={{ fontSize: "16px", color: "inherit" }} />
            나의 새 일정 등록
          </button>
        )}
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
                    className={`${styles.rowBtn} ${selectedActors.includes(a.id) ? styles.activeRow : ""}`}
                    onClick={() => handleActorToggle(a.id)}
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
                  <button
                    key={f.id}
                    className={`${styles.rowBtn} ${friendMixSelected.includes(f.id) ? styles.activeRow : ""}`}
                    onClick={() => handleFriendMixToggle(f.id)}
                  >
                    <span
                      className={styles.colorCircle}
                      style={{ backgroundColor: getPersonColor(f.id).bg }}
                    />
                    {f.name}
                  </button>
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
            onDateClick={handleOpenAddModal}
            onUpdateSchedule={handleUpdateSchedule}
            onAddSchedule={handleAddSchedule}
            isAddModalOpen={isAddModalOpen}
            setIsAddModalOpen={setIsAddModalOpen}
            selectedDateForAdd={selectedDateForAdd}
            setSelectedDateForAdd={setSelectedDateForAdd}
            activeTab={activeTab}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarMain;
