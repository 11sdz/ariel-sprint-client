import React, { useState } from 'react';
import { MdPeopleAlt } from 'react-icons/md';
import SearchBar from '../../components/SearchBar';
import styles from './style.module.scss';
import { FaFilter } from 'react-icons/fa';
import { getInitials } from '../../utils/Profile/profileUtils';
import MembersTable from '../../components/MembersTable';

export default function index() {
    const [query, setQuery] = useState('');
    const [initials, setInitials] = useState(getInitials(name));

    return (
        <div className={styles.membersPage}>
            <div className={styles.headerTitles}>
                <div className={styles.headerMainTitle}>Community Members</div>
                <div className={styles.headerSecondTitle}>Manage and explore member profiles</div>
            </div>

            <div className={styles.mainTable}>
                <div className={styles.tableHeader}>
                    <div>
                        <MdPeopleAlt />
                        Member Directory
                    </div>
                    <div>
                        <SearchBar query={query} setQuery={setQuery} />
                    </div>
                    <button className={styles.filterButton}>
                        <FaFilter className={styles.filterIcon} />
                    </button>
                </div>
                <MembersTable/>
            </div>
        </div>
    );
}
