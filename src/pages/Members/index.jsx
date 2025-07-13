import React, { useState } from 'react';
import { MdPeopleAlt } from 'react-icons/md';
import SearchBar from '../../components/SearchBar';
import styles from './style.module.scss';
import { FaFilter } from 'react-icons/fa';
const members = [
  {
    member: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com"
    },
    company: "TechNova Inc.",
    role: "Frontend Developer",
    location: "New York, NY",
    expertise: "React, JavaScript",
    status: "Active"
  },
  {
    member: {
      name: "Bob Lee",
      email: "bob.lee@example.com"
    },
    company: "CloudSync",
    role: "DevOps Engineer",
    location: "San Francisco, CA",
    expertise: "AWS, Kubernetes",
    status: "Inactive"
  },
  {
    member: {
      name: "Clara Smith",
      email: "clara.smith@example.com"
    },
    company: "FinEdge",
    role: "Product Manager",
    location: "Chicago, IL",
    expertise: "Agile, Roadmapping",
    status: "Active"
  },
  {
    member: {
      name: "David Kim",
      email: "david.kim@example.com"
    },
    company: "AIlytics",
    role: "ML Engineer",
    location: "Austin, TX",
    expertise: "Python, TensorFlow",
    status: "Onboarding"
  },
  {
    member: {
      name: "Ella Zhang",
      email: "ella.zhang@example.com"
    },
    company: "CyberSecure",
    role: "Security Analyst",
    location: "Seattle, WA",
    expertise: "Network Security, Compliance",
    status: "Active"
  }
];

export default function index() {
    const [query, setQuery] = useState('');

    return (
        <div className={styles.membersPage}>
            <div className={styles.headerTitles}>
                <div className={styles.headerMainTitle}>Community Members</div>
                <div className={styles.headerSecondTitle}>Manage and explore member profiles</div>
            </div>

            <div className={styles.mainTable}>
                <div className={styles.tableHeader}>
                    <div>
                        <MdPeopleAlt />
                        Member Directory
                    </div>
                    <div>
                        <SearchBar query={query} setQuery={setQuery} />
                    </div>
                    <button className={styles.filterButton}>
                        <FaFilter className={styles.filterIcon} />
                    </button>
                </div>

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
                                        {item.member.name}
                                        <br />
                                        {item.member.email}
                                    </td>
                                    <td>
                                        {item.company}
                                        <br />
                                        {item.role}
                                    </td>
                                    <td>{item.location}</td>
                                    <td>{item.expertise}</td>
                                    <td>{item.status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    );
}
