import React, { useState, useEffect } from "react";
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

export default function Calendar({
  displayData = [],
  isPlayCalendar = false,
  onDateClick,
  onUpdateSchedule,
  onAddSchedule,
  isAddModalOpen,
  setIsAddModalOpen,
  selectedDateForAdd,
  setSelectedDateForAdd,
  activeTab,
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 5, 24));
  const [modalItem, setModalItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [addFormData, setAddFormData] = useState({
    title: "",
    date: "",
    time: "19:30",
    genre: "뮤지컬",
    place: "",
    seat: "",
    price: "",
    shop: "",
    memo: "",
    isPending: false,
  });

  const [editFormData, setEditFormData] = useState({
    id: "",
    title: "",
    date: "",
    time: "",
    genre: "",
    place: "",
    seat: "",
    price: "",
    shop: "",
    memo: "",
    isPending: false,
    dataType: "personal",
    ownerId: "me",
    actors: "",
  });

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarDays = eachDayOfInterval({
    start: startOfWeek(monthStart),
    end: endOfWeek(monthEnd),
  });

  useEffect(() => {
    if (isAddModalOpen) {
      setAddFormData({
        title: "",
        date: selectedDateForAdd || format(new Date(), "yyyy-MM-dd"),
        time: "19:30",
        genre: "뮤지컬",
        place: "",
        seat: "",
        price: "",
        shop: "",
        memo: "",
        isPending: false,
      });
    }
  }, [isAddModalOpen, selectedDateForAdd]);

  const handleStartEdit = () => {
    if (!modalItem) return;

    setEditFormData({
      id: modalItem.id || "",
      title: modalItem.title || modalItem.showName || "",
      date: modalItem.date || "",
      time: modalItem.time || "",
      genre: modalItem.genre || "",
      place: modalItem.place || "",
      seat: modalItem.seat || "",
      price: modalItem.price || "",
      shop: modalItem.shop || "",
      memo: modalItem.memo || "",
      isPending: !!modalItem.isPending,
      dataType: modalItem.dataType || "personal",
      ownerId: modalItem.ownerId || "me",
      actors: modalItem.actors || "",
    });

    setIsEditMode(true);
  };

  const handleAddInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!addFormData.title.trim())
      return alert("일정 제목(공연명)을 입력해주세요.");

    onAddSchedule(addFormData);
    setIsAddModalOpen(false);
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editFormData.title.trim())
      return alert("일정 제목(공연명)을 입력해주세요.");

    onUpdateSchedule(editFormData);
    setModalItem({ ...editFormData });
    setIsEditMode(false);
  };

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
              onClick={() => {
                if (activeTab === "mine") onDateClick(dateStr);
              }}
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
                      <div
                        key={index}
                        className={styles.playItemBox}
                        onClick={(e) => e.stopPropagation()}
                      >
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
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalItem(item);
                          setIsEditMode(false);
                        }}
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
        <div
          className={styles.modalOverlay}
          onClick={() => {
            setModalItem(null);
            setIsEditMode(false);
          }}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalTop}>
              <span className={styles.modalDateInfo}>
                {isEditMode
                  ? "📝 일정 수정 모드"
                  : `${modalItem.date || ""} ${modalItem.time || ""}`}
              </span>
              <button
                className={styles.closeX}
                onClick={() => {
                  setModalItem(null);
                  setIsEditMode(false);
                }}
              >
                &times;
              </button>
            </div>

            {isEditMode ? (
              <form onSubmit={handleEditSubmit}>
                <input
                  type="text"
                  name="title"
                  className={styles.modalInputTitle}
                  value={editFormData.title}
                  onChange={handleEditInputChange}
                  placeholder="공연명/일정 제목"
                  required
                />
                <hr />

                <div className={styles.modalTable}>
                  <div className={styles.modalRow}>
                    <span className={styles.fixedKey}>날짜/시간</span>
                    <div style={{ display: "flex", gap: "4px", width: "100%" }}>
                      <input
                        type="date"
                        name="date"
                        value={editFormData.date}
                        onChange={handleEditInputChange}
                        className={styles.inlineInput}
                      />
                      <input
                        type="time"
                        name="time"
                        value={editFormData.time}
                        onChange={handleEditInputChange}
                        className={styles.inlineInput}
                      />
                    </div>
                  </div>
                  <div className={styles.modalRow}>
                    <span className={styles.fixedKey}>장르</span>
                    <input
                      type="text"
                      name="genre"
                      value={editFormData.genre}
                      onChange={handleEditInputChange}
                      className={styles.inlineInput}
                    />
                  </div>
                  <div className={styles.modalRow}>
                    <span className={styles.fixedKey}>상태</span>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        name="isPending"
                        checked={editFormData.isPending}
                        onChange={handleEditInputChange}
                      />
                      스케줄 미정 여부 ([미정] 표시)
                    </label>
                  </div>
                  <div className={styles.modalRow}>
                    <span className={styles.fixedKey}>출연진</span>
                    <input
                      type="text"
                      name="actors"
                      value={editFormData.actors}
                      onChange={handleEditInputChange}
                      className={styles.inlineInput}
                      placeholder="출연 배우"
                    />
                  </div>
                  <div className={styles.modalRow}>
                    <span className={styles.fixedKey}>장소</span>
                    <input
                      type="text"
                      name="place"
                      value={editFormData.place}
                      onChange={handleEditInputChange}
                      className={styles.inlineInput}
                      placeholder="공연장"
                    />
                  </div>
                  <div className={styles.modalRow}>
                    <span className={styles.fixedKey}>좌석</span>
                    <input
                      type="text"
                      name="seat"
                      value={editFormData.seat}
                      onChange={handleEditInputChange}
                      className={styles.inlineInput}
                    />
                  </div>
                  <div className={styles.modalRow}>
                    <span className={styles.fixedKey}>금액</span>
                    <input
                      type="text"
                      name="price"
                      value={editFormData.price}
                      onChange={handleEditInputChange}
                      className={styles.inlineInput}
                    />
                  </div>
                  <div className={styles.modalRow}>
                    <span className={styles.fixedKey}>구매처</span>
                    <input
                      type="text"
                      name="shop"
                      value={editFormData.shop}
                      onChange={handleEditInputChange}
                      className={styles.inlineInput}
                    />
                  </div>
                  <div className={styles.modalRow}>
                    <span className={styles.fixedKey}>메모</span>
                    <textarea
                      name="memo"
                      value={editFormData.memo}
                      onChange={handleEditInputChange}
                      className={styles.modalTextarea}
                      rows={3}
                    />
                  </div>
                </div>

                <div className={styles.modalFooter}>
                  <button type="submit" className={styles.saveBtn}>
                    저장 완료
                  </button>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={() => setIsEditMode(false)}
                  >
                    취소
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h2 className={styles.modalMainTitle}>
                  {modalItem.dataType === "actor_cast"
                    ? `[배우 스케줄] ${modalItem.showName || ""}`
                    : modalItem.title || modalItem.showName || ""}
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

                <div className={styles.modalFooter}>
                  {(modalItem.ownerId === "me" || activeTab === "mine") && (
                    <button
                      type="button"
                      className={styles.editBtn}
                      onClick={handleStartEdit}
                    >
                      일정 수정하기
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalTop}>
              <span className={styles.modalDateInfo}>나의 새 스케줄 등록</span>
              <button
                className={styles.closeX}
                onClick={() => setIsAddModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <input
                type="text"
                name="title"
                className={styles.modalInputTitle}
                value={addFormData.title}
                onChange={handleAddInputChange}
                placeholder="공연명 또는 일정 제목 입력"
                required
              />
              <hr />
              <div className={styles.modalTable}>
                <div className={styles.modalRow}>
                  <span className={styles.fixedKey}>날짜/시간</span>
                  <div style={{ display: "flex", gap: "4px", width: "100%" }}>
                    <input
                      type="date"
                      name="date"
                      value={addFormData.date}
                      onChange={handleAddInputChange}
                      className={styles.inlineInput}
                    />
                    <input
                      type="time"
                      name="time"
                      value={addFormData.time}
                      onChange={handleAddInputChange}
                      className={styles.inlineInput}
                    />
                  </div>
                </div>
                <div className={styles.modalRow}>
                  <span className={styles.fixedKey}>장르</span>
                  <input
                    type="text"
                    name="genre"
                    value={addFormData.genre}
                    onChange={handleAddInputChange}
                    className={styles.inlineInput}
                  />
                </div>
                <div className={styles.modalRow}>
                  <span className={styles.fixedKey}>상태</span>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="isPending"
                      checked={addFormData.isPending}
                      onChange={handleAddInputChange}
                    />
                    일정 미정 여부 ([미정] 표기)
                  </label>
                </div>
                <div className={styles.modalRow}>
                  <span className={styles.fixedKey}>출연진</span>
                  <input
                    type="text"
                    name="actors"
                    value={addFormData.actors || ""}
                    onChange={handleAddInputChange}
                    className={styles.inlineInput}
                    placeholder="캐스팅 정보"
                  />
                </div>
                <div className={styles.modalRow}>
                  <span className={styles.fixedKey}>장소</span>
                  <input
                    type="text"
                    name="place"
                    value={addFormData.place}
                    onChange={handleAddInputChange}
                    className={styles.inlineInput}
                    placeholder="공연장"
                  />
                </div>
                <div className={styles.modalRow}>
                  <span className={styles.fixedKey}>좌석</span>
                  <input
                    type="text"
                    name="seat"
                    value={addFormData.seat}
                    onChange={handleAddInputChange}
                    className={styles.inlineInput}
                  />
                </div>
                <div className={styles.modalRow}>
                  <span className={styles.fixedKey}>메모</span>
                  <textarea
                    name="memo"
                    value={addFormData.memo}
                    onChange={handleAddInputChange}
                    className={styles.modalTextarea}
                    placeholder="기타 메모 내용을 적어주세요."
                    rows={2}
                  />
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button type="submit" className={styles.saveBtn}>
                  등록 완료
                </button>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setIsAddModalOpen(false)}
                >
                  닫기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
