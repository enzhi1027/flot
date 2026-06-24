import React from "react";
import styles from "./ShowResultSection.module.css";

export const StatusBadge = ({ period }) => {
  if (!period) return null;

  const today = new Date();
  const [startStr, endStr] = period.split("~").map((s) => s.trim());
  const startDate = new Date(startStr.replace(/\./g, "-"));
  const endDate = new Date(endStr.replace(/\./g, "-"));

  let label = "진행 중";
  let styleClass = styles.badgeIng;

  if (today < startDate) {
    label = "예정";
    styleClass = styles.badgeWill;
  } else if (today > endDate) {
    label = "종료";
    styleClass = styles.badgeEnd;
  }

  return <span className={`${styles.statusBadge} ${styleClass}`}>{label}</span>;
};
