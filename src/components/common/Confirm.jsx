import { useContext, useState } from 'react';
import { CommonContext } from '../../context/common/CommonState';
import { supabase } from '../../supabase';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';

/* eslint-disable react/prop-types */
const Confirm = ({ setPerformReload, title }) => {
  const {
    holdPostId,
    handleHoldingPostId,
    holdMapId,
    handleHoldingMapId,
    handleHoldingImgPath,
    holdImgPath,
    holdPlaceId,
    handleHoldingPlaceId,
  } = useContext(CommonContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);

  const handleImgRemove = async () => {
    const { error } = await supabase.storage
      .from('map-bucket')
      .remove([holdImgPath]);

    setImgLoading(true);

    if (!error) {
      handleHoldingImgPath(null);
      setImgLoading(false);
      window.confirm_modal.close();
    } else {
      alert(error.message);
      setImgLoading(false);
    }
  };

  const handleDelete = async () => {
    if (holdPostId) {
      setLoading(true);
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', holdPostId);

      if (!error) {
        handleImgRemove();
        setPerformReload(true);
        handleHoldingPostId(null);
        setLoading(false);
      } else {
        alert(error.message);
        setPerformReload(false);
        setLoading(false);
      }
    }

    if (holdPlaceId) {
      setLoading(true);
      const { error } = await supabase
        .from('place')
        .delete()
        .eq('id', holdPlaceId);

      if (!error) {
        setPerformReload(true);
        handleHoldingPlaceId(null);
        setLoading(false);
        navigate('/profile');
      } else {
        alert(error.message);
        setPerformReload(false);
        setLoading(false);
      }
    }

    if (holdMapId) {
      setLoading(true);
      const { error } = await supabase.from('map').delete().eq('id', holdMapId);

      if (!error) {
        handleImgRemove();
        setPerformReload(true);
        handleHoldingMapId(null);
        setLoading(false);
      } else {
        alert(error.message);
        setPerformReload(false);
        setLoading(false);
      }
    }
  };

  return (
    <>
      {loading && imgLoading ? (
        <Loading />
      ) : (
        <dialog id='confirm_modal' className='modal'>
          <div method='dialog' className='modal-box shadow-2xl'>
            <h3 className='font-bold text-lg'>Delete</h3>
            <p className='pt-2'>Are you sure you want to delete the {title}?</p>
            <div className='modal-action'>
              <button
                className='btn btn-ghost'
                onClick={() => window.confirm_modal.close()}
              >
                Close
              </button>
              <button className='btn btn-bg-[#2A323C]' onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default Confirm;
