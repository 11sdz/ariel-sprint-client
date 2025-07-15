import React, { useEffect, useState } from 'react';
import { MdPeopleAlt } from 'react-icons/md';
import SearchBar from '../../components/SearchBar';
import styles from './style.module.scss';
import MembersTable from '../../components/MembersTable';
// import { members } from '../Members/members';
import FilterSidebar from '../../components/FilterSidebar';
import { filterGroups } from '../../utils/Members/memberUtils';
import { useApi } from '../../hooks/useApi';

export default function index() {

    const { data, loading, error, refetch } = useApi("/api/members");

    console.log("dataaa", data)
    const [query, setQuery] = useState('');
    // const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);

    useEffect(() => {
        if (!data) {
            setResults([]);
            return;
          }
        
        let filtered = data

       if (query.trim()) {
        const lowerQuery = query.toLowerCase();
        filtered = filtered.filter(
            (item) =>
                item.full_name.toLowerCase().includes(lowerQuery) ||
                item.email.toLowerCase().includes(lowerQuery) ||
                item.job_history[0].company_name.toLowerCase().includes(lowerQuery) ||
                item.job_history[0].role.toLowerCase().includes(lowerQuery) ||
                item.city.toLowerCase().includes(lowerQuery)
        );
    }

    if (selectedGroups.length > 0) {
        filtered = filtered.filter(
            (item) => item.groups && item.groups.some(group => selectedGroups.includes(group.community_name))
        );
    }

        setResults(filtered);
    }, [data, query, selectedGroups]);

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
