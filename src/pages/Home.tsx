import { Link } from "react-router-dom";
import {
  foldawayImages,
  foldawayProductUrl,
  calculateFoldawayPrice,
  type FoldawayConfig,
} from "../data/foldaway";
import { SmoothImage } from "../components/SmoothImage";
import styles from "./Home.module.css";

const demoConfig: FoldawayConfig = {
  wood: "untreated",
  height: "h210-234",
  width: "w50",
  side: "left",
  antislip: "no",
};

const gallery = [
  {
    src: foldawayImages.gallery1,
    alt: "Foldaway uitgeklapt in een tiny house",
  },
  {
    src: foldawayImages.gallery2,
    alt: "Foldaway ingeklapt aan vide",
  },
  {
    src: foldawayImages.ingeklapt,
    alt: "Foldaway ingeklapt in tiny house",
  },
  {
    src: foldawayImages.gallery3,
    alt: "Rubio Monocoat kleuropties",
  },
] as const;

export function Home() {
  const fromPrice = calculateFoldawayPrice(demoConfig);

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Ruimtebesparende vouwtrap</p>
            <h1 className={styles.heroTitle}>
              Opvouwbare trap Foldaway Slim — perfect voor kleine ruimtes
            </h1>
            <p className={styles.heroLead}>
              Innovatieve klaptrap van multiplex berkenhout: na gebruik in één
              beweging dicht, vloer weer vrij. Ideaal als tiny house- of zoldertrap.
              Officiële productpagina:{" "}
              <a
                href={foldawayProductUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.heroLink}
              >
                prijzentrappen.nl
              </a>
              .
            </p>
            <div className={styles.heroActions}>
              <Link to="/configurator" className={styles.btnPrimary}>
                Start configurator
              </Link>
              <a href="#over-foldaway" className={styles.btnGhost}>
                Meer informatie
              </a>
            </div>
            <p className={styles.priceHint}>
              Vanaf ca.{" "}
              <strong>
                {fromPrice.toLocaleString("nl-NL", {
                  style: "currency",
                  currency: "EUR",
                })}
              </strong>{" "}
              incl. btw (basis op shop, demo).
            </p>
            <ul className={styles.trust}>
              <li>Ingeklapt vrijwel geen ruimte</li>
              <li>100% Nederlands product, op maat</li>
              <li>Lichtgewicht multiplex berken</li>
            </ul>
          </div>
          <div className={styles.heroArt}>
            <figure className={styles.heroPhoto}>
              <SmoothImage
                src={foldawayImages.hero}
                alt="Foldaway trap uitgeklapt in woonkamer naar verdieping"
                wrapperClassName={styles.heroImgWrap}
                className={styles.heroImg}
                width={720}
                height={900}
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </figure>
          </div>
        </div>
      </section>

      <section id="over-foldaway" className={styles.about}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Waarom Foldaway?</h2>
          <p className={styles.sectionLead}>
            De trapboom dient als leuning; het scharniermechanisme maakt in- en
            uitklappen eenvoudig. Standaardbreedte 60 cm, smaller in stappen van 5
            cm mogelijk. Aantrede ca. 18 cm; optrede ca. 23,5–26 cm afhankelijk van
            de hoogte.
          </p>
          <ul className={styles.checklist}>
            <li>Geschikt voor krappe ruimtes en tiny houses</li>
            <li>Snel te monteren met zelfbouwset en handleiding</li>
            <li>Optioneel Rubio Monocoat in Natural, Chocolat of Walnut</li>
            <li>Belasting tot ca. 140 kg</li>
          </ul>
          <p className={styles.note}>
            De trap is steiler dan veel traditionele trappen — houd daar rekening
            mee bij je indeling.
          </p>
        </div>
      </section>

      <section className={styles.gallery}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Sfeerbeelden</h2>
          <p className={styles.sectionLead}>
            Foto&apos;s van{" "}
            <a
              href={foldawayProductUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.heroLink}
            >
              prijzentrappen.nl
            </a>
            .
          </p>
          <div className={styles.galleryGrid}>
            {gallery.map(({ src, alt }) => (
              <figure key={src} className={styles.galleryItem}>
                <SmoothImage
                  src={src}
                  alt={alt}
                  wrapperClassName={styles.galleryImgWrap}
                  className={styles.galleryImg}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </figure>
            ))}
          </div>
          <div className={styles.ctaRow}>
            <Link to="/configurator" className={styles.btnPrimary}>
              Stel je trap samen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
