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



// src/pages/LinkedInCallback/LinkedInCallback.jsx
// import React, { useEffect } from 'react';
// import { LinkedInCallback } from 'react-linkedin-login-oauth2';
// import { useNavigate } from 'react-router-dom';

// export default function LinkedInCallbackPage() {
//   const navigate = useNavigate();

  
//   return <>  
//   <div>11111111111111</div>

  
//     <LinkedInCallback
//       onSuccess={async (code) => {
//         console.log('הצלחנו! קיבלנו קוד:', code);
//         fetch('http://localhost:4000/auth/linkedin/token', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ code }),
//         });
//         const data = await resp.json();
//         console.log('data from server:', data);
//         // למשל: לשמור context, redux או להכניס ל־localStorage
//         navigate('/', { state: { user: data } });
//       }}
//       onError={error => {
//         console.log('שגיאה בהתחברות עם לינקדין:', error);
//         console.error('LinkedIn login failed:', error);
//         if (error.error === 'user_cancelled_login') {
//           navigate('/login', { state: { message: 'התחברות בוטלה.' } });
//         } else {
//           navigate('/login', { state: { message: 'התחברות נכשלת. נסה שוב.' } });
//         }
//       }}
//     />


//   </>
// }
