import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

const nav = [
  { to: "/", label: "Home" },
  { to: "/#over-foldaway", label: "Foldaway" },
  { to: "/configurator", label: "Configurator" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoMark} aria-hidden />
          Foldaway
        </Link>
        <button
          type="button"
          className={styles.menuToggle}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          aria-label={menuOpen ? "Sluit menu" : "Open menu"}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          id="main-navigation"
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
          aria-label="Hoofdmenu"
        >
          {nav.map(({ to, label }) =>
            to.startsWith("/#") ? (
              <a
                key={to}
                href={to}
                className={styles.navLink}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ) : (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
                end={to === "/"}
              >
                {label}
              </NavLink>
            )
          )}
        </nav>
        <Link to="/configurator" className={styles.cta}>
          Trap samenstellen
        </Link>
      </div>
    </header>
  );
}
