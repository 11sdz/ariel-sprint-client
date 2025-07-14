import React, { useState } from "react";
import styles from "./style.module.scss"
import { getInitials } from "../../utils/Profile/profileUtils";



export default function ProfileImage({ fullName }) {

  
return (
  <span
    style={{width:width, height:height, fontSize:fontSize, backgroundImage: bgGradient}}
    className={styles.circleImage}
    aria-label={`Profile initials ${getInitials(fullName)}`}
  >
    {getInitials(fullName)}
  </span>
);
}
