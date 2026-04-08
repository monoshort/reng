import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  calculateFoldawayPrice,
  foldawayProductUrl,
  woodInfo,
  heightInfo,
  widthInfo,
  sideInfo,
  antislipInfo,
  getFoldawayPreviewUrl,
  getFoldawayThumbUrl,
  type WoodFinishId,
  type HeightRangeId,
  type WidthId,
  type MountSideId,
  type AntislipId,
  type FoldawayConfig,
} from "../data/foldaway";
import { SmoothImage } from "../components/SmoothImage";
import styles from "./Configurator.module.css";

const woods: WoodFinishId[] = [
  "untreated",
  "natural-oil",
  "chocolat",
  "walnut",
];
const heights: HeightRangeId[] = ["h210-234", "h235-260", "h261-286"];
const widths: WidthId[] = ["w50", "w55", "w60"];
const sides: MountSideId[] = ["left", "right"];
const antislips: AntislipId[] = ["no", "yes"];

function parseWood(v: string | null): WoodFinishId {
  if (
    v === "untreated" ||
    v === "natural-oil" ||
    v === "chocolat" ||
    v === "walnut"
  )
    return v;
  return "untreated";
}

function parseHeight(v: string | null): HeightRangeId {
  if (v === "h210-234" || v === "h235-260" || v === "h261-286") return v;
  return "h210-234";
}

function parseWidth(v: string | null): WidthId {
  if (v === "w50" || v === "w55" || v === "w60") return v;
  return "w50";
}

function parseSide(v: string | null): MountSideId {
  if (v === "left" || v === "right") return v;
  return "left";
}

function parseAntislip(v: string | null): AntislipId {
  if (v === "yes" || v === "no") return v;
  return "no";
}

export function Configurator() {
  const [searchParams, setSearchParams] = useSearchParams();

  const wood = parseWood(searchParams.get("hout"));
  const height = parseHeight(searchParams.get("hoogte"));
  const width = parseWidth(searchParams.get("breedte"));
  const side = parseSide(searchParams.get("zijde"));
  const antislip = parseAntislip(searchParams.get("antislip"));

  const config: FoldawayConfig = useMemo(
    () => ({ wood, height, width, side, antislip }),
    [wood, height, width, side, antislip]
  );

  const setParam = useCallback(
    (key: string, value: string | null) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (value === null || value === "") next.delete(key);
          else next.set(key, value);
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const price = useMemo(() => calculateFoldawayPrice(config), [config]);
  const mainImageUrl = getFoldawayPreviewUrl(config);

  const previewAlt = `Foldaway opvouwbare trap — ${woodInfo[wood].label}`;

  return (
    <div className={styles.page}>
      <div className={`container ${styles.layout}`}>
        <header className={styles.intro}>
          <h1 className={styles.title}>Foldaway configurator</h1>
          <p className={styles.lead}>
            Stel de{" "}
            <strong>Foldaway Slim</strong> samen zoals op{" "}
            <a
              href={foldawayProductUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.inlineLink}
            >
              prijzentrappen.nl
            </a>
            . Prijs is indicatief (demo); controleer altijd de actuele shop.
          </p>
        </header>

        <div className={styles.grid}>
          <div className={styles.form}>
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Afwerking (monocoat olie)</legend>
              <div className={styles.options}>
                {woods.map((w) => (
                  <label
                    key={w}
                    className={`${styles.option} ${styles.optionWithThumb} ${
                      wood === w ? styles.optionActive : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="wood"
                      value={w}
                      checked={wood === w}
                      onChange={() => setParam("hout", w)}
                      className={styles.radio}
                    />
                    <div className={styles.optionText}>
                      <span className={styles.optionTitle}>
                        {woodInfo[w].label}
                      </span>
                      {woodInfo[w].note && (
                        <span className={styles.optionDesc}>
                          {woodInfo[w].note}
                        </span>
                      )}
                    </div>
                    <SmoothImage
                      src={getFoldawayThumbUrl(w)}
                      alt=""
                      className={styles.optionThumb}
                      wrapperClassName={styles.optionThumbWrap}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Hoogte trap (vloer–vloer)</legend>
              <div className={styles.options}>
                {heights.map((h) => (
                  <label
                    key={h}
                    className={`${styles.option} ${
                      height === h ? styles.optionActive : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="height"
                      value={h}
                      checked={height === h}
                      onChange={() => setParam("hoogte", h)}
                      className={styles.radio}
                    />
                    <div className={styles.optionText}>
                      <span className={styles.optionTitle}>
                        {heightInfo[h].label}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Breedte</legend>
              <div className={styles.options}>
                {widths.map((w) => (
                  <label
                    key={w}
                    className={`${styles.option} ${
                      width === w ? styles.optionActive : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="width"
                      value={w}
                      checked={width === w}
                      onChange={() => setParam("breedte", w)}
                      className={styles.radio}
                    />
                    <div className={styles.optionText}>
                      <span className={styles.optionTitle}>
                        {widthInfo[w].label}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Montagezijde</legend>
              <div className={styles.options}>
                {sides.map((s) => (
                  <label
                    key={s}
                    className={`${styles.option} ${
                      side === s ? styles.optionActive : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="side"
                      value={s}
                      checked={side === s}
                      onChange={() => setParam("zijde", s)}
                      className={styles.radio}
                    />
                    <div className={styles.optionText}>
                      <span className={styles.optionTitle}>
                        {sideInfo[s].label}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Antislip</legend>
              <div className={styles.options}>
                {antislips.map((a) => (
                  <label
                    key={a}
                    className={`${styles.option} ${
                      antislip === a ? styles.optionActive : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="antislip"
                      value={a}
                      checked={antislip === a}
                      onChange={() => setParam("antislip", a)}
                      className={styles.radio}
                    />
                    <div className={styles.optionText}>
                      <span className={styles.optionTitle}>
                        {antislipInfo[a].label}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <aside className={styles.summary} aria-live="polite">
            <figure className={styles.preview}>
              <SmoothImage
                key={mainImageUrl}
                src={mainImageUrl}
                alt={previewAlt}
                className={styles.previewImg}
                wrapperClassName={styles.previewImgWrap}
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
              />
              <figcaption className={styles.previewCaption}>
                {woodInfo[wood].label} · {heightInfo[height].label} ·{" "}
                {widthInfo[width].label}
                {antislip === "yes" ? " · met antislip-detail" : ""}
              </figcaption>
            </figure>

            <h2 className={styles.summaryTitle}>Jouw configuratie</h2>
            <dl className={styles.specs}>
              <div>
                <dt>Afwerking</dt>
                <dd>{woodInfo[wood].label}</dd>
              </div>
              <div>
                <dt>Hoogte</dt>
                <dd>{heightInfo[height].label}</dd>
              </div>
              <div>
                <dt>Breedte</dt>
                <dd>{widthInfo[width].label}</dd>
              </div>
              <div>
                <dt>Montage</dt>
                <dd>{sideInfo[side].label}</dd>
              </div>
              <div>
                <dt>Antislip</dt>
                <dd>{antislip === "yes" ? "Ja" : "Nee"}</dd>
              </div>
            </dl>
            <div className={styles.priceBox}>
              <span className={styles.priceLabel}>Indicatieve prijs</span>
              <p className={styles.price}>
                {price.toLocaleString("nl-NL", {
                  style: "currency",
                  currency: "EUR",
                })}
              </p>
              <p className={styles.disclaimer}>
                Incl. btw. Levertijd o.a. 4–6 werkweken (volgens shop). Demo —
                geen bestelling.
              </p>
            </div>
            <a
              href={foldawayProductUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.btnShop}
            >
              Bekijk op prijzentrappen.nl
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
}
