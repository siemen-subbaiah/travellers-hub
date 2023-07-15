/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import Loading from '../common/Loading';
import { supabase } from '../../supabase';
import { CommonContext } from '../../context/common/CommonState';

const PlaceEditModal = ({ setPerformReload }) => {
  const { holdPlaceDetails } = useContext(CommonContext);

  const [loading, setLoading] = useState(false);

  const [placeDescription, setPlaceDescription] = useState('');
  const [placeName, setPlaceName] = useState('');

  useEffect(() => {
    if (holdPlaceDetails) {
      setPlaceName(holdPlaceDetails.name);
      setPlaceDescription(holdPlaceDetails.description);
    }
  }, [holdPlaceDetails]);

  const updatePlaceDetails = async () => {
    setLoading(true);

    const { error } = await supabase
      .from('place')
      .update({
        place_name: placeName,
        place_description: placeDescription,
      })
      .eq('id', holdPlaceDetails.id);

    if (!error) {
      setPerformReload(true);
      setLoading(false);
      window.place_edit_modal.close();
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <dialog id='place_edit_modal' className='modal'>
          <form method='dialog' className='modal-box'>
            <h3 className='font-bold text-lg'>Edit</h3>
            <div>
              <label className='label'>
                <span className='label-text'>Place Name</span>
              </label>
              <input
                type='text'
                value={placeName}
                className='input bg-[#191E24] w-full'
                onChange={(e) => setPlaceName(e.target.value)}
              />
            </div>
            <div>
              <label className='label'>
                <span className='label-text'>Place Description</span>
              </label>
              <textarea
                value={placeDescription}
                className='textarea bg-[#191E24] w-full'
                onChange={(e) => setPlaceDescription(e.target.value)}
              ></textarea>
            </div>
            <div className='modal-action'>
              {/* if there is a button in form, it will close the modal */}
              <button className='btn btn-ghost'>Close</button>
              <span
                onClick={updatePlaceDetails}
                className='btn btn-bg-[#2A323C]'
              >
                Save
              </span>
            </div>
          </form>
        </dialog>
      )}
    </>
  );
};

export default PlaceEditModal;
