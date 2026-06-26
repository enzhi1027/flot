import React, { useState } from "react";
import styles from "./StampSection.module.css";
import AddStampModal from "./AddStampModal";
import StampBoardDetail from "./StampBoardDetail";

const dummyStamps = [
  {
    id: 1,
    title: "나르치스와 골드문트",
    type: "MUSICAL",
    boards: [
      { id: 101, total: 9, current: 9, isCompleted: true },
      { id: 102, total: 9, current: 9, isCompleted: true },
      { id: 103, total: 9, current: 7, isCompleted: false },
      { id: 104, total: 9, current: 2, isCompleted: false },
      { id: 105, total: 9, current: 5, isCompleted: false },
    ],
  },
  {
    id: 2,
    title: "배니싱",
    type: "MUSICAL",
    boards: [
      { id: 201, total: 5, current: 5, isCompleted: true },
      { id: 202, total: 5, current: 5, isCompleted: true },
      { id: 203, total: 5, current: 3, isCompleted: false },
      { id: 204, total: 5, current: 2, isCompleted: false },
    ],
  },
  {
    id: 3,
    title: "카포네 트릴로지",
    type: "PLAY",
    boards: [
      { id: 301, total: 5, current: 3, isCompleted: false },
      { id: 302, total: 5, current: 1, isCompleted: false },
    ],
  },
  {
    id: 4,
    title: "시데레우스",
    type: "MUSICAL",
    boards: [{ id: 401, total: 10, current: 0, isCompleted: false }],
  },
];

const StampSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [viewMode, setViewMode] = useState("LIST");
  const [selectedShowId, setSelectedShowId] = useState(null);

  const handleAddSuccess = (newStampData) => {
    alert(
      `'${newStampData.title}' 도장판 추가 성공! 서버로 데이터를 보냅니다.`,
    );
    setIsModalOpen(false);
  };

  const handleShowClick = (id) => {
    setSelectedShowId(id);
    setViewMode("DETAIL");
  };

  const handleBackToList = () => {
    setViewMode("LIST");
    setSelectedShowId(null);
  };

  if (viewMode === "DETAIL" && selectedShowId !== null) {
    const selectedShowData = dummyStamps.find(
      (item) => item.id === selectedShowId,
    );

    return (
      <StampBoardDetail showData={selectedShowData} onBack={handleBackToList} />
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.chartContainer}>
        {dummyStamps.map((item) => {
          const totalBoardsCount = item.boards.length;
          const completedBoardsCount = item.boards.filter(
            (b) => b.isCompleted,
          ).length;

          const sortedBoards = [...item.boards]
            .map((board, originalIndex) => ({ ...board, originalIndex }))
            .sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));

          return (
            <div
              key={item.id}
              className={styles.chartRow}
              onClick={() => handleShowClick(item.id)}
            >
              <div className={styles.showMeta}>
                <h4 className={styles.showTitle}>{item.title}</h4>
                <div className={styles.summaryBadge}>
                  <span>총 {totalBoardsCount}판 중</span>
                  <span className={styles.highlight}>
                    {completedBoardsCount}판 완찍
                  </span>
                </div>
              </div>

              <div className={styles.boardChartList}>
                {sortedBoards.map((board) => {
                  const progressPercent = Math.min(
                    (board.current / board.total) * 100,
                    100,
                  );

                  return (
                    <div
                      key={board.id}
                      className={`${styles.chartItem} ${board.isCompleted ? styles.completedItem : ""}`}
                    >
                      <div className={styles.itemHeader}>
                        <span className={styles.boardIndex}>
                          {board.originalIndex + 1}번판
                        </span>
                        <span className={styles.progressText}>
                          {board.isCompleted
                            ? "완찍"
                            : `${board.current}/${board.total}`}
                        </span>
                      </div>

                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.actionArea}>
        <button
          className={styles.addButton}
          onClick={() => setIsModalOpen(true)}
        >
          <span className={styles.plusIcon}>+</span>
          추가하기
        </button>
      </div>

      {isModalOpen && (
        <AddStampModal
          onClose={() => setIsModalOpen(false)}
          onAddSuccess={handleAddSuccess}
        />
      )}
    </div>
  );
};

export default StampSection;
