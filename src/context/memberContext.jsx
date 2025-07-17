import React, { createContext, useContext, useState, useEffect } from 'react';

const MemberContext = createContext(null);

export const MemberProvider = ({ children }) => {
  const [member, setMember] = useState(() => {
    // קרא מתוך localStorage בהתחלה
    const stored = localStorage.getItem('member');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    // כל פעם שהmember משתנה - תשמור ב-localStorage
    if (member) {
      localStorage.setItem('member', JSON.stringify(member));
    } else {
      localStorage.removeItem('member');
    }
  }, [member]);

  return (
    <MemberContext.Provider value={{ member, setMember }}>
      {children}
    </MemberContext.Provider>
  );
};

export const useMember = () => useContext(MemberContext);
