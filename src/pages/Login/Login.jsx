// src/pages/Login/Login.jsx
import React from 'react';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';

export default function Login() {
  const linkedInLogin = () => {
    const clientId = '77jh3o5tez8hde';
    const redirectUri = encodeURIComponent('http://localhost:5173/linkedin/callback');
    const state = Math.random().toString(36).substring(2, 15); // אופציונלי: תוכל לשמור אותו ולבדוק בתגובה
    const scope = 'openid profile email';
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
    
    // פותח פופאפ
    const popup = window.open(authUrl, 'LinkedInLogin', 'width=600,height=700');
    if (!popup) {
      alert('Popup blocked. Please allow popups and try again.');
      return;
    }

    // מאזין לקוד מהפופאפ
    const listener = (event) => {
      if (event.origin !== window.location.origin) return; // הגנה
      const { code, error } = event.data;
      if (code) {
        // שלח קוד לשרת
        fetch('http://localhost:4000/auth/linkedin/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        })
          .then(r => r.json())
          .then(data => {
            // תבצע מה שאתה רוצה עם data (להתחבר, לשמור ב-localStorage, וכו')
            window.location.href = '/'; // או נווט עם useNavigate
          });
      }
      if (error) {
        alert('LinkedIn login failed: ' + error);
      }
      window.removeEventListener('message', listener); // הסר מאזין
    };

    window.addEventListener('message', listener);
  };
  //  return (
  //   <img
  //     src={linkedin}
  //     alt="Sign in with LinkedIn"
  //     style={{
  //       cursor: 'pointer',
  //       width: 200, // או כל גודל שאתה רוצה
  //       display: 'block',
  //       margin: '40px auto', // מרכז את התמונה
  //       transition: 'filter 0.2s'
  //     }}
  //     onClick={linkedInLogin}
  //     onMouseOver={e => (e.currentTarget.style.filter = 'brightness(0.85)')}
  //     onMouseOut={e => (e.currentTarget.style.filter = 'brightness(1)')}
  //   />
  // );
  return <img src={linkedin} onClick={linkedInLogin} alt="Sign in with LinkedIn" style={{ cursor: 'pointer' }} />;
}



// src/pages/Login/Login.jsx
// import React from 'react';
// import { useLinkedIn } from 'react-linkedin-login-oauth2';
// import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
// import { useNavigate } from 'react-router-dom';

// export default function Login() {
//   const nav = useNavigate();
//   const { linkedInLogin } = useLinkedIn({
//     clientId: '77jh3o5tez8hde',
//     redirectUri: 'http://localhost:5173/linkedin/callback',
//     scope: 'openid profile email',

//     onSuccess: code => {
//       localStorage.setItem('linkedinCode', code);
//     }
//     //   log('הצלחנו! קיבלנו קוד:', code);
//     //   fetch('http://localhost:4000/auth/linkedin/token', {
//     //     method: 'POST',
//     //     headers: { 'Content-Type': 'application/json' },
//     //     body: JSON.stringify({ code }),
//     //   })
//     //     .then(r => r.json())
//     //     .then(console.log);
//     // },
//     // onError: (error) => {
//     //   console.error('שגיאה או ביטול:', error);
//     // },
//     // onError: error => {
//     //   // error object looks like: { error: 'user_cancelled_login', errorMessage: 'User closed the popup' }
//     //   console.error('LinkedIn OAuth error', error);

//     //   if (error.error === 'user_cancelled_login') {
//     //     alert('התחברות בוטלה על‑ידי המשתמש.');
//     //   } else if (error.error === 'access_denied') {
//     //     alert('המשתמש סירב לתת הרשאות.');
//     //   } else {
//     //     alert('אירעה שגיאה בהתחברות עם לינקדין, אנא נסה שוב.');
//     //   }
//     // },

//   });

//   return <img src={linkedin} onClick={linkedInLogin} alt="Sign in with LinkedIn" style={{ cursor: 'pointer' }} />;
// }
