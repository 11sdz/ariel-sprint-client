import React, { useState } from 'react'

export default function ProfileForm() {
    const [isEditEnabled,setIsEditEnabled]= useState(true);
  return (
    <div>ProfileForm
        <button onClick={(isEditEnabled)=>}>Edit</button>
        <label>Name
            <input
                type='text'
                value={fullName}
                onChange={(e)=>setFullName(e.target.value)}
                disabled={isEditEnabled}
            />
        </label>
    </div>
  )
}
