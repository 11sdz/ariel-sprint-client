import React from 'react';
import styles from './style.module.scss';
import { members } from '../../pages/Members/members';
import ProfileImage from '../Profile/ProfileImage';
import { getInitials } from '../../utils/Profile/profileUtils';
import { BsSuitcaseLg } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";


export default function MembersTable() {
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
                            <th>Expertise</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbodyContainer}>
                        {members.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <div className={styles.memberContainer}>
                                        <div className={styles.profileImg}>
                                            <ProfileImage
                                                initials={getInitials(item.member.name)}
                                                width={'30px'}
                                                height={'30px'}
                                                fontSize={'15px'}
                                            />
                                        </div>
                                        <div className={styles.memberData}>
                                            {item.member.name}
                                            <div className={styles.secondTd}>{item.member.email}</div>
                                        </div>
                                        </div>
                                    </td>
                                    <td >
                                        <div className={styles.memberContainer}>
                                        <div className={styles.locationIcon}><BsSuitcaseLg/></div>
                                        <div className={styles.memberData}>
                                        {item.company}
                                        <div className={styles.secondTd}>{item.role}</div>
                                        </div>
                                        </div>
                                    </td>
                                    <td><div className={styles.locationMember}><div className={styles.locationIcon}><IoLocationOutline/></div>{item.location}</div></td>
                                    <td>{item.expertise}</td>
                                    <td>{item.status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
