import React, { useState } from "react";
import styles from "./style.module.scss"


export default function ProfileImage({ gradient, width , height, fontSize}) {
  const bgGradient = gradient.gender === 'Female'
  ? 'linear-gradient(to bottom right, #ec4899, #FFFA8D)'
  : 'linear-gradient(to bottom right, #3b82f6, #10b981)';

return (
  <span
    style={{width:width, height:height, fontSize:fontSize, backgroundImage: bgGradient}}
    className={styles.circleImage}
    aria-label={`Profile initials ${gradient.initials}`}
  >
    {gradient.initials}
  </span>
);
}
