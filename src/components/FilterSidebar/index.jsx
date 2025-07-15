import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import TagFilterGroup from '../TagFilterGroup';
import SearchBar from '../SearchBar/index';
import styles from './style.module.scss';

export default function FilterSidebar({ selected, setSelected, label = 'Groups', options = [] }) {
    const [query, setQuery] = useState('');

    const filteredOptions = options.filter((opt) => opt.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className={styles.sidebarContainer}>
            <Box
                sx={{
                    width: 250,
                    padding: 2,
                    borderRight: '1px solid #ddd',
                    height: '100vh',
                    position: 'sticky',
                    top: 0,
                    backgroundColor: '#fff',
                    overflowY: 'auto',
                }}
            >
                <SearchBar query={query} setQuery={setQuery} placeholder={'Search group name..'}/>
                <TagFilterGroup  options={filteredOptions} selected={selected} onChange={setSelected} />
            </Box>
        </div>
    );
}
