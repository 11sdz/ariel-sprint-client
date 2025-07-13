import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import styles from './style.module.scss';


export default function Layout() {
  return (
    <div>
        <Navbar/>
        <main className={styles.mainContent}>
            <Outlet/>
        </main>
    </div>
  )
}
