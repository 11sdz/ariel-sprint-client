import React, { useEffect, useState } from 'react';
import { MdPeopleAlt } from 'react-icons/md';
import SearchBar from '../../components/SearchBar';
import styles from './style.module.scss';
import MembersTable from '../../components/MembersTable';
// import { members } from '../Members/members';
import FilterSidebar from '../../components/FilterSidebar';
import { filterGroups } from '../../utils/Members/memberUtils';
import { useApi } from '../../hooks/useApi';
import { Button, Drawer } from '@mui/material';

export default function index() {
    const {
        data: membersData,
        loading: membersLoading,
        error: membersError,
        refetch: refetchMembers,
    } = useApi('/api/members');
    const {
        data: groupsData,
        loading: groupsLoading,
        error: groupsError,
        refetch: refetchGroups,
    } = useApi('/api/groups');
    const [query, setQuery] = useState('');
    // const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);

    useEffect(() => {
        if (!membersData) {
            setResults([]);
            return;
        }

        let filtered = membersData;

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
                (item) => item.groups && item.groups.some((group) => selectedGroups.includes(group.community_name))
            );
        }

        setResults(filtered);
    }, [membersData, query, selectedGroups]);

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
                            <SearchBar
                                query={query}
                                setQuery={setQuery}
                                placeholder={'Search members, companies, expertise...'}
                                width={'400px'}
                            />
                        </div>
                    </div>
                    <MembersTable membersResult={results} />
                </div>
            </div>
            <div className={styles.sidebar}>
                <FilterSidebar
                    label='Groups'
                    options={groupsData?.map((group) => group.community_name) || []}
                    selected={selectedGroups}
                    setSelected={setSelectedGroups}
                />
            </div>
        </div>
    );
}
