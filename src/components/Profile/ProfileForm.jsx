import React, { useState } from "react";
import styles from "./style.module.scss";

export default function ProfileForm({ formData, setFormData }) {
    
    const [isEditEnabled, setIsEditEnabled] = useState(true);
    function handleChange(e) {
        const name = e.target.name; // e.g. "location.country"
        const value = e.target.value;

        if (name.includes(".")) {
            const keys = name.split("."); // ["location", "country"]

            setFormData((prev) => ({
                ...prev,
                [keys[0]]: {
                    ...prev[keys[0]],
                    [keys[1]]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    }

    return (
        <div className={styles.profileForm}>
            <button onClick={() => setIsEditEnabled(!isEditEnabled)}>
                {isEditEnabled ? "Disable Edit" : "Enable Edit"}
            </button>
            <form>
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={!isEditEnabled}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditEnabled}
                />

                <input
                    type="phone"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditEnabled}
                />

                <input
                    type="text"
                    name="linkedinURL"
                    placeholder="Linkedin Profile"
                    value={formData.linkedinURL}
                    onChange={handleChange}
                    disabled={!isEditEnabled}
                />

                <input
                    type="text"
                    name="facebookURL"
                    placeholder="Facebook Profile"
                    value={formData.facebookURL}
                    onChange={handleChange}
                    disabled={!isEditEnabled}
                />

                <input
                    type="text"
                    name="location.country"
                    placeholder="Country"
                    value={formData.location.country}
                    onChange={handleChange}
                    disabled={!isEditEnabled}
                />

                <input
                    type="text"
                    name="location.state"
                    placeholder="State"
                    value={formData.location.state}
                    onChange={handleChange}
                    disabled={!isEditEnabled}
                />

                <input
                    type="text"
                    name="location.city"
                    placeholder="City"
                    value={formData.location.city}
                    onChange={handleChange}
                    disabled={!isEditEnabled}
                />

                <select value={formData.gender} name="gender" onChange={handleChange}>
                    <option value="">Don't mention</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </form>
        </div>
    );
}
