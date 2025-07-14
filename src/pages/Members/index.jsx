import React, { useEffect, useState } from 'react';
import { MdPeopleAlt } from 'react-icons/md';
import SearchBar from '../../components/SearchBar';
import styles from './style.module.scss';
import MembersTable from '../../components/MembersTable';
import { members } from '../Members/members';
import FilterSidebar from '../../components/FilterSidebar';
import { filterGroups } from '../../utils/Members/memberUtils';

export default function index() {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState(members);
    const [selectedGroups, setSelectedGroups] = useState([]);

    useEffect(() => {

        let filtered = members

       if (query.trim()) {
        const lowerQuery = query.toLowerCase();
        filtered = filtered.filter(
            (item) =>
                item.fullName.toLowerCase().includes(lowerQuery) ||
                item.email.toLowerCase().includes(lowerQuery) ||
                item.jobs_history[0].companyName.toLowerCase().includes(lowerQuery) ||
                item.jobs_history[0].role.toLowerCase().includes(lowerQuery) ||
                item.location.city.toLowerCase().includes(lowerQuery)
        );
    }

    if (selectedGroups.length > 0) {
        filtered = filtered.filter(
            (item) => item.groups && item.groups.some(group => selectedGroups.includes(group))
        );
    }

        setResults(filtered);
    }, [query, selectedGroups]);

    return (
        <div className={styles.membersPage}>
            <div className={styles.innerPage}>
                <div className={styles.headerTitles}>
                    <div className={styles.headerMainTitle}>Community Members</div>
                    <div className={styles.headerSecondTitle}>Manage and explore member profiles</div>
                </div>

                <div className={styles.mainTable}>
                    <div className={styles.tableHeader}>
                        <div className={styles.memberDirectory}>
                            <MdPeopleAlt />
                            Member Directory
                        </div>
                        <div className={styles.searchBar}>
                            <SearchBar query={query} setQuery={setQuery} />
                        </div>
                    </div>
                    <MembersTable membersResult={results} />
                </div>
            </div>
            <div className={styles.sidebar}>
                <FilterSidebar
                    label='Groups'
                    options={filterGroups()}
                    selected={selectedGroups}
                    setSelected={setSelectedGroups}
                />
            </div>
        </div>
    );
}
