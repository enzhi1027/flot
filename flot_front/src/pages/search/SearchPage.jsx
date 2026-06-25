import React, { useState } from "react";
import styles from "./SearchPage.module.css";
import SearchBar from "../../components/search/SearchBar";
import RecentSearches from "../../components/search/RecentSearches";
import ShowResultSection from "../../components/search/ShowResultSection";
import ActorResultSection from "../../components/search/ActorResultSection";

import {
  DUMMY_SHOWS,
  DUMMY_ACTORS,
  INITIAL_RECENT,
} from "../../components/search/searchMockData";

const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const [recentSearches, setRecentSearches] = useState(INITIAL_RECENT);
  const [viewMode, setViewMode] = useState("default");
  const [activeTab, setActiveTab] = useState("show");

  const [filteredShows, setFilteredShows] = useState([]);
  const [filteredActors, setFilteredActors] = useState([]);

  const executeSearch = (searchWord) => {
    const trimmed = searchWord.trim();
    if (!trimmed) return;

    const lowerWord = trimmed.toLowerCase();

    const showsResult = DUMMY_SHOWS.filter(
      (show) =>
        show.title.toLowerCase().includes(lowerWord) ||
        show.castingRoles.some((roleGroup) =>
          roleGroup.actors.some((actor) =>
            actor.toLowerCase().includes(lowerWord),
          ),
        ),
    );

    const actorsResult = DUMMY_ACTORS.filter((actor) =>
      actor.name.toLowerCase().includes(lowerWord),
    );

    setFilteredShows(showsResult);
    setFilteredActors(actorsResult);
    setViewMode("result");
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (!keyword.trim()) return;

    setRecentSearches((prev) =>
      [keyword.trim(), ...prev.filter((i) => i !== keyword.trim())].slice(
        0,
        10,
      ),
    );

    executeSearch(keyword);
  };

  const handleRecentKeywordClick = (text) => {
    setKeyword(text);
    executeSearch(text);
  };

  return (
    <div className={styles.searchPageContainer}>
      <SearchBar
        keyword={keyword}
        setKeyword={setKeyword}
        onSearch={handleSearchSubmit}
      />

      {/* 기본 화면 */}
      {viewMode === "default" && (
        <RecentSearches
          recentSearches={recentSearches}
          onClearAll={() => setRecentSearches([])}
          onRemove={(item) =>
            setRecentSearches((prev) => prev.filter((i) => i !== item))
          }
          onRecentClick={handleRecentKeywordClick}
        />
      )}

      {/* 결과 화면: 데이터 유무에 따른 조건부 렌더링 ⚙️ */}
      {viewMode === "result" && (
        <div className={styles.cardContainer}>
          {filteredShows.length === 0 && filteredActors.length === 0 ? (
            /* 1번 요구사항: 둘 다 없을 때 */
            <div className={styles.noResult}>검색 결과가 없습니다.</div>
          ) : (
            <>
              {/* 극 결과가 있을 때만 노출 */}
              {filteredShows.length > 0 && (
                <ShowResultSection
                  shows={filteredShows.slice(0, 3)}
                  isMoreView={false}
                  onMoreClick={() => {
                    setViewMode("more_show");
                    setActiveTab("show");
                  }}
                />
              )}

              {filteredShows.length > 0 && filteredActors.length > 0 && (
                <div style={{ marginTop: "32px" }} />
              )}

              {/* 배우 결과가 있을 때만 노출 */}
              {filteredActors.length > 0 && (
                <ActorResultSection
                  actors={filteredActors.slice(0, 4)}
                  isMoreView={false}
                  onMoreClick={() => {
                    setViewMode("more_actor");
                    setActiveTab("actor");
                  }}
                />
              )}
            </>
          )}
        </div>
      )}

      {/* 더보기 화면 */}
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
              극 ({filteredShows.length})
            </button>
            <button
              className={`${styles.switchTabBtn} ${activeTab === "actor" ? styles.activeTabBtn : ""}`}
              onClick={() => {
                setActiveTab("actor");
                setViewMode("more_actor");
              }}
            >
              배우 ({filteredActors.length})
            </button>
          </div>

          {viewMode === "more_show" && (
            <ShowResultSection shows={filteredShows} isMoreView={true} />
          )}
          {viewMode === "more_actor" && (
            <ActorResultSection actors={filteredActors} isMoreView={true} />
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
