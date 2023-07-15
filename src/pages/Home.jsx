import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth/AuthState';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import Loading from '../components/common/Loading';
import Memories from '../components/account/Memories';

const Home = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [memories, setMemories] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }

    getPublicMaps();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPublicMaps = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('map')
      .select(
        `
    *,
    profiles (
      user_name,
      avatar_url
    )
  `
      )
      .eq('is_public', true);

    if (error) {
      alert(error.message);
      setLoading(false);
    }

    if (data) {
      setLoading(false);
      setMemories(data);
      console.log(data);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className='mt-10'>
          {memories?.length === 0 ? (
            <section className='flex justify-center items-center my-5 flex-col'>
              <img
                src='/src/assets/empty-state.svg'
                alt=''
                style={{ height: '300px' }}
              />
              <p className='text-xl my-4'>No public memories to display</p>
            </section>
          ) : (
            <>
              <h1 className='mb-6 text-3xl font-semibold'>Public memories</h1>
              <section className='grid grid-cols-3 gap-5'>
                {memories?.map((memory) => (
                  <Memories
                    key={memory.id}
                    memory={memory}
                    isPublic
                    showProfileInfo
                  />
                ))}
              </section>
            </>
          )}
        </main>
      )}
    </>
  );
};

export default Home;
