import { useState, type ImgHTMLAttributes } from "react";
import styles from "./SmoothImage.module.css";

type SmoothImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  wrapperClassName?: string;
  skeletonClassName?: string;
};

export function SmoothImage({
  wrapperClassName = "",
  skeletonClassName = "",
  className = "",
  onLoad,
  onError,
  alt = "",
  ...imgProps
}: SmoothImageProps) {
  const [isReady, setIsReady] = useState(false);

  return (
    <span
      className={`${styles.wrapper} ${wrapperClassName} ${
        isReady ? styles.ready : ""
      }`}
    >
      <span
        className={`${styles.skeleton} ${skeletonClassName}`}
        aria-hidden="true"
      />
      <img
        {...imgProps}
        alt={alt}
        className={`${styles.image} ${className}`}
        onLoad={(event) => {
          setIsReady(true);
          onLoad?.(event);
        }}
        onError={(event) => {
          setIsReady(true);
          onError?.(event);
        }}
      />
    </span>
  );
}
