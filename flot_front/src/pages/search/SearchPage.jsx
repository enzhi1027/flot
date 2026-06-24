import React, { useState } from "react";
import styles from "./SearchPage.module.css";
import SearchBar from "../../components/search/SearchBar";
import RecentSearches from "../../components/search/RecentSearches";
import ShowResultSection from "../../components/search/ShowResultSection";
import ActorResultSection from "../../components/search/ActorResultSection";

const DUMMY_RECENT = [
  "나르치스와 골드문트",
  "베르테르",
  "히스토리 보이즈",
  "미오 프라텔로",
];

const DUMMY_SHOWS = [
  {
    id: 1,
    title: "제목 1",
    type: 1,
    period: "2026.01.01 ~ 2026.04.15",
    place: "광림아트센터 BBCH홀",
    casts: ["배우A", "배우B", "배우C"],
  },
  {
    id: 2,
    title: "오프닝 나이트",
    type: 2,
    period: "2026.05.01 ~ 2026.07.26",
    place: "대학로 자유극장",
    casts: ["배우D", "배우E"],
  },
  {
    id: 3,
    title: "제목 3",
    type: 1,
    period: "2026.08.10 ~ 2026.10.15",
    place: "예술의전당",
    casts: ["배우F", "배우G"],
  },
  {
    id: 4,
    title: "제목 4",
    type: 2,
    period: "2026.09.01 ~ 2026.11.30",
    place: "콘텐츠박스",
    casts: ["배우H", "배우I"],
  },
];

const DUMMY_ACTORS = [
  {
    id: 1,
    name: "이름 1",
    works: [
      {
        id: 10,
        title: "필모 1",
        type: 1,
        period: "2026.01.01 ~ 2026.04.15",
      },
      {
        id: 11,
        title: "필모 2",
        type: 1,
        period: "2026.05.01 ~ 2026.07.26",
      },
    ],
  },
  {
    id: 2,
    name: "이름 2",
    works: [
      {
        id: 20,
        title: "필모 1",
        type: 1,
        period: "2026.01.01 ~ 2026.04.15",
      },
      {
        id: 21,
        title: "필모 2",
        type: 2,
        period: "2026.08.10 ~ 2026.10.15",
      },
    ],
  },
  {
    id: 3,
    name: "이름 3",
    works: [
      {
        id: 30,
        title: "필모 1",
        type: 1,
        period: "2026.05.01 ~ 2026.07.26",
      },
    ],
  },
  {
    id: 4,
    name: "이름 4",
    works: [
      {
        id: 40,
        title: "필모 1",
        type: 2,
        period: "2026.09.01 ~ 2026.11.30",
      },
    ],
  },
];

const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const [recentSearches, setRecentSearches] = useState(DUMMY_RECENT);
  const [viewMode, setViewMode] = useState("default");
  const [activeTab, setActiveTab] = useState("show");

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!keyword.trim()) return;
    setRecentSearches((prev) =>
      [keyword.trim(), ...prev.filter((i) => i !== keyword.trim())].slice(
        0,
        10,
      ),
    );
    setViewMode("result");
  };

  return (
    <div className={styles.searchPageContainer}>
      <SearchBar
        keyword={keyword}
        setKeyword={setKeyword}
        onSearch={handleSearch}
      />

      {viewMode === "default" && (
        <RecentSearches
          recentSearches={recentSearches}
          onClearAll={() => setRecentSearches([])}
          onRemove={(item) =>
            setRecentSearches((prev) => prev.filter((i) => i !== item))
          }
          onRecentClick={(text) => {
            setKeyword(text);
            setViewMode("result");
          }}
        />
      )}

      {viewMode === "result" && (
        <div className={styles.cardContainer}>
          <ShowResultSection
            shows={DUMMY_SHOWS.slice(0, 3)}
            isMoreView={false}
            onMoreClick={() => {
              setViewMode("more_show");
              setActiveTab("show");
            }}
          />
          <div style={{ marginTop: "32px" }} />
          <ActorResultSection
            actors={DUMMY_ACTORS.slice(0, 4)}
            isMoreView={false}
            onMoreClick={() => {
              setViewMode("more_actor");
              setActiveTab("actor");
            }}
          />
        </div>
      )}

      {(viewMode === "more_show" || viewMode === "more_actor") && (
        <div className={styles.cardContainer}>
          <div className={styles.tabHeaderSwitcher}>
            <button
              className={`${styles.switchTabBtn} ${activeTab === "show" ? styles.activeTabBtn : ""}`}
              onClick={() => {
                setActiveTab("show");
                setViewMode("more_show");
              }}
            >
              극
            </button>
            <button
              className={`${styles.switchTabBtn} ${activeTab === "actor" ? styles.activeTabBtn : ""}`}
              onClick={() => {
                setActiveTab("actor");
                setViewMode("more_actor");
              }}
            >
              배우
            </button>
          </div>

          {viewMode === "more_show" && (
            <ShowResultSection shows={DUMMY_SHOWS} isMoreView={true} />
          )}
          {viewMode === "more_actor" && (
            <ActorResultSection actors={DUMMY_ACTORS} isMoreView={true} />
          )}

          <button
            onClick={() => setViewMode("result")}
            className={styles.backToResultBtn}
          >
            이전 결과로 돌아가기
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
