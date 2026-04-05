import { Link } from "react-router-dom";
import { foldawayProductUrl } from "../data/foldaway";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <p className={styles.brand}>Foldaway Slim (demo)</p>
          <p className={styles.small}>
            Configurator ter illustratie. Product en foto&apos;s:{" "}
            <a
              href={foldawayProductUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.ext}
            >
              prijzentrappen.nl
            </a>
            .
          </p>
        </div>
        <div>
          <p className={styles.title}>Navigatie</p>
          <ul className={styles.list}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/configurator">Configurator</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className={styles.title}>Officiële shop</p>
          <ul className={styles.list}>
            <li>
              <a href={foldawayProductUrl} target="_blank" rel="noreferrer">
                Opvouwbare trap Foldaway
              </a>
            </li>
            <li>
              <a
                href="https://www.prijzentrappen.nl/"
                target="_blank"
                rel="noreferrer"
              >
                Prijzentrappen.nl
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.bar}>
        <div className="container">
          <p className={styles.copy}>
            © {new Date().getFullYear()} Demo — geen officiële winkel
          </p>
        </div>
      </div>
    </footer>
  );
}
