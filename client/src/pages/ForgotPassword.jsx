// // src/pages/ForgotPassword.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import './Login.css'; 

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [newPassword, setNewPassword] = useState('');

//   const handleReset = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5002/reset-password', { email, newPassword });
//       toast.success('Password reset successful!');
//       setEmail('');
//       setNewPassword('');
//     } catch (err) {
//       toast.error(err.response?.data?.msg || 'Reset failed');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h3>🔑 Forgot Password</h3>
//       <form onSubmit={handleReset}>
//         <input
//           type="email"
//           className="form-control my-2"
//           placeholder="Enter your registered email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           className="form-control my-2"
//           placeholder="Enter new password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           required
//         />
//         <button type="submit" className="btn btn-warning">Reset Password</button>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import '../styles/Login.css'; // same CSS used for centered popup

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const navigate = useNavigate();

//   const handleReset = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5002/reset-password', {
//         email,
//         newPassword,
//       });
//       toast.success('Password reset successful!');
//       navigate('/login');
//     } catch (err) {
//       toast.error(err.response?.data?.msg || 'Reset failed');
//     }
//   };

//   return (
//     <div className="login-popup-overlay">
//       <div className="login-popup-box">
//         <h4 className="text-center mb-3">🔐 Forgot Password</h4>
//         <form onSubmit={handleReset}>
//           <div className="mb-3">
//             <label>Email:</label>
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Enter your registered email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label>New Password:</label>
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Enter new password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button type="submit" className="btn btn-warning w-100">
//             Reset Password
//           </button>

//           <div className="text-center mt-2">
//             <button
//               className="btn btn-sm btn-outline-dark"
//               type="button"
//               onClick={() => navigate('/')}
//             >
//               Back to Home
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

