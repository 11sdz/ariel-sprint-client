import React from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './style.module.scss';

export default function index({ query, setQuery }) {

    return (
        <div className={styles.searchBarContainer}>
                <FaSearch className={styles.searchIcon} />
                <input
                    type='text'
                    placeholder='Search members, companies, expertise...'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={styles.searchInput}
                />
        </div>
    );
}
