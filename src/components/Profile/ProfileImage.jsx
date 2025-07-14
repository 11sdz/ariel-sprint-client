import React, { useState } from "react";
import styles from "./style.module.scss"


export default function ProfileImage({ src, initials, width , height, fontSize}) {
 const [imgError, setImgError] = useState(false);

  return(
    <span
    style={{width:width, height:height, fontSize:fontSize}}
      className={styles.circleImage}
      aria-label={`Profile initials ${initials}`}
    >
      {initials}
    </span>
  );
}
