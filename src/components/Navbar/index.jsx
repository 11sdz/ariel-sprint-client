import React from 'react'
import styles from "./style.module.scss"


export default function Navbar() {
      const navbarItems = [
        { label: "Dashboard", href: "/" },
        { label: "Members", href: "/members" },
        { label: "Profile", href: "/profile" },
        { label: "Connections", href: "/connections" },
        { label: "Discover", href: "/discover" },
        { label: "AI Matching", href: "/aiMatching" },
    ];
    
    return (
        <div >
          <h1>navbar</h1> 
          <nav className={styles.sidebar} >
            
            {navbarItems.map((item, index) => (
                <a className={styles.link}
                    key={index.id}
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                >
                    {item.label}
                </a>
            ))}
            </nav>
        </div>
    );

}
