import React, { useState } from "react";
import styles from "./style.module.scss"


export default function ProfileImage({ src, initials }) {
 const [imgError, setImgError] = useState(false);

  return(
    <span
      className={styles.circleImage}
      aria-label={`Profile initials ${initials}`}
    >
      {initials}
    </span>
  );
}
