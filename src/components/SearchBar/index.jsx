import React from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './style.module.scss';

export default function index({ query, setQuery, placeholder = 'Search..', width }) {
    return (
        <div className={styles.searchBarContainer} style={{width:width}}>
            <FaSearch className={styles.searchIcon} />
            <input
                type='text'
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={styles.searchInput}
            />
        </div>
    );
}
