import React from 'react';
import styles from './style.module.scss';

export default function DashboardCard({ title, amount, precentChange, description, icon, iconColor }) {
  return (
    <div className={styles.dashboardCard}>
      <span className={styles.title}>{title}</span>
      <div className={styles.amountRow}>
        <span className={styles.amount}>{amount}</span>
        <span className={styles.percentChange}>{precentChange + "%"}</span>
      </div>
      <span>{description}</span>
    </div>
  );
}
