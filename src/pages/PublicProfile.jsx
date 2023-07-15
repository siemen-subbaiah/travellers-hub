import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth/AuthState';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../supabase';
import Memories from '../components/account/Memories';
import Loading from '../components/common/Loading';
import instagram from '../assets/instagram.webp';
import twitter from '../assets/twitter.png';
import emptyState from '../assets/empty-state.svg';

const PublicProfile = () => {
  const { user } = useContext(AuthContext);

  const profile = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [memoriesLoading, setMemoriesLoading] = useState(false);
  const [metaLoading, setMetaLoading] = useState(false);
  const [memories, setMemories] = useState(null);
  const [profileDetails, setProfileDetails] = useState(null);
  const [profileMetaDetails, setProfileMetaDetails] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }

    getProfileDetails();
    getUserMemories();
    getUserMetaData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProfileDetails = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', profile.id);

    if (error) {
      alert(error.message);
      setLoading(false);
    }

    if (data) {
      setLoading(false);
      setProfileDetails(data[0]);
    }
  };

  const getUserMetaData = async () => {
    setMetaLoading(true);
    const { data } = await supabase
      .from('user_metadata')
      .select()
      .eq('profile_id', profile.id);
    if (data) {
      setProfileMetaDetails(data[0]);
      setMetaLoading(false);
    }
  };

  const getUserMemories = async () => {
    setMemoriesLoading(true);
    const { data } = await supabase
      .from('map')
      .select()
      .eq('profile_id', profile.id);

    if (data) {
      setMemories(data);
      setMemoriesLoading(false);
    }
  };

  return (
    <>
      {loading && memoriesLoading && metaLoading ? (
        <Loading />
      ) : (
        <main className='mt-10'>
          <div className='flex items-center justify-between'>
            <section className='flex gap-5'>
              <div className='avatar'>
                <div className='w-24 rounded-full'>
                  <img src={profileDetails?.avatar_url} alt='profile' />
                </div>
              </div>
              <div>
                <h1 className='text-2xl'>{profileDetails?.user_name}</h1>
                {/* <p>{user?.email}</p> */}
                <p className='text-gray-500'>
                  {profileMetaDetails?.description
                    ? profileMetaDetails?.description
                    : '-'}
                </p>
              </div>
            </section>
            <section>
              <div className='flex gap-5'>
                {profileMetaDetails?.instagram_link && (
                  <a
                    href={profileMetaDetails?.instagram_link}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <img src={instagram} alt='' className='h-10' />
                  </a>
                )}
                {profileMetaDetails?.twitter_link && (
                  <a
                    href={profileMetaDetails?.twitter_link}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <img src={twitter} alt='' className='h-10' />
                  </a>
                )}
              </div>
            </section>
          </div>
          <div className='divider'></div>
          {memories?.length === 0 && (
            <section className='flex justify-center items-center my-5 flex-col'>
              <img src={emptyState} alt='' style={{ height: '300px' }} />
              <p className='text-xl my-4'>No memories found</p>
            </section>
          )}
          <section className='grid grid-cols-3 gap-5'>
            {memories?.map((memory) => (
              <Memories
                key={memory.id}
                memory={memory}
                isPublic
                showProfileInfo={false}
              />
            ))}
          </section>
        </main>
      )}
    </>
  );
};

export default PublicProfile;
