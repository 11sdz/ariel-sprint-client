import React, { useState } from "react";
import styles from "./style.module.scss"


export default function ProfileImage({ gradient }) {
  const bgGradient = gradient.gender === 'Female'
  ? 'linear-gradient(to bottom right, #ec4899, #FFFA8D)'
  : 'linear-gradient(to bottom right, #3b82f6, #10b981)';

return (
  <span
    className={styles.circleImage}
    style={{ backgroundImage: bgGradient }}
    aria-label={`Profile initials ${gradient.initials}`}
  >
    {gradient.initials}
  </span>
);
}
