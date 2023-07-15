/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import { CommonContext } from '../../context/common/CommonState';
import { supabase } from '../../supabase';
import Loading from '../common/Loading';

const MapDetailsEditMoal = ({ setPerformReload }) => {
  const { holdMapDetails } = useContext(CommonContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (holdMapDetails) {
      setMapName(holdMapDetails.name);
      setMapDescription(holdMapDetails.description);
      setChecked(holdMapDetails.isPublic);
    }
  }, [holdMapDetails]);

  const [mapName, setMapName] = useState('');
  const [mapDescription, setMapDescription] = useState('');
  const [checked, setChecked] = useState(false);

  const updateMapDetails = async () => {
    setLoading(true);

    const { error } = await supabase
      .from('map')
      .update({
        map_name: mapName,
        map_description: mapDescription,
        is_public: checked,
      })
      .eq('id', holdMapDetails.id);

    if (!error) {
      setPerformReload(true);
      setLoading(false);
      window.map_edit_modal.close();
    }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <dialog id='map_edit_modal' className='modal'>
          <form method='dialog' className='modal-box'>
            <h3 className='font-bold text-lg'>Edit</h3>
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
            <div className='modal-action'>
              {/* if there is a button in form, it will close the modal */}
              <button className='btn btn-ghost'>Close</button>
              <span onClick={updateMapDetails} className='btn btn-bg-[#2A323C]'>
                Save
              </span>
            </div>
          </form>
        </dialog>
      )}
    </>
  );
};

export default MapDetailsEditMoal;
