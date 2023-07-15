import { useContext } from 'react';
import { AuthContext } from '../../context/auth/AuthState';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className='border-b border-gray-800 text-white px-20 py-3 flex items-center justify-between'>
      <div>
        <h1 className='text-2xl'>
          <Link to='/'>TravelersHub</Link>
        </h1>
      </div>
      {user && (
        <ul className='flex items-center gap-7 cursor-pointer'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
