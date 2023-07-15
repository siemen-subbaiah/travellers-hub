/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { AuthContext } from '../../context/auth/AuthState';
import { supabase } from '../../supabase';
import Loading from '../common/Loading';
import MapDetails from './MapDetails';

const MapUpload = ({ profileId }) => {
  const { user_id } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [imgPath, setImgPath] = useState(null);

  const handleFileChange = async (e) => {
    const mapImage = e.target.files[0];

    setLoading(true);

    const { data, error } = await supabase.storage
      .from('map-bucket')
      .upload(`${user_id}/maps/${mapImage.name}`, mapImage, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      alert(error.message);
      setLoading(false);
    }

    if (data) {
      setImgPath(data.path);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        !imgPath && (
          <section className='bg-[#2A323C] p-5 mt-32 rounded-md w-3/5  mx-auto'>
            <label
              htmlFor='file-input'
              className='flex flex-col items-center cursor-pointer'
            >
              <input
                type='file'
                id='file-input'
                hidden
                onChange={handleFileChange}
              />
              <h1 className='text-4xl text-center mb-5 mt-5'>
                Upload a map of your travelled state/country
              </h1>
              <AiOutlineUpload style={{ fontSize: '5rem' }} />
            </label>
          </section>
        )
      )}
      {imgPath && (
        <MapDetails
          imgPath={imgPath}
          setImgPath={setImgPath}
          profileId={profileId}
        />
      )}
    </>
  );
};

export default MapUpload;
