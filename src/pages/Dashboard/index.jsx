import React from 'react'
import DashboardCard from '../../dashboardCard'
import styles from './style.module.scss';
export default function index() {
  return (
    <div><DashboardCard title={"titlee"} amount={50} precentChange={20} description={"dumy description"}/></div>
  )
}
