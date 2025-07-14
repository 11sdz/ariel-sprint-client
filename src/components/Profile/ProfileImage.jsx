import React, { useState } from "react";
import styles from "./style.module.scss"
import { getInitials } from "../../utils/Profile/profileUtils";



export default function ProfileImage({ fullName }) {

return (
  <span
    className={styles.circleImage}
    aria-label={`Profile initials ${getInitials(fullName)}`}
  >
    {getInitials(fullName)}
  </span>
);
}
