import React from 'react';
import styles from './style.module.scss';
import ProfileImage from '../Profile/ProfileImage';
import { getInitials } from '../../utils/Profile/profileUtils';
import { BsSuitcaseLg } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';
import { Chip } from '@mui/material';

export default function MembersTable({ membersResult }) {
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
                        </tr>
                    </thead>
                    <tbody className={styles.tbodyContainer}>
                        {membersResult.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <div className={styles.memberContainer}>
                                            <div className={styles.profileImg}>
                                                <ProfileImage
                                                    initials={getInitials(item.fullName)}
                                                    src={item.profileImage}
                                                    width={'25px'}
                                                    height={'25px'}
                                                    fontSize={'25px'}
                                                />
                                            </div>
                                            <div className={styles.memberData}>
                                                {item.fullName}
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
                                                {item.jobHistory[0].companyName}
                                                <div className={styles.secondTd}>{item.jobHistory[0].jobTitle}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.locationMember}>
                                            <div className={styles.locationIcon}>
                                                <IoLocationOutline />
                                            </div>
                                            {item.location.city}
                                        </div>
                                    </td>
                                    <td>
                                        {item.groups.map((g, i) => (
                                            <Chip
                                                key={g + i}
                                                label={g}
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
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
