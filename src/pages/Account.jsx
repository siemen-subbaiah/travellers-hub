import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth/AuthState';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import Loading from '../components/common/Loading';
import { AiFillEdit } from 'react-icons/ai';
import ProfileEditModal from '../components/account/ProfileEditModal';
import Memories from '../components/account/Memories';
import Confirm from '../components/common/Confirm';
import MapDetailsEditMoal from '../components/add-memory/MapDetailsEditMoal';
import instagram from '../assets/instagram.webp';
import twitter from '../assets/twitter.png';
import emptyState from '../assets/empty-state.svg';

const Profile = () => {
  const { user, user_id } = useContext(AuthContext);

  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [memories, setMemories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [memoriesLoading, setMemoriesLoading] = useState(true);
  const [performReload, setPerformReload] = useState(false);
  const [profileId, setProfileId] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    getProfile();
    getMyMemories();
    getProfileId(user_id);

    if (performReload) {
      setPerformReload(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [performReload]);

  const getProfile = async () => {
    setLoading(true);
    const { data } = await supabase.from('user_metadata').select();
    if (data) {
      setProfileData(data[0]);
      setLoading(false);
    }
  };

  const getMyMemories = async () => {
    setMemoriesLoading(true);
    const { data } = await supabase.from('map').select().eq('user_id', user_id);

    if (data) {
      setMemories(data);
      setMemoriesLoading(false);
    }
  };

  const getProfileId = async (uuid) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('uuid', uuid);

    if (error) {
      alert(error.message);
    }

    if (data) {
      console.log(data);
      setProfileId(data[0]?.id);
    }
  };

  return (
    <>
      {loading && memoriesLoading ? (
        <Loading />
      ) : (
        <main className='mt-10'>
          <div className='flex items-center justify-between'>
            <section className='flex gap-5'>
              <div className='avatar'>
                <div className='w-24 rounded-full'>
                  <img src={user?.avatar_url} alt='profile' />
                </div>
              </div>
              <div>
                <h1 className='text-2xl'>
                  {user?.full_name ? user?.full_name : user?.user_name}
                </h1>
                <p>{user?.email}</p>
                <p className='text-gray-500'>
                  {profileData?.description ? profileData?.description : '-'}
                </p>
              </div>
            </section>
            <section>
              <div className='mb-5 flex justify-end'>
                <AiFillEdit
                  className='cursor-pointer'
                  onClick={() => window.profile_edit.showModal()}
                />
              </div>
              <div className='flex gap-5'>
                {profileData?.instagram_link && (
                  <a
                    href={profileData?.instagram_link}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <img src={instagram} alt='' className='h-10' />
                  </a>
                )}
                {profileData?.twitter_link && (
                  <a
                    href={profileData?.twitter_link}
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
          {memories?.length >= 1 && (
            <section className='flex justify-end mb-5'>
              <button className='btn bg-[#2A323C]'>
                <Link to='/add-map'>Add memory</Link>
              </button>
            </section>
          )}
          {memories?.length === 0 && (
            <section className='flex justify-center items-center my-5 flex-col'>
              <img src={emptyState} alt='' style={{ height: '300px' }} />
              <p className='text-xl my-4'>No memories found, add here</p>
              <button className='btn bg-[#2A323C]'>
                <Link to='/add-map'>Add memory</Link>
              </button>
            </section>
          )}
          <section className='grid grid-cols-3 gap-5'>
            {memories?.map((memory) => (
              <Memories
                key={memory.id}
                memory={memory}
                isPublic={false}
                showProfileInfo={false}
              />
            ))}
          </section>
        </main>
      )}
      <ProfileEditModal
        description={profileData?.description}
        instagram_link={profileData?.instagram_link}
        twitter_link={profileData?.twitter_link}
        id={profileData?.id}
        setPerformReload={setPerformReload}
        profileId={profileId}
      />
      <MapDetailsEditMoal setPerformReload={setPerformReload} />
      <Confirm setPerformReload={setPerformReload} title='Map' />
    </>
  );
};

export default Profile;
