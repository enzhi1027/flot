import React, { useState } from "react";
import styles from "./ReportPage.module.css";
import StatisticsSection from "../../components/report/StatisticsSection";
import StampSection from "../../components/report/StampSection";

const ReportPage = () => {
  const [activeTab, setActiveTab] = useState("statistics");

  return (
    <div className={styles.container}>
      <div className={styles.tabNavbar}>
        <div
          className={`${styles.tabItem} ${activeTab === "statistics" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("statistics")}
        >
          통계
        </div>
        <div
          className={`${styles.tabItem} ${activeTab === "stamps" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("stamps")}
        >
          도장판
        </div>
      </div>

      <main className={styles.content}>
        {activeTab === "statistics" && <StatisticsSection />}
        {activeTab === "stamps" && <StampSection />}
      </main>
    </div>
  );
};

export default ReportPage;
