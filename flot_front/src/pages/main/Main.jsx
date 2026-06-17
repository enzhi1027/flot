import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import styles from "./Main.module.css";
import ShowCard from "../../components/main/ShowCard";
import TodayStage from "../../components/main/TodayStage";

const Main = () => {
  const popularShows = Array.from({ length: 10 }, (_, i) => ({
    id: `pop-${i + 1}`,
    title:
      i % 2 === 0 ? `뮤지컬 베르테르 ${i + 1}` : `연극 오프닝 나이트 ${i + 1}`,
    place: i % 2 === 0 ? "광림아트센터 BBCH홀" : "대학로 자유극장",
    period: "2026.05.01 ~ 2026.07.26",
    poster: "https://via.placeholder.com/220x310/101423/ffffff?text=Poster",
  }));

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

  const swiperBreakpoints = {
    320: { slidesPerView: 2.2, spaceBetween: 12 },
    768: { slidesPerView: 3.5, spaceBetween: 16 },
    1024: { slidesPerView: 4.8, spaceBetween: 20 },
    1200: { slidesPerView: 5.2, spaceBetween: 20 },
  };

  return (
    <main className={styles.mainContainer}>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>실시간 인기 작품</h2>
          <span className={styles.sectionSub}>
            Flot 유저들이 가장 많이 찾는 인기 공연 10
          </span>
        </div>

        <div className={styles.sliderWrapper}>
          <Swiper
            modules={[FreeMode]}
            freeMode={true}
            breakpoints={swiperBreakpoints}
            className={styles.swiperContainer}
          >
            {popularShows.map((show) => (
              <SwiperSlide key={show.id} className={styles.swiperSlide}>
                <ShowCard show={show} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>내 관극 예정 작품</h2>
          <span className={styles.sectionSub}>
            다가오는 관극 일정을 미리 확인하세요
          </span>
        </div>

        <div className={styles.sliderWrapper}>
          <Swiper
            modules={[FreeMode]}
            freeMode={true}
            breakpoints={swiperBreakpoints}
            className={styles.swiperContainer}
          >
            {myUpcomingShows.map((myShow) => (
              <SwiperSlide key={myShow.id} className={styles.swiperSlide}>
                <ShowCard show={myShow} isMyShow />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <TodayStage />
    </main>
  );
};

export default Main;
