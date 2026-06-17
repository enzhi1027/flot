import React from "react";
import styles from "./Main.module.css";

// Lucide React 아이콘 활용 (달력, 시간, 유저 등 마크업 디테일용)
import { Calendar, Clock, User } from "lucide-react";

const Main = () => {
  // 1. Hero Section: API 기반 인기극 더미 데이터 (10개)
  const popularShows = Array.from({ length: 10 }, (_, i) => ({
    id: `pop-${i + 1}`,
    title:
      i % 2 === 0 ? `뮤지컬 베르테르 ${i + 1}` : `연극 오프닝 나이트 ${i + 1}`,
    place: i % 2 === 0 ? "광림아트센터 BBCH홀" : "대학로 자유극장",
    period: "2026.05.01 ~ 2026.07.26",
    poster: "https://via.placeholder.com/220x310/101423/ffffff?text=Poster", // 추후 실이미지 주소로 대체
  }));

  // 2. My Section: 내 관극 예정 작품 더미 데이터 (10개)
  const myUpcomingShows = Array.from({ length: 10 }, (_, i) => ({
    id: `my-${i + 1}`,
    title:
      i % 3 === 0
        ? `뮤지컬 지킬앤하이드`
        : i % 3 === 1
          ? `연극 아트`
          : `뮤지컬 미오 프라텔로`,
    date: `2026.06.${15 + i} 회차`,
    seat: `${i + 1}층 B블록 ${i + 5}열`,
    poster: "https://via.placeholder.com/220x310/222222/ffffff?text=My+Ticket",
  }));

  // 3. Today's Section: 오늘의 공연 라인업 (예상 가이드 포함 3~4개 직관적 배치)
  const todaysShows = [
    {
      id: "today-1",
      title: "뮤지컬 미오 프라텔로",
      time: "16:00, 20:00 (총 2회차)",
      location: "드림아트센터 1관",
      casts: ["치치: 정민", "스티비: 김대현", "써니보이: 최호승"],
    },
    {
      id: "today-2",
      title: "연극 히스토리 보이즈",
      time: "20:00 (총 1회차)",
      location: "두산아트센터 연강홀",
      casts: [
        "헥터: 오대석",
        "어윈: 안재영",
        "포스너: 김리현",
        "데이킨: 황순종",
      ],
    },
    {
      id: "today-3",
      title: "뮤지컬 사의 찬미",
      time: "16:00, 19:30 (총 2회차)",
      location: "TOM 1관",
      casts: ["김우진: 주민진", "윤심덕: 최연우", "사내: 정민"],
    },
  ];

  // 오늘 날짜 구하기 (June 17, 2026 기준 예시 표현)
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 오늘의 라인업`;

  return (
    <main className={styles.mainContainer}>
      {/* 1. Hero Section: 인기 작품 상위 10 */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>실시간 인기 작품</h2>
          <span className={styles.sectionSub}>
            Flot 유저들이 가장 많이 찾는 인기 공연 10
          </span>
        </div>

        {/* 가로 스크롤 슬라이더 박스 */}
        <div className={styles.sliderContainer}>
          <div className={styles.sliderRow}>
            {popularShows.map((show) => (
              <div key={show.id} className={styles.showCard}>
                <div className={styles.posterWrapper}>
                  <img
                    src={show.poster}
                    alt={show.title}
                    className={styles.posterImg}
                  />
                </div>
                <div className={styles.showInfo}>
                  <h3 className={styles.showTitle}>{show.title}</h3>
                  <p className={styles.showDetail}>{show.place}</p>
                  <p className={styles.showDate}>{show.period}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. My Section: 내 관극 예정 작품 10 */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>내 관극 예정 작품</h2>
          <span className={styles.sectionSub}>
            다가오는 관극 일정을 미리 확인하세요
          </span>
        </div>

        <div className={styles.sliderContainer}>
          <div className={styles.sliderRow}>
            {myUpcomingShows.map((myShow) => (
              <div key={myShow.id} className={styles.showCard}>
                <div className={styles.posterWrapper}>
                  <img
                    src={myShow.poster}
                    alt={myShow.title}
                    className={styles.posterImg}
                  />
                  {/* 티켓 디데이/좌석 정보 미니 배너 위젯 오버레이 */}
                  <div className={styles.seatBadge}>{myShow.seat}</div>
                </div>
                <div className={styles.showInfo}>
                  <h3 className={styles.showTitle}>{myShow.title}</h3>
                  <p className={styles.myDateText}>
                    <Calendar size={14} style={{ marginRight: "4px" }} />
                    {myShow.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Today's Section: 오늘의 공연 캐스팅 보드 피드 */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>오늘의 무대</h2>
          <span className={styles.sectionSub}>{formattedDate}</span>
        </div>

        {/* 오늘 공연은 스크롤이 아니라 리스트/그리드 형태로 한눈에 시원하게 들어오도록 구성 */}
        <div className={styles.todayGrid}>
          {todaysShows.map((todayShow) => (
            <div key={todayShow.id} className={styles.todayCard}>
              <div className={styles.todayCardHeader}>
                <h3 className={styles.todayShowTitle}>{todayShow.title}</h3>
                <span className={styles.todayLocation}>
                  {todayShow.location}
                </span>
              </div>

              <div className={styles.todayCardBody}>
                <div className={styles.timeMeta}>
                  <Clock size={15} className={styles.metaIcon} />
                  <span>{todayShow.time}</span>
                </div>

                {/* 핵심: 연뮤덕 취향 저격 캐스팅 리스트 패널 */}
                <div className={styles.castContainer}>
                  <div className={styles.castTitleRow}>
                    <User size={14} className={styles.metaIcon} />
                    <span>Today's Cast</span>
                  </div>
                  <div className={styles.castTags}>
                    {todayShow.casts.map((cast, index) => (
                      <span key={index} className={styles.castTag}>
                        {cast}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Main;
