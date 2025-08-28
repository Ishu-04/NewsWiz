import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUserCircle, FaHeart, FaBook } from 'react-icons/fa';

const Navbar = () => {
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'en');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch username from backend
  const fetchUsername = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      const res = await fetch('http://localhost:5002/user-info', {
        headers: { Authorization: token }
      });
      const data = await res.json();
      if (data.username) {
        setUsername(data.username);
        localStorage.setItem('username', data.username);
      }
    } catch {
      console.error('Failed to fetch username');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
    fetchUsername();
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    toast.success("Logged out!");
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    localStorage.setItem('lang', selectedLang);
    toast.info(`Language set to ${selectedLang === 'hi' ? 'हिन्दी' : 'English'}`);
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="d-flex flex-column">
        <Link className="navbar-brand" to="/">📰 NewsWiz</Link>
        {isLoggedIn && (
          <span className="text-white ms-1" style={{ fontSize: '14px' }}>
            👋 Hi, {username}
          </span>
        )}
      </div>

      <div className="ms-auto d-flex align-items-center">
        <select
          className="form-select form-select-sm me-3"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
        </select>

        {isLoggedIn && (
          <>
            <Link to="/liked" className="btn btn-outline-light btn-sm me-2">
              <FaHeart className="me-1" />
              {language === 'hi' ? 'पसंद' : 'Liked'}
            </Link>

            <Link to="/saved" className="btn btn-outline-light btn-sm me-2">
              <FaBook className="me-1" />
              {language === 'hi' ? 'नोट्स' : 'Notes'}
            </Link>
          </>
        )}

        <div className="dropdown">
          <button className="btn btn-sm btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
            <FaUserCircle />
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            {!isLoggedIn ? (
              <>
                <li><button className="dropdown-item" onClick={() => navigate('/login')}>{language === 'hi' ? 'साइन इन' : 'Sign In'}</button></li>
                <li><button className="dropdown-item" onClick={() => navigate('/signup')}>{language === 'hi' ? 'साइन अप' : 'Sign Up'}</button></li>
              </>
            ) : (
              <>
                <li><button className="dropdown-item" onClick={handleLogout}>{language === 'hi' ? 'लॉग आउट' : 'Logout'}</button></li>
                <li><button className="dropdown-item" onClick={async () => {
                  const token = localStorage.getItem('authToken');
                  try {
                    await fetch('http://localhost:5002/delete-account', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ token }),
                    });
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('username');
                    toast.success('Account deleted!');
                    navigate('/');
                  } catch {
                    toast.error('Account deletion failed');
                  }
                }}>{language === 'hi' ? 'खाता हटाएं' : 'Delete Account'}</button></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
