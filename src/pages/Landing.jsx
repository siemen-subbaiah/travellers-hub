import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthState';

const Landing = () => {
  const { googleLogin, githubLogin, loading } = useContext(AuthContext);

  console.log(loading);

  return (
    <main className='mt-32'>
      <section className='flex items-center justify-between'>
        <h1 className='text-7xl w-2/6 leading-snug'>
          Store all Memories in one Place
        </h1>
        <img
          src='/src/assets/landing-image.svg'
          alt='landing-img'
          style={{ height: '400px' }}
        />
      </section>
      <section>
        <button
          onClick={githubLogin}
          className='border border-black py-2 px-2 rounded-md flex items-center gap-2'
        >
          <img
            src='/src/assets/github.png'
            alt='github'
            style={{ height: '30px' }}
          />
          Login with github
        </button>
        <button
          onClick={googleLogin}
          className='my-4 border border-black py-2 px-2 rounded-md flex items-center gap-2'
        >
          <img
            src='/src/assets/google.png'
            alt='github'
            style={{ height: '26px' }}
          />
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
