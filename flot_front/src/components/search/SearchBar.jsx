import React from "react";
import { Search } from "lucide-react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ keyword, setKeyword, onSearch }) => {
  return (
    <form onSubmit={onSearch} className={styles.searchBarForm}>
      <div className={styles.searchBarWrapper}>
        <input
          type="text"
          placeholder="공연명, 배우 이름을 검색하세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          <Search size={22} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
