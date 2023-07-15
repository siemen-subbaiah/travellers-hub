import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth/AuthState';
import Loading from '../common/Loading';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';
import { ImCancelCircle } from 'react-icons/im';
import MapUpload from './MapUpload';

/* eslint-disable react/prop-types */
const MapDetails = ({ imgPath, setImgPath, profileId }) => {
  const navigate = useNavigate();

  const { user_id } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const [mapName, setMapName] = useState('');
  const [mapDescription, setMapDescription] = useState('');
  const [checked, setChecked] = useState(false);
  const [moveBackToComp, setMoveBackToComp] = useState(false);

  const handleMapSave = async () => {
    if (!mapName) {
      alert('Please enter map name');
    }
    setLoading(true);
    const { data, error } = await supabase
      .from('map')
      .insert({
        map_image: imgPath,
        map_name: mapName,
        map_description: mapDescription,
        is_public: checked,
        user_id,
        profile_id: profileId,
      })
      .select();

    if (error) {
      alert(error.message);
      setLoading(false);
      handleMapRemove();
    } else {
      setLoading(false);
      navigate(`/add-place/${data[0]?.id}`);
    }
  };

  const handleMapRemove = async () => {
    const { data, error } = await supabase.storage
      .from('map-bucket')
      .remove([imgPath]);

    if (error) {
      alert(error.message);
    }

    if (data) {
      setMoveBackToComp(true);
      setImgPath(null);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className='mt-10'>
          <h1 className='text-2xl mb-10 font-semibold'>Add Map Details</h1>
          <div className='grid grid-cols-2 items-center'>
            <section className='relative'>
              <img
                src={`https://lzvnerhwtykxukdqaooq.supabase.co/storage/v1/object/public/map-bucket/${imgPath}`}
                alt='map'
                style={{ height: '500px' }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '0rem',
                  left: '-1rem',
                  cursor: 'pointer',
                }}
              >
                <ImCancelCircle fontSize='1.2rem' onClick={handleMapRemove} />
              </div>
            </section>
            <section className='border border-gray-600 p-5 rounded-md'>
              <div>
                <label className='label'>
                  <span className='label-text'>Map Name</span>
                </label>
                <input
                  type='text'
                  value={mapName}
                  className='input bg-[#191E24] w-full'
                  onChange={(e) => setMapName(e.target.value)}
                />
              </div>
              <div>
                <label className='label'>
                  <span className='label-text'>Map Description</span>
                </label>
                <textarea
                  value={mapDescription}
                  className='textarea bg-[#191E24] w-full'
                  onChange={(e) => setMapDescription(e.target.value)}
                ></textarea>
              </div>
              <div className='flex gap-1 items-center'>
                <input
                  type='checkbox'
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
                <label className='label cursor-pointer'>
                  <span className='label-text'>Is Public</span>
                </label>
              </div>
              <div>
                <button
                  className='btn btn-bg-[#2A323C]'
                  onClick={handleMapSave}
                >
                  Add
                </button>
              </div>
            </section>
          </div>
        </main>
      )}

      {moveBackToComp && <MapUpload />}
    </>
  );
};

export default MapDetails;
