// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// // import { ArticleCard } from './components/ArticleCard';

// function App() {
//   return (
//     <> 

//     <Routes>
//       <Route path="/" element={<Home />} />
//     </Routes></>
  
   
//   );
// }

// export default App;


// App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SavedNotes from './pages/SavedNotes';
import HindiHome from './pages/Hindihome';
import LikedNews from './pages/LikedNews';
import Signup from './pages/Signup';
import Login from './pages/Login';
// import ForgotPassword from './pages/ForgotPassword';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Navbar />
      
<ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hindi" element={<HindiHome />} />
        <Route path="/saved" element={<SavedNotes />} />
        <Route path="/liked" element={<LikedNews />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}

      </Routes>
    </>
  );
}

export default App;