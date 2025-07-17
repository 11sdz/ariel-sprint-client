import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, CircularProgress, Typography } from '@mui/material';
import { useApi } from '../../hooks/useApi';
import SuggestionsGroup from '../SuggestionsGroup/index';

export default function GroupAiPopup({ open, onClose, memberId, onGroupsUpdated }) {
    const basicUrl = `/api/members/${memberId}`;

    const { data: suggestionsData, loading, error, refetch } = useApi(`${basicUrl}/suggestedGroups`);
    const { data: memberData, loading: memberLoading, error: memberError } = useApi(basicUrl);

    const [parsedSuggestions, setParsedSuggestions] = useState(null);
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        if (!open) return;

        setShowLoading(true);

        const timeout = setTimeout(() => {
            setShowLoading(false);
        }, 1500);

        return () => clearTimeout(timeout);
    }, [open]);

    useEffect(() => {
        if (suggestionsData?.suggestions) {
            try {                
                let suggestionsRaw = suggestionsData.suggestions;
                if (typeof suggestionsRaw === 'string') {
                    const cleaned = suggestionsRaw.replace(/```json|```/g, '').trim();
                    setParsedSuggestions(JSON.parse(cleaned));
                } else {
                    setParsedSuggestions(suggestionsRaw);
                }
            } catch (err) {
                console.error('Failed to parse suggestions JSON:', err);
                setParsedSuggestions(null);
            }
        }
    }, [suggestionsData]);
    

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogContent dividers>
                {(showLoading || loading || memberLoading) && (
                    <>
                        <DialogTitle>
                            AI is getting the right groups for {`${memberData?.full_name}...` || '...'}
                        </DialogTitle>
                        <DialogContent dividers>
                            <CircularProgress />
                        </DialogContent>
                    </>
                )}

                {(error || memberError) && (
                    <Typography color='error'>{error?.message || memberError?.message}</Typography>
                )}

                {!showLoading && !loading && !memberLoading && parsedSuggestions && (
                    <SuggestionsGroup
                        memberId={memberId}
                        existingGroups={parsedSuggestions.existingGroups}
                        newGroups={parsedSuggestions.newGroups}
                        onClose={onClose} 
                        memberGroups={memberData.groups}
                        onGroupsUpdated={onGroupsUpdated}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}
