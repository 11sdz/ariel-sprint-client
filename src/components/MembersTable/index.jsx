import React, { useState } from 'react';
import styles from './style.module.scss';
import ProfileImage from '../Profile/ProfileImage';
import { getInitials } from '../../utils/Profile/profileUtils';
import { BsSuitcaseLg } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';
import { Chip, Popover } from '@mui/material';
import ProfileCard from '../Profile/ProfileCard';
import { useNavigate } from 'react-router-dom';
import AddIconButton from '../AddIconButton';
import GroupsAiPopup from '../GroupsAiPopup/index'

export default function MembersTable({ membersResult, onGroupsUpdated }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openProfilePopover, setOpenCardPopover] = useState(false);
    const [activeProfilePopover, setActiveProfilePopover] = useState('');

    const nav = useNavigate();

    function handleOpenProfilePopover(event, profile) {
        setAnchorEl(event.currentTarget); // set clicked element as anchor
        setOpenCardPopover(true);
        setActiveProfilePopover(profile);
    }

    function handleCloseProfilePopover() {
        setOpenCardPopover(false);
        setActiveProfilePopover('');
    }

    function handleOnClick(id) {
        nav(`/profile/${id}`);
    }

    return (
        <div>
            {' '}
            <div className={styles.tableWrapper}>
                <table className={styles.tableContainer}>
                    <thead className={styles.theadContainer}>
                        <tr className={styles.trContainer}>
                            <th>Member</th>
                            <th>Company & Role</th>
                            <th>Location</th>
                            <th>Groupes</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbodyContainer}>
                        {membersResult.map((item, index) => {
                            const memberId = item.id;
                            return (
                                <tr key={index}>
                                    <td>
                                        <div
                                            className={styles.memberContainer}
                                            onClick={(e) => handleOpenProfilePopover(e, item)}
                                        >
                                            <div className={styles.profileImg}>
                                                <ProfileImage
                                                    initials={getInitials(item.full_name)}
                                                    src={item.profile_img}
                                                    width={'25px'}
                                                    height={'25px'}
                                                    fontSize={'25px'}
                                                />
                                            </div>
                                            <div className={styles.memberData} onClick={() => handleOnClick(item.id)}>
                                                {item.full_name}
                                                <div className={styles.secondTd}>{item.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.memberContainer}>
                                            <div className={styles.locationIcon}>
                                                <BsSuitcaseLg />
                                            </div>
                                            <div className={styles.memberData}>
                                                {item.job_history[0].company_name}
                                                <div className={styles.secondTd}>{item.job_history[0].role}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.locationMember}>
                                            <div className={styles.locationIcon}>
                                                <IoLocationOutline />
                                            </div>
                                            {item.city}
                                        </div>
                                    </td>
                                    <td>
                                        {item.groups.map((g, i) => (
                                            <Chip
                                                key={g.community_name + i}
                                                label={g.community_name}
                                                size='small'
                                                color='primary'
                                                sx={{
                                                    marginRight: '4px',
                                                    marginBottom: '4px',
                                                    fontSize: '10px',
                                                    height: '20px',
                                                }}
                                            />
                                        ))}{' '}
                                    </td>
                                    <td>
                                        <AddIconButton
                                            title='Suggest groups with AI'
                                            PopupComponent={GroupsAiPopup}
                                            popupProps={{ memberId , onGroupsUpdated }}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <Popover
                open={openProfilePopover}
                anchorEl={anchorEl}
                onClose={handleCloseProfilePopover}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                slotProps={{
                    sx: { p: 0 }, // optional styling: remove padding
                }}
            >
                {activeProfilePopover && <ProfileCard profileData={activeProfilePopover} />}
            </Popover>
        </div>
    );
}
