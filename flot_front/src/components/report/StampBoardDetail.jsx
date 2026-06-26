import React, { useState, useEffect } from "react";
import styles from "./StampBoardDetail.module.css";

const SIMULATED_NOW = new Date("2026-06-25T16:30:00");
const PUZZLE_IMAGE_URL =
  "https://pickspot.kr/wp-content/uploads/2025/11/%EB%82%A0%EA%B3%A8-%ED%8F%AC%EC%8A%A4%ED%84%B0.jpeg";

const initialBoardDetail = {
  title: "나르치스와 골드문트",
  type: "MUSICAL",
  boards: [
    {
      id: 101,
      boardIndex: 1,
      total: 5,
      bgPosX: 50,
      bgPosY: 50,
      bgScale: 100,
      isEditing: false,
      stamps: [
        { time: "2026-06-20 14:00" },
        { time: "2026-06-25 14:00" },
        { time: "2026-06-25 20:00" },
        { time: null },
        { time: null },
      ],
      benefits: [
        {
          id: "b101_1",
          name: "3회차: 할인쿠폰",
          benefitType: "COUPON",
          isClaimed: true,
        },
        {
          id: "b101_2",
          name: "5회차: 폴라로이드",
          benefitType: "GOODS",
          isClaimed: false,
        },
      ],
    },
    {
      id: 102,
      boardIndex: 2,
      total: 6,
      bgPosX: 50,
      bgPosY: 50,
      bgScale: 100,
      isEditing: false,
      stamps: Array(6).fill({ time: null }),
      benefits: [
        {
          id: "b102_1",
          name: "3회차: 할인쿠폰(1/2)",
          benefitType: "COUPON",
          isClaimed: false,
        },
        {
          id: "b102_2",
          name: "3회차: 할인쿠폰(2/2)",
          benefitType: "COUPON",
          isClaimed: false,
        },
        {
          id: "b102_3",
          name: "6회차: OST 실황 CD",
          benefitType: "GOODS",
          isClaimed: false,
        },
      ],
    },
  ],
};

const formatStampTime = (timeStr) => {
  if (!timeStr) return { date: "", time: "" };
  try {
    const [datePart, timePart] = timeStr.split(" ");
    const [_, month, day] = datePart.split("-");
    const [hour] = timePart.split(":");
    return {
      date: `${month}.${day}`,
      time: `${hour}시`,
    };
  } catch (e) {
    return { date: "", time: "" };
  }
};

const StampManageModal = ({ stamp, onBack, onUpdate, onDelete, index }) => {
  const [dateTime, setDateTime] = useState(stamp?.time || "");
  const handleUpdate = () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:00$/;
    if (!dateRegex.test(dateTime)) {
      alert("올바른 형식(YYYY-MM-DD HH:00)으로 입력해주세요.");
      return;
    }
    onUpdate(dateTime);
  };
  return (
    <div className={styles.modalOverlay} onClick={onBack}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h5>{index + 1}번 퍼즐 조각 관리</h5>
          <button className={styles.closeModal} onClick={onBack}>
            ×
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.inputGroup}>
            <label>적립 날짜 및 시간</label>
            <input
              type="text"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              placeholder="YYYY-MM-DD HH:00"
            />
          </div>
        </div>
        <div className={styles.modalActions}>
          <button className={styles.deleteButton} onClick={onDelete}>
            삭제
          </button>
          <div className={styles.rightActions}>
            <button className={styles.cancelButton} onClick={onBack}>
              취소
            </button>
            <button className={styles.updateButton} onClick={handleUpdate}>
              수정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StampRegisterModal = ({ onBack, onRegister }) => {
  const [dateTime, setDateTime] = useState("");
  const [stampCount, setStampCount] = useState(1);
  const handleRegister = () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:00$/;
    if (!dateRegex.test(dateTime)) {
      alert("올바른 형식(YYYY-MM-DD HH:00)으로 입력해주세요.");
      return;
    }
    onRegister(dateTime, stampCount);
  };
  return (
    <div className={styles.modalOverlay} onClick={onBack}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h5>퍼즐 등록</h5>
          <button className={styles.closeModal} onClick={onBack}>
            ×
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.inputGroup}>
            <label>적립 날짜 및 시간</label>
            <input
              type="text"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              placeholder="YYYY-MM-DD HH:00"
            />
          </div>
          <div className={styles.inputGroup}>
            <label>등록할 퍼즐 개수</label>
            <input
              type="number"
              value={stampCount}
              onChange={(e) => setStampCount(parseInt(e.target.value) || 1)}
              min="1"
            />
          </div>
        </div>
        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onBack}>
            취소
          </button>
          <button className={styles.updateButton} onClick={handleRegister}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

const StampBoardDetail = ({ onBack }) => {
  const [boardDetail, setBoardDetail] = useState(initialBoardDetail);
  const [isImageLong, setIsImageLong] = useState(true);

  const [manageModal, setManageModal] = useState({
    isOpen: false,
    boardId: null,
    stampIndex: null,
    stamp: null,
  });
  const [registerModal, setRegisterModal] = useState({
    isOpen: false,
    boardId: null,
  });

  const checkImageRatio = () => {
    const img = new Image();
    img.src = PUZZLE_IMAGE_URL;
    img.onload = () => {
      const imgRatio = img.width / img.height;
      const containerRatio = 300 / 200;

      if (imgRatio < containerRatio) {
        setIsImageLong(true);
      } else {
        setIsImageLong(false);
      }
    };
  };

  useEffect(() => {
    checkImageRatio();
  }, []);

  const getStampState = (stampTime) => {
    if (!stampTime) return "EMPTY";
    return new Date(stampTime) <= SIMULATED_NOW ? "STAMPED" : "PREVIEW";
  };

  const handleStampClick = (boardId, stampIndex, status) => {
    if (status === "STAMPED" || status === "PREVIEW") {
      const board = boardDetail.boards.find((b) => b.id === boardId);
      setManageModal({
        isOpen: true,
        boardId,
        stampIndex,
        stamp: board.stamps[stampIndex],
      });
    } else {
      setRegisterModal({ isOpen: true, boardId });
    }
  };

  const updateStampTime = (boardId, stampIndex, newTime) => {
    setBoardDetail((prev) => ({
      ...prev,
      boards: prev.boards.map((b) => {
        if (b.id !== boardId) return b;
        const newStamps = [...b.stamps];
        newStamps[stampIndex] = { time: newTime };
        return { ...b, stamps: newStamps };
      }),
    }));
  };

  const handleToggleBenefit = (boardId, benefitId) => {
    setBoardDetail((prev) => ({
      ...prev,
      boards: prev.boards.map((b) => {
        if (b.id !== boardId) return b;
        return {
          ...b,
          benefits: b.benefits.map((benefit) =>
            benefit.id === benefitId
              ? { ...benefit, isClaimed: !benefit.isClaimed }
              : benefit,
          ),
        };
      }),
    }));
  };

  const handlePositionChange = (boardId, axis, value) => {
    const intValue = parseInt(value, 10) || 0;

    setBoardDetail((prev) => ({
      ...prev,
      boards: prev.boards.map((b) => {
        if (b.id !== boardId) return b;

        if (axis === "bgScale") {
          const safeScale = intValue < 100 ? 100 : intValue;
          return { ...b, bgScale: safeScale };
        }

        return { ...b, [axis]: intValue };
      }),
    }));
  };

  const handleToggleEditMode = (boardId) => {
    setBoardDetail((prev) => ({
      ...prev,
      boards: prev.boards.map((b) =>
        b.id === boardId ? { ...b, isEditing: !b.isEditing } : b,
      ),
    }));
  };

  const getBenefitText = (type, isClaimed) => {
    if (type === "COUPON") return isClaimed ? "사용함" : "미사용";
    return isClaimed ? "수령함" : "미수령";
  };

  return (
    <div className={styles.detailWrapper}>
      <div className={styles.headerArea}>
        <button className={styles.backButton} onClick={onBack}>
          ← 이전으로
        </button>
        <div className={styles.titleInfo}>
          <span className={styles.typeBadge}>
            {boardDetail.type === "MUSICAL" ? "뮤지컬" : "연극"}
          </span>
          <h2 className={styles.showTitle}>{boardDetail.title}</h2>
        </div>
      </div>

      <div className={styles.ticketGridContainer}>
        {boardDetail.boards.map((board) => {
          const stampedCount = board.stamps.filter(
            (s) => getStampState(s.time) === "STAMPED",
          ).length;

          const sizeString = isImageLong
            ? `${board.bgScale}% auto`
            : `auto ${board.bgScale}%`;

          const boardDisplayStyle = {
            backgroundImage: `url(${PUZZLE_IMAGE_URL})`,
            backgroundPosition: `${board.bgPosX}% ${board.bgPosY}%`,
            backgroundSize: sizeString,
          };

          return (
            <div key={board.id} className={styles.ticketCard}>
              <div className={styles.stampZone}>
                <div className={styles.ticketHeader}>
                  <span className={styles.boardNumber}>
                    {board.boardIndex}번판 (퍼즐형)
                  </span>
                  <div className={styles.headerRightActions}>
                    <span className={styles.boardCount}>
                      ({stampedCount} / {board.total})
                    </span>
                    <button
                      className={`${styles.editModeButton} ${board.isEditing ? styles.activeEdit : ""}`}
                      onClick={() => handleToggleEditMode(board.id)}
                    >
                      {board.isEditing ? "수정 완료" : "사진 수정"}
                    </button>
                  </div>
                </div>

                <div
                  className={styles.puzzleBoardDisplay}
                  style={boardDisplayStyle}
                >
                  {board.stamps.map((stamp, index) => {
                    const status = getStampState(stamp.time);
                    const { date, time } = formatStampTime(stamp.time);

                    return (
                      <div
                        key={index}
                        className={`${styles.puzzleTile} ${
                          status === "EMPTY"
                            ? styles.tileLocked
                            : status === "PREVIEW"
                              ? styles.tilePreview
                              : styles.tileStamped
                        }`}
                        onClick={() =>
                          handleStampClick(board.id, index, status)
                        }
                      >
                        {status === "PREVIEW" && (
                          <div className={styles.tileDateTime}>
                            <span className={styles.stampDate}>{date}</span>
                            <span className={styles.stampTime}>{time}</span>
                          </div>
                        )}

                        {status !== "PREVIEW" && (
                          <span className={styles.tileNumber}>{index + 1}</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {board.isEditing && (
                  <div className={styles.imageControllerArea}>
                    <div className={styles.controllerRow}>
                      <div className={styles.controllerRowHeader}>
                        <label>사진 좌우 위치 조정 ({board.bgPosX}%)</label>
                        <button
                          className={styles.changeImagePlaceholderBtn}
                          onClick={() =>
                            alert(
                              "백엔드 연동 시 사진 업로드 팝업이 연동될 자리입니다.",
                            )
                          }
                        >
                          사진 변경
                        </button>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={board.bgPosX}
                        onChange={(e) =>
                          handlePositionChange(
                            board.id,
                            "bgPosX",
                            e.target.value,
                          )
                        }
                      />
                    </div>

                    <div className={styles.controllerRow}>
                      <label>사진 상하 위치 조정 ({board.bgPosY}%)</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={board.bgPosY}
                        onChange={(e) =>
                          handlePositionChange(
                            board.id,
                            "bgPosY",
                            e.target.value,
                          )
                        }
                      />
                    </div>

                    <div className={styles.controllerRow}>
                      <label>
                        사진 크기 조절 (확대/축소) ({board.bgScale}%)
                      </label>
                      <input
                        type="range"
                        min="100"
                        max="400"
                        value={board.bgScale}
                        onChange={(e) =>
                          handlePositionChange(
                            board.id,
                            "bgScale",
                            e.target.value,
                          )
                        }
                      />
                      <span className={styles.scaleHelpText}>
                        * 기준 상태(100%) 미만으로는 축소할 수 없습니다.
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.ticketDivider}>
                <div className={styles.notchTop}></div>
                <div className={styles.dashedLine}></div>
                <div className={styles.notchBottom}></div>
              </div>

              <div className={styles.benefitZone}>
                <div className={styles.benefitHeader}>BENEFIT</div>
                <div className={styles.benefitItemList}>
                  {(() => {
                    const groups = {};
                    board.benefits.forEach((benefit) => {
                      const [round, ...nameParts] = benefit.name.split(": ");
                      const displayName = nameParts.join(": ") || benefit.name;

                      if (!groups[round]) groups[round] = [];
                      groups[round].push({ ...benefit, displayName });
                    });

                    return Object.entries(groups).map(([round, items]) => (
                      <div key={round} className={styles.benefitGroup}>
                        <div className={styles.benefitRoundTitle}>{round}</div>
                        <div className={styles.benefitGroupItems}>
                          {items.map((item) => (
                            <div
                              key={item.id}
                              className={`${styles.benefitItemRow} ${item.isClaimed ? styles.claimedRow : ""}`}
                              onClick={() =>
                                handleToggleBenefit(board.id, item.id)
                              }
                            >
                              <span
                                className={`${styles.customCheckbox} ${item.isClaimed ? styles.checked : ""}`}
                              >
                                {item.isClaimed && "✓"}
                              </span>
                              <span className={styles.benefitLabel}>
                                {item.displayName}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {manageModal.isOpen && (
        <StampManageModal
          stamp={manageModal.stamp}
          index={manageModal.stampIndex}
          onBack={() =>
            setManageModal({
              isOpen: false,
              boardId: null,
              stampIndex: null,
              stamp: null,
            })
          }
          onUpdate={(time) => {
            updateStampTime(manageModal.boardId, manageModal.stampIndex, time);
            setManageModal({
              isOpen: false,
              boardId: null,
              stampIndex: null,
              stamp: null,
            });
          }}
          onDelete={() => {
            updateStampTime(manageModal.boardId, manageModal.stampIndex, null);
            setManageModal({
              isOpen: false,
              boardId: null,
              stampIndex: null,
              stamp: null,
            });
          }}
        />
      )}

      {registerModal.isOpen && (
        <StampRegisterModal
          onBack={() => setRegisterModal({ isOpen: false, boardId: null })}
          onRegister={(time, count) => {
            setBoardDetail((prev) => ({
              ...prev,
              boards: prev.boards.map((b) => {
                if (b.id !== registerModal.boardId) return b;
                const newStamps = [...b.stamps];
                let filled = 0;
                for (let i = 0; i < newStamps.length && filled < count; i++) {
                  if (!newStamps[i].time) {
                    newStamps[i] = { time };
                    filled++;
                  }
                }
                return { ...b, stamps: newStamps };
              }),
            }));
            setRegisterModal({ isOpen: false, boardId: null });
          }}
        />
      )}
    </div>
  );
};

export default StampBoardDetail;
