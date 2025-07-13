import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from "./style.module.scss";

export default function Navbar() {
  const navbarItems = [
    { label: "Dashboard", href: "/" },
    { label: "Members", href: "/members" },
    { label: "Profile", href: "/profile" },
    { label: "Connections", href: "/connections" },
    { label: "Discover", href: "/discover" },
    { label: "AI Matching", href: "/aiMatching" },
  ];

  return (
    <div>
      <nav className={styles.sidebar}>
        {navbarItems.map((item, index) => (
          <NavLink
            key={index.id}
            to={item.href}
            end={item.href === "/"} // only apply "end" on home route
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}