import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const nav = [
  { to: "/", label: "Home" },
  { to: "/#over-foldaway", label: "Foldaway" },
  { to: "/configurator", label: "Configurator" },
];

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoMark} aria-hidden />
          Foldaway
        </Link>
        <nav className={styles.nav} aria-label="Hoofdmenu">
          {nav.map(({ to, label }) =>
            to.startsWith("/#") ? (
              <a key={to} href={to} className={styles.navLink}>
                {label}
              </a>
            ) : (
              <NavLink
                key={to}
                to={to}
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
