import { Route, Routes } from 'react-router-dom';
import NavBar from './components/common/NavBar';
import Landing from './pages/Landing';
import { useContext } from 'react';
import { AuthContext } from './context/auth/AuthState';
import Home from './pages/Home';
import Account from './pages/Account';
import AddMemory from './pages/AddMemory';
import AddPlace from './pages/AddPlace';
import Posts from './pages/Posts';
import PublicProfile from './pages/PublicProfile';

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <NavBar />
      <section className='px-20'>
        <Routes>
          <Route path='/' element={!user ? <Landing /> : <Home />} />
          <Route path='/profile' element={<Account />} />
          <Route path='/add-map' element={<AddMemory />} />
          <Route path='/add-place/:id' element={<AddPlace />} />
          <Route path='/place/:id' element={<AddPlace />} />
          <Route path='/add-posts/:id' element={<Posts />} />
          <Route path='/posts/:id' element={<Posts />} />
          <Route path='/profile/:id' element={<PublicProfile />} />
        </Routes>
      </section>
    </>
  );
};

export default App;
