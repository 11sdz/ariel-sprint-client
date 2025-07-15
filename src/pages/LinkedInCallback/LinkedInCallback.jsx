// src/pages/LinkedInCallback/LinkedInCallback.jsx
import React, { useEffect } from 'react';

export default function LinkedInCallback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');

    // שלח את הקוד או השגיאה לחלון הראשי (opener)
    if (window.opener) {
      window.opener.postMessage(
        { code, error },
        window.location.origin
      );
      setTimeout(() => window.close(), 100); // תן זמן למסירה
    }
  }, []);

  return <div>Logging you in...</div>;
}
