import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './userContext';
import Icon from './icon.png';

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  // sending http request for jwt verification
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
      })
      .catch((error) => console.error('Error fetching user profile:', error));
  }, [setUserInfo]);

  // Function to Log-out
  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    })
      .then(() => setUserInfo(null))
      .catch((error) => console.error('Error during logout:', error));
  }

  const username = userInfo?.username;

  return (
    <header>
      <div className="header-logo">
        <img src={Icon} alt="" />
        <Link to="/" className="logo">
          &nbsp; Blogtown
        </Link>
      </div>
      <nav>
        {username ? (
          <button className="logout" onClick={logout}>
            Logout <img className="logout_img" src="./logout_img.png" alt="" />
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;