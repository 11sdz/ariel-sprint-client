import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useApi } from '../../hooks/useApi';

export default function GroupPopup({ open, onClose }) {
    const [formData, setFormData] = useState({
        community_name: '',
        description: '',
    });

    // const [requestBody, setRequestBody] = useState(null);

    const { data: groupsData, loading: groupsLoading, error: groupsError, refetch } = useApi('/api/groups', {
      method: 'POST',
      body: formData,
      immediate: false,
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleCreate = () => {
        refetch();
    };
  

    useEffect(() => {
       if(groupsData) {
        console.log('Response from server', groupsData);
        onClose();
       }
      }, [groupsData, onClose]);
    

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create New Group</DialogTitle>
            <DialogContent>
                <TextField
                    label='Group Name'
                    fullWidth
                    margin='normal'
                    name='community_name'
                    value={formData.community_name}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label='Description'
                    fullWidth
                    margin='normal'
                    multiline
                    rows={3}
                    name='description'
                    value={formData.description}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleCreate} variant='contained'>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}
