import React, { useState, useEffect } from "react";
import styles from "./AddStampModal.module.css";

const BENEFIT_TYPES = {
  POLA: "POLA",
  DISCOUNT: "DISCOUNT",
  OST: "OST",
  PHOTOBOOK: "PHOTOBOOK",
  ETC: "ETC",
};

const BENEFIT_NAMES = {
  [BENEFIT_TYPES.POLA]: "폴라로이드",
  [BENEFIT_TYPES.DISCOUNT]: "할인쿠폰",
  [BENEFIT_TYPES.OST]: "OST",
  [BENEFIT_TYPES.PHOTOBOOK]: "포토북",
  [BENEFIT_TYPES.ETC]: "기타",
};

const BenefitDetailPopup = ({ onClose, onSave, benefitData }) => {
  const [percent, setPercent] = useState(benefitData?.percent || "");
  const [count, setCount] = useState(benefitData?.count || "");

  const handleSave = () => {
    if (!percent || !count) {
      alert("할인 퍼센트와 개수를 입력해주세요.");
      return;
    }
    onSave({ percent: parseInt(percent), count: parseInt(count) });
  };

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <h5>할인쿠폰 상세 정보</h5>
        <div className={styles.inputGroup}>
          <label>할인 퍼센트 (%)</label>
          <input
            type="number"
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
            placeholder="예) 50"
          />
        </div>
        <div className={styles.inputGroup}>
          <label>개수</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            placeholder="예) 2"
          />
        </div>
        <div className={styles.popupActions}>
          <button onClick={onClose}>취소</button>
          <button onClick={handleSave}>저장</button>
        </div>
      </div>
    </div>
  );
};

const AddStampModal = ({ onClose, onAddSuccess }) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [newShowTitle, setNewShowTitle] = useState("");
  const [newShowType, setNewShowType] = useState("MUSICAL");
  const [newShowTotalStamps, setNewShowTotalStamps] = useState("");
  const [newShowBenefits, setNewShowBenefits] = useState({});
  const [benefitDetailPopup, setBenefitDetailPopup] = useState(null);

  const showDummyDatabase = [
    { id: 201, title: "나르치스와 골드문트", type: "MUSICAL" },
    { id: 202, title: "배니싱", type: "MUSICAL" },
    { id: 203, title: "카포네 트릴로지", type: "PLAY" },
    { id: 204, title: "시데레우스", type: "MUSICAL" },
    { id: 205, title: "트레이스 유", type: "MUSICAL" },
    { id: 206, title: "사의 찬미", type: "MUSICAL" },
    { id: 207, title: "랭보", type: "MUSICAL" },
    { id: 208, title: "연극 오피니언즈", type: "PLAY" },
    { id: 209, title: "뮤지컬 미오 프라텔로", type: "MUSICAL" },
    { id: 210, title: "더 테일 에이프릴 풀스", type: "MUSICAL" },
  ];

  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (trimmed.length >= 1) {
      const results = showDummyDatabase.filter((show) =>
        show.title
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(trimmed.toLowerCase().replace(/\s+/g, "")),
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSelectShow = (show) => {
    onAddSuccess({
      title: show.title,
      type: show.type,
      totalStamps: 9,
      benefits: {},
    });
  };

  const handleStartAddNew = () => {
    setNewShowTitle(searchQuery);
    setIsAddingNew(true);
  };

  const handleBenefitChange = (round, benefitType, checked) => {
    if (benefitType === BENEFIT_TYPES.DISCOUNT && checked) {
      setBenefitDetailPopup({
        type: benefitType,
        round,
        data: newShowBenefits[round]?.[benefitType],
      });
    } else {
      setNewShowBenefits((prev) => ({
        ...prev,
        [round]: { ...prev[round], [benefitType]: checked },
      }));
    }
  };

  const handleSaveBenefitDetail = (detailData) => {
    setNewShowBenefits((prev) => ({
      ...prev,
      [benefitDetailPopup.round]: {
        ...prev[benefitDetailPopup.round],
        [benefitDetailPopup.type]: detailData,
      },
    }));
    setBenefitDetailPopup(null);
  };

  const handleRegisterNewShow = () => {
    if (!newShowTitle || !newShowTotalStamps) {
      alert("극 제목과 총 회차를 입력해주세요.");
      return;
    }
    onAddSuccess({
      title: newShowTitle,
      type: newShowType,
      totalStamps: parseInt(newShowTotalStamps),
      benefits: newShowBenefits,
    });
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h4>도장판 추가하기</h4>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        {!isAddingNew ? (
          <div className={styles.searchStep}>
            <div className={styles.searchBarWrapper}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="text"
                className={styles.roundSearchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="어떤 극을 보러 가시나요?"
              />
              {searchQuery && (
                <button
                  className={styles.clearButton}
                  onClick={() => setSearchQuery("")}
                >
                  ×
                </button>
              )}
            </div>

            {searchQuery.trim().length >= 1 && searchResults.length === 0 && (
              <div className={styles.noResults}>
                <p>"{searchQuery}"에 대한 검색 결과가 없습니다.</p>
                <button
                  className={styles.addNewButton}
                  onClick={handleStartAddNew}
                >
                  <span className={styles.plusIcon}>+</span> 직접 새로운 극
                  등록하기
                </button>
              </div>
            )}

            {searchResults.length > 0 && (
              <div className={styles.searchResults}>
                <h5>검색 결과</h5>
                <ul>
                  {searchResults.map((show) => (
                    <li key={show.id} onClick={() => handleSelectShow(show)}>
                      <span
                        className={`${styles.showTypeBadge} ${show.type === "MUSICAL" ? styles.musical : styles.play}`}
                      >
                        {show.type === "MUSICAL" ? "뮤" : "연"}
                      </span>
                      <span className={styles.showResultTitle}>
                        {show.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.addNewStep}>
            <div className={styles.inputGroup}>
              <label>극 제목</label>
              <input
                type="text"
                value={newShowTitle}
                onChange={(e) => setNewShowTitle(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>공연 종류</label>
              <div className={styles.radioGroup}>
                <label>
                  <input
                    type="radio"
                    value="MUSICAL"
                    checked={newShowType === "MUSICAL"}
                    onChange={(e) => setNewShowType(e.target.value)}
                  />
                  뮤지컬
                </label>
                <label>
                  <input
                    type="radio"
                    value="PLAY"
                    checked={newShowType === "PLAY"}
                    onChange={(e) => setNewShowType(e.target.value)}
                  />
                  연극
                </label>
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>몇찍이 완찍인지</label>
              <input
                type="number"
                value={newShowTotalStamps}
                onChange={(e) => setNewShowTotalStamps(e.target.value)}
                placeholder="예) 9"
              />
            </div>

            <div className={styles.benefitsSection}>
              <h5>회차별 혜택 설정</h5>
              {[...Array(parseInt(newShowTotalStamps || 0))].map((_, i) => {
                const round = i + 1;
                return (
                  <div key={round} className={styles.benefitRoundRow}>
                    <span className={styles.roundLabel}>{round}회차:</span>
                    <div className={styles.benefitChecks}>
                      {Object.entries(BENEFIT_TYPES).map(([key, type]) => {
                        const isChecked = newShowBenefits[round]?.[type];
                        return (
                          <label
                            key={type}
                            className={`${styles.benefitCheckLabel} ${type === BENEFIT_TYPES.DISCOUNT && isChecked ? styles.hasDetail : ""}`}
                          >
                            <input
                              type="checkbox"
                              checked={!!isChecked}
                              onChange={(e) =>
                                handleBenefitChange(
                                  round,
                                  type,
                                  e.target.checked,
                                )
                              }
                            />
                            {BENEFIT_NAMES[type]}
                            {type === BENEFIT_TYPES.DISCOUNT && isChecked && (
                              <span className={styles.benefitDetailTag}>
                                {isChecked.percent}% / {isChecked.count}개
                              </span>
                            )}
                          </label>
                        );
                      })}
                      {newShowBenefits[round]?.[BENEFIT_TYPES.ETC] && (
                        <input
                          type="text"
                          className={styles.etcInput}
                          placeholder="기타 혜택 내용 입력"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.modalActions}>
              <button
                className={styles.cancelButton}
                onClick={() => setIsAddingNew(false)}
              >
                뒤로가기
              </button>
              <button
                className={styles.submitButton}
                onClick={handleRegisterNewShow}
              >
                등록하기
              </button>
            </div>
          </div>
        )}
      </div>

      {benefitDetailPopup && (
        <BenefitDetailPopup
          onClose={() => setBenefitDetailPopup(null)}
          onSave={handleSaveBenefitDetail}
          benefitData={benefitDetailPopup.data}
        />
      )}
    </div>
  );
};

export default AddStampModal;
