import { useContext, useEffect, useState } from 'react';
import MapUpload from '../components/add-memory/MapUpload';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthState';
import { supabase } from '../supabase';

const AddMemory = () => {
  const { user, user_id } = useContext(AuthContext);

  const navigate = useNavigate();

  const [profileId, setProfileId] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    getProfileId(user_id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <MapUpload profileId={profileId} />
    </>
  );
};

export default AddMemory;
