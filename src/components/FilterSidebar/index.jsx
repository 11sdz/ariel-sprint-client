import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import TagFilterGroup from '../TagFilterGroup';


export default function FilterSidebar({ selected, setSelected, label = 'Groups', options = [] }) {

    return (
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
            <TagFilterGroup label={label} options={options} selected={selected} onChange={setSelected} />
        </Box>
    );
}
