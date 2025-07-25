// src/components/LinkedInLoginButton.jsx
import React from 'react';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
import { useNavigate } from 'react-router-dom';
import { useMember } from '../../context/memberContext';

export default function LinkedinButton() {
    const nav = useNavigate();
    const { member, setMember } = useMember();

    const linkedInLogin = () => {
        const clientId = '77jh3o5tez8hde';
        const redirectUri = encodeURIComponent('http://localhost:5173/linkedin/callback');
        const state = Math.random().toString(36).substring(2, 15);
        const scope = 'openid profile email';
        const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;

        const popup = window.open(authUrl, 'LinkedInLogin', 'width=600,height=700');
        if (!popup) {
            alert('Popup blocked. Please allow popups and try again.');
            return;
        }

        const listener = (event) => {
            if (event.origin !== window.location.origin) return;
            const { code, error } = event.data;
            if (code) {
                fetch('http://localhost:3000/api/auth/linkedin/token', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code }),
                })
                    .then((r) => r.json())
                    .then((data) => {
                        const memberData = { name: data.member.full_name, id: data.member.id };
                        localStorage.setItem('member', JSON.stringify(memberData));
                        nav('/');
                    });
            }
            if (error) {
                alert('LinkedIn login failed: ' + error);
            }
            window.removeEventListener('message', listener);
        };

        window.addEventListener('message', listener);
    };

    return (
        <img
            src={linkedin}
            alt='Sign in with LinkedIn'
            style={{
                cursor: 'pointer',
                width: 200,
                display: 'block',
                margin: '40px auto',
                transition: 'filter 0.2s',
            }}
            onClick={linkedInLogin}
            onMouseOver={(e) => (e.currentTarget.style.filter = 'brightness(0.85)')}
            onMouseOut={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
        />
    );
}

// // src/pages/Login/Login.jsx
// import React from 'react';
// import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
// import { useNavigate } from 'react-router-dom';
// export default function Login() {
//     const nav = useNavigate();
//    export const linkedInLogin = () => {
//         const clientId = '77jh3o5tez8hde';
//         const redirectUri = encodeURIComponent('http://localhost:5173/linkedin/callback');
//         const state = Math.random().toString(36).substring(2, 15); // אופציונלי: תוכל לשמור אותו ולבדוק בתגובה
//         const scope = 'openid profile email';
//         const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;

//         // פותח פופאפ
//         const popup = window.open(authUrl, 'LinkedInLogin', 'width=600,height=700');
//         if (!popup) {
//             alert('Popup blocked. Please allow popups and try again.');
//             return;
//         }

//         // מאזין לקוד מהפופאפ
//         const listener = (event) => {
//             if (event.origin !== window.location.origin) return; // הגנה
//             const { code, error } = event.data;
//             if (code) {
//                 // שלח קוד לשרת
//                 fetch('http://localhost:3000/api/auth/linkedin/token', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ code }),
//                 })
//                     .then((r) => r.json())
//                     .then((data) => {
//                         nav('/');
//                     });
//             }
//             if (error) {
//                 alert('LinkedIn login failed: ' + error);
//             }
//             window.removeEventListener('message', listener);
//         };

//         window.addEventListener('message', listener);
//     };
//     return (
//         <img
//             src={linkedin}
//             alt='Sign in with LinkedIn'
//             style={{
//                 cursor: 'pointer',
//                 width: 200,
//                 display: 'block',
//                 margin: '40px auto',
//                 transition: 'filter 0.2s',
//             }}
//             onClick={linkedInLogin}
//             onMouseOver={(e) => (e.currentTarget.style.filter = 'brightness(0.85)')}
//             onMouseOut={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
//         />
//     );
//     // return <img src={linkedin} onClick={linkedInLogin} alt="Sign in with LinkedIn" style={{ cursor: 'pointer' }} />;
// }
