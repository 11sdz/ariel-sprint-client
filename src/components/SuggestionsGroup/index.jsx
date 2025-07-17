import React, { useState, useEffect } from 'react';
import { Box, Typography, Chip, Button } from '@mui/material';
import { useApi } from '../../hooks/useApi';

export default function GroupSuggestions({
    existingGroups,
    newGroups,
    memberId,
    onClose,
    memberGroups,
    onGroupsUpdated,
}) {
    const [selected, setSelected] = useState([]);
    const [hasUpdated, setHasUpdated] = useState(false);

    const {
        data: memberData,
        loading: memberLoading,
        error: memberError,
        mutate,
    } = useApi(`/api/members/${memberId}/groups`, {
        method: 'PATCH',
        immediate: false,
    });

    const handleToggle = (group) => {
        const isSelected = selected.some((g) => g.groupName === group.groupName);
        if (isSelected) {
            setSelected(selected.filter((g) => g.groupName !== group.groupName));
        } else {
            setSelected([...selected, group]);
        }
    };

    const handleAddClick = async () => {
        setHasUpdated(false);
        const existingGroupIds = new Set(memberGroups.map((g) => g.id));
        const newSelectedGroupIds = selected.map((g) => g.id).filter((id) => !existingGroupIds.has(id));

        if (newSelectedGroupIds.length === 0) {
            if (onClose) onClose();
            return;
        }
        await mutate({ groupIds: newSelectedGroupIds });

        onGroupsUpdated?.();
    };

    useEffect(() => {
        if (memberData && !memberLoading && !memberError && hasUpdated === false) {
            setHasUpdated(true);
            if (onClose) onClose();
        }
    }, [memberData, memberLoading, memberError, hasUpdated, onClose]);

    useEffect(() => {
        if (memberError) {
            console.error('Failed to update groups', memberError);
        }
    }, [memberError]);

    // סינון קבוצות שהמשתמש כבר חבר בהן לפי ID
    const memberGroupIds = new Set(memberGroups?.map(g => g.id) || []);
    const groupsToSuggest = existingGroups.filter(g => !memberGroupIds.has(g.id));

    const renderChips = (groups) => (
        <Box display='flex' flexWrap='wrap' gap={1} mt={1}>
            {groups.map((group, idx) => {
                const isSelected = selected.some((g) => g.groupName === group.groupName);
                return (
                    <Chip
                        key={idx}
                        label={group.groupName}
                        color={isSelected ? 'primary' : 'default'}
                        variant={isSelected ? 'filled' : 'outlined'}
                        onClick={() => handleToggle(group)}
                        clickable
                    />
                );
            })}
        </Box>
    );

    return (
        <Box>
            {groupsToSuggest.length > 0 && (
                <>
                    <Typography variant='h6'>Suggested Groups to Join</Typography>
                    {renderChips(groupsToSuggest)}
                </>
            )}

            {/* {newGroups?.length > 0 && (
                <>
                    <Typography variant='h6' mt={2}>
                        New Groups to Consider
                    </Typography>
                    {renderChips(newGroups)}
                </>
            )} */}

            {selected.length > 0 && (
                <Box mt={3} textAlign='center'>
                    <Button variant='contained' onClick={handleAddClick} disabled={memberLoading}>
                        {memberLoading ? 'Adding...' : `Add (${selected.length})`}
                    </Button>
                </Box>
            )}
        </Box>
    );
}
