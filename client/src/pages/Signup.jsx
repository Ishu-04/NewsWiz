// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import './Login.css'; 

// const Signup = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPass, setShowPass] = useState(false);
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5002/signup', {
//         username,
//         email,
//         password,
//       });

//       if (res.data.token) {
//         toast.success('Signup successful! Please login.');
//         navigate('/login');
//       } else {
//         toast.warn('Signup succeeded but no token received.');
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.msg || 'Signup failed');
//     }
//   };

//   return (
//     <div className="d-flex flex-column min-vh-100 bg-light">
//       <div className="flex-grow-1 d-flex justify-content-center align-items-center">
//         <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
//           <h4 className="text-center mb-4">📝 Sign Up</h4>
//           <form onSubmit={handleSignup}>
//             <div className="mb-3">
//               <label>Username:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Your name"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required />
//             </div>
//             <div className="mb-3">
//               <label>Email address:</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 placeholder="you@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required />
//             </div>
//             <div className="mb-3">
//               <label>Password:</label>
//               <div className="input-group">
//                 <input
//                   type={showPass ? 'text' : 'password'}
//                   className="form-control"
//                   placeholder="••••••••"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required />
//                 <button
//                   type="button"
//                   className="btn btn-outline-secondary"
//                   onClick={() => setShowPass(!showPass)}
//                 >
//                   {showPass ? 'Hide' : 'Show'}
//                 </button>
//               </div>
//             </div>
//             <button type="submit" className="btn btn-success w-100">Sign Up</button>
//           </form>

//           <div className="text-center mt-3">
//             <span>Already have an account? </span>
//             <Link to="/login" className="text-decoration-none text-primary">Login</Link>
//           </div>

//           <div className="text-center mt-2">
//             <Link to="/" className="btn btn-sm btn-link text-secondary">← Back to Home</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;





// src/pages/Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Signup.css'; 

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

const handleSignup = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5002/signup', {
      username,
      email,
      password,
    });

    // Directly redirect to login after successful signup
    toast.success('Signup successful! Please login.');
    navigate('/login');

  } catch (err) {
    toast.error(err.response?.data?.msg || 'Signup failed');
  }
};


  return (
    <div className="signup-popup-overlay">
      <div className="signup-popup-box">
        <h4 className="text-center mb-4">📝 Sign Up</h4>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label>Username:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Email address:</label>
            <input
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password:</label>
            <div className="input-group">
              <input
                type={showPass ? 'text' : 'password'}
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-success w-100">
            Sign Up
          </button>
        </form>

        <div className="text-center mt-3">
          <span>Already have an account? </span>
          <Link to="/login" className="text-decoration-none text-primary">
            Login
          </Link>
        </div>

        <div className="text-center mt-2">
          <Link to="/" className="btn btn-sm btn-link text-secondary">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
