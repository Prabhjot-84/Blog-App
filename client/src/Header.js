import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './userContext';
import Icon from './icon.png';

const Header = () => {
  
  const {setUserInfo, userInfo} = useContext(UserContext);

  // sending http request for jwt verfication
  useEffect(() => {
    fetch( 'http://localhost:4000/profile', {
      credentials: 'include',
    })
    .then( response => {
      response.json().then( userInfo => {
        setUserInfo(userInfo);
      })
    })
  }, []);


  // Function to Log-out
  function logout() {
    fetch( 'http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    })
    setUserInfo(null);
  }
  
  const username = userInfo?.username;


  return (
    <header> 
        <div className='header-logo'>
          <img src={Icon} alt='' />
          <Link to="/" className="logo"> &nbsp; Blogtown </Link>
        </div>
        <nav>

          {username && (
            <>
              <button className='logout' onClick={logout} > Logout <img className='logout_img' src='./logout_img.png' alt='' /> </button>
            </>
          )}

          { !username && (
            <>
              <Link to="/login"> Login </Link>
              <Link to="/register"> Register </Link>
            </>
          )}
          
        </nav>
    </header>
  )
}

export default Header