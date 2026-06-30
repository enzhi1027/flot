import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

import {
  Search,
  Calendar,
  Users,
  Drama,
  Ticket,
  BarChart3,
} from "lucide-react";

const Footer = () => {
  const iconProps = {
    size: 32,
    strokeWidth: 1.5,
    className: styles.menuIcon,
  };

  const menuItems = [
    {
      to: "/search",
      label: "검색하기",
      icon: <Search {...iconProps} />,
      disabled: false,
    },
    {
      to: "/calendar",
      label: "캘린더",
      icon: <Calendar {...iconProps} />,
      disabled: false,
    },
    {
      to: "/transfer",
      label: "양도/교환",
      icon: <Users {...iconProps} />,
      disabled: true,
    },
    {
      to: "/seeya",
      label: "시야",
      icon: <Drama {...iconProps} />,
      disabled: true,
    },
    {
      to: "/ticketing-practice",
      label: "티켓팅",
      icon: <Ticket {...iconProps} />,
      disabled: true,
    },
    {
      to: "/report",
      label: "리포트",
      icon: <BarChart3 {...iconProps} />,
      disabled: false,
    },
  ];

  const handleLinkClick = (e, item) => {
    if (item.disabled) {
      e.preventDefault();
      alert(`${item.label} 기능은 아직 준비 중입니다! 🎬`);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <nav className={styles.iconMenuGrid} aria-label="푸터 메뉴">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={(e) => handleLinkClick(e, item)}
              className={`${styles.iconMenuItem} ${item.disabled ? styles.disabledItem : ""}`}
              aria-label={item.label}
              aria-disabled={item.disabled}
            >
              {item.icon}
              <span className={styles.iconLabel}>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
