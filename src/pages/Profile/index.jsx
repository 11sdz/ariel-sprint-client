import React from "react";
import ProfileCard from "../../components/Profile/ProfileCard";
import styles from "./style.module.scss"
import ProfileForm from "../../components/Profile/ProfileForm";

export default function index(

) {
    return <div className={styles.root}>
      <ProfileCard/>
      <ProfileForm/>
    </div>;
}
