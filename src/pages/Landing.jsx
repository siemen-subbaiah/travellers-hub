import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthState';
import gitHub from '../assets/github.png';
import google from '../assets/google.png';
import landing from '../assets/landing-image.svg';

const Landing = () => {
  const { googleLogin, githubLogin, loading } = useContext(AuthContext);

  console.log(loading);

  return (
    <main className='mt-32'>
      <section className='flex items-center justify-between'>
        <h1 className='text-7xl w-2/6 leading-snug'>
          Store all Memories in one Place
        </h1>
        <img src={landing} alt='landing-img' style={{ height: '400px' }} />
      </section>
      <section>
        <button
          onClick={githubLogin}
          className='btn rounded-md flex items-center gap-2'
        >
          <img src={gitHub} alt='github' style={{ height: '30px' }} />
          Login with github
        </button>
        <button
          onClick={googleLogin}
          className='btn mt-2 rounded-md flex items-center gap-2'
        >
          <img src={google} alt='github' style={{ height: '26px' }} />
          {loading ? (
            <span className='loading loading-dots loading-xs'></span>
          ) : (
            ' Login with google'
          )}
        </button>
      </section>
    </main>
  );
};

export default Landing;
