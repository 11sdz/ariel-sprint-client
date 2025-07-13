import React, { useState } from 'react';

export default function ProfileForm() {
  const [isEditEnabled, setIsEditEnabled] = useState(true);
  const [fullName, setFullName] = useState("John Doe");

  return (
    <div>
      <h2>ProfileForm</h2>

      <button onClick={() => setIsEditEnabled(!isEditEnabled)}>
        {isEditEnabled ? 'Disable Edit' : 'Enable Edit'}
      </button>

      <label>
        Name:{' '}
        <input
          type='text'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={!isEditEnabled}
        />
      </label>
    </div>
  );
}
