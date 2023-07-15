/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthState';
import { supabase } from '../../supabase';
import Loading from '../common/Loading';

const PlaceDetailsModal = ({ location }) => {
  const { user_id } = useContext(AuthContext);
  const mapId = useParams();
  const navigate = useNavigate();

  const [placeName, setPlaceName] = useState('');
  const [placeDescription, setPlaceDescription] = useState('');

  const [loading, setLoading] = useState(false);

  const handlePlaceDetails = async () => {
    if (!placeName) {
      alert('Please enter place name');
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('place')
      .insert({
        place_coordinates: JSON.stringify(location),
        place_name: placeName,
        place_description: placeDescription,
        map_id: mapId.id,
        user_id,
      })
      .select();

    if (error) {
      alert(error.message);
      setLoading(false);
    } else {
      console.log(data);
      setLoading(false);
      navigate(`/add-posts/${data[0]?.id}`);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <dialog id='place_details' className='modal'>
          <form method='dialog' className='modal-box'>
            <h3 className='font-bold text-lg'>Place Details</h3>
            <div>
              <label className='label'>
                <span className='label-text'>Place Name</span>
              </label>
              <input
                type='text'
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
                className='input bg-[#191E24] w-full'
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
                onClick={handlePlaceDetails}
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

export default PlaceDetailsModal;
