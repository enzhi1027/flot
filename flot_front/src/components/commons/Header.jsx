import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.css";
import logo from "../../assets/flot_logo_text.png";

import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const isBgWhite = isScrolled || isSidebarOpen;

  return (
    <>
      <header
        className={`${styles.header} ${isBgWhite ? styles.scrolled : ""}`}
      >
        <div className={styles.headerContainer}>
          {/* 로고 */}
          <Link to="/" className={styles.logoLink} onClick={closeSidebar}>
            <img src={logo} alt="Flot Logo" className={styles.logoImg} />
          </Link>

          {/* 햄버거 버튼 */}
          <button
            className={styles.hamburgerBtn}
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            <MenuIcon
              sx={{
                fontSize: "2rem",
                pointerEvents: "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* 사이드바 */}
      <aside
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles.sidebarOpen : ""
        }`}
      >
        <nav className={styles.navMenu}>
          <ul className={styles.menuList}>
            <li>
              <Link
                to="/search"
                className={styles.menuItem}
                onClick={closeSidebar}
              >
                검색하기
              </Link>
            </li>

            <li className={styles.menuGroup}>
              <span className={styles.groupTitle}>캘린더</span>

              <ul className={styles.subMenu}>
                <li>
                  <Link to="/calendar/my" onClick={closeSidebar}>
                    내 캘린더
                  </Link>
                </li>

                <li>
                  <Link to="/calendar/favorite" onClick={closeSidebar}>
                    애배 캘린더
                  </Link>
                </li>

                <li>
                  <Link to="/calendar/group" onClick={closeSidebar}>
                    그룹 캘린더
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link
                to="/transfer"
                className={styles.menuItem}
                onClick={closeSidebar}
              >
                양도 / 교환
              </Link>
            </li>

            <li>
              <Link
                to="/seeya"
                className={styles.menuItem}
                onClick={closeSidebar}
              >
                시야
              </Link>
            </li>

            <li>
              <Link
                to="/ticketing-practice"
                className={styles.menuItem}
                onClick={closeSidebar}
              >
                티켓팅 연습
              </Link>
            </li>

            <li className={styles.menuGroup}>
              <span className={styles.groupTitle}>리포트</span>

              <ul className={styles.subMenu}>
                <li>
                  <Link to="/report/review" onClick={closeSidebar}>
                    관극 리포트
                  </Link>
                </li>

                <li>
                  <Link to="/report/stamp" onClick={closeSidebar}>
                    도장판
                  </Link>
                </li>
              </ul>
            </li>

            <hr className={styles.divider} />

            <li>
              <Link
                to="/notice"
                className={styles.supportItem}
                onClick={closeSidebar}
              >
                공지사항
              </Link>
            </li>

            <li>
              <Link
                to="/qna"
                className={styles.supportItem}
                onClick={closeSidebar}
              >
                1:1 문의
              </Link>
            </li>

            <li>
              <Link
                to="/faq"
                className={styles.supportItem}
                onClick={closeSidebar}
              >
                자주 묻는 질문
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* 오버레이 */}
      {isSidebarOpen && (
        <div className={styles.overlay} onClick={closeSidebar} />
      )}
    </>
  );
};

export default Header;
