import React, { useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import styles from './style.module.scss';
import { Button, Tooltip } from '@mui/material';
import GroupPopup from '../GroupPopup';

export default function AddIconButton({ title, PopupComponent, popupProps = {}, iconSize = 20 }) {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.addContainer}>
            <Tooltip title={title} placement='bottom-end' arrow>
                <Button
                    size='small'
                    sx={{
                        minWidth: 'unset',
                        lineHeight: 1,
                        borderRadius: '50%',
                        minHeight: 'unset',
                        padding: '4px',
                    }}
                    onClick={() => setOpen(true)}
                >
                    <IoIosAddCircle size={iconSize} />
                </Button>
            </Tooltip>
            {PopupComponent && <PopupComponent open={open} onClose={() => setOpen(false)} {...popupProps} />}{' '}
        </div>
    );
}
