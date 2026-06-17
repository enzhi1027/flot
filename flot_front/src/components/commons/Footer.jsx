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
    },
    {
      to: "/calendar",
      label: "캘린더",
      icon: <Calendar {...iconProps} />,
    },
    {
      to: "/transfer",
      label: "양도/교환",
      icon: <Users {...iconProps} />,
    },
    {
      to: "/seeya",
      label: "시야",
      icon: <Drama {...iconProps} />,
    },
    {
      to: "/ticketing-practice",
      label: "티켓팅",
      icon: <Ticket {...iconProps} />,
    },
    {
      to: "/report",
      label: "리포트",
      icon: <BarChart3 {...iconProps} />,
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <nav className={styles.iconMenuGrid} aria-label="푸터 메뉴">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={styles.iconMenuItem}
              aria-label={item.label}
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
