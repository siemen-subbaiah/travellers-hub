/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { AuthContext } from '../../context/auth/AuthState';
import { supabase } from '../../supabase';
import { ImCancelCircle } from 'react-icons/im';
import { useParams } from 'react-router-dom';
import Loading from '../common/Loading';
import { CommonContext } from '../../context/common/CommonState';

const PostModal = ({ setPerformReload, placeDetails }) => {
  const { user_id } = useContext(AuthContext);
  const { holdPostDetails } = useContext(CommonContext);

  const placeId = useParams();

  const [caption, setCaption] = useState('');
  const [imgPath, setImgPath] = useState(null);
  const [postId, setPostId] = useState(null);
  const [imgLoading, setImgLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (holdPostDetails) {
      setImgPath(holdPostDetails.img);
      setCaption(holdPostDetails.caption);
      setPostId(holdPostDetails.id);
    } else {
      setPostId(null);
      setImgPath(null);
      setCaption('');
    }
  }, [holdPostDetails]);

  const handleFileChange = async (e) => {
    const postImg = e.target.files[0];

    setImgLoading(true);

    const { data, error } = await supabase.storage
      .from('map-bucket')
      .upload(
        `${user_id}/place/${placeDetails?.place_name}/${postImg.name}`,
        postImg,
        {
          cacheControl: '3600',
          upsert: false,
        }
      );

    if (error) {
      alert(error.message);
      setImgLoading(false);
    }

    if (data) {
      setImgPath(data.path);
      setImgLoading(false);
    }
  };

  const handleImgRemove = async () => {
    const { data, error } = await supabase.storage
      .from('map-bucket')
      .remove([imgPath]);

    setImgLoading(true);

    if (error) {
      alert(error.message);
    }

    if (data) {
      setImgPath(null);
      setImgLoading(false);
    }
  };

  const handlePostSave = async () => {
    if (!caption) {
      alert('Please enter a caption');
    }

    setLoading(true);

    if (!holdPostDetails) {
      const { error } = await supabase.from('posts').insert({
        image: imgPath,
        description: caption,
        place_id: placeId.id,
        user_id,
      });

      if (error) {
        alert(error.message);
        setLoading(false);
        handleImgRemove();
        setPerformReload(false);
      } else {
        setLoading(false);
        setPerformReload(true);
      }
    } else {
      const { error } = await supabase
        .from('posts')
        .update({
          image: imgPath,
          description: caption,
          place_id: placeId.id,
        })
        .eq('id', postId);

      if (error) {
        alert(error.message);
        setLoading(false);
        handleImgRemove();
        setPerformReload(false);
      } else {
        setLoading(false);
        setPerformReload(true);
      }
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <dialog id='post_modal' className='modal'>
          <form method='dialog' className='modal-box'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-4'>
              ✕
            </button>
            <h3 className='font-bold text-lg'>New Post</h3>
            <div className='divider mt-0 mb-0'></div>
            {imgPath ? (
              <>
                <section className='relative mt-2 left-3'>
                  <img
                    src={`https://lzvnerhwtykxukdqaooq.supabase.co/storage/v1/object/public/map-bucket/${imgPath}`}
                    alt='map'
                    style={{
                      height: '200px',
                      position: 'relative',
                      left: '0.5rem',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '0rem',
                      left: '-1rem',
                      cursor: 'pointer',
                    }}
                  >
                    <ImCancelCircle
                      fontSize='1.2rem'
                      onClick={handleImgRemove}
                    />
                  </div>
                </section>
                <div>
                  <label className='label'>
                    <span className='label-text'>Caption</span>
                  </label>
                  <input
                    type='text'
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className='input bg-[#191E24] w-full'
                  />
                </div>
                <div className='modal-action'>
                  {/* if there is a button in form, it will close the modal */}
                  <button className='btn btn-ghost'>Close</button>
                  <span
                    onClick={handlePostSave}
                    className='btn btn-bg-[#2A323C]'
                  >
                    {holdPostDetails ? 'Edit' : 'Save'}
                  </span>
                </div>
              </>
            ) : (
              <>
                {imgLoading ? (
                  <div className='flex justify-center items-center'>
                    <span className='loading loading-dots loading-lg'></span>
                  </div>
                ) : (
                  <section className='p-5'>
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
                      <h1 className='text-3xl text-center mb-5'>
                        Upload a picture
                      </h1>
                      <AiOutlineUpload style={{ fontSize: '4rem' }} />
                    </label>
                  </section>
                )}
              </>
            )}
          </form>
        </dialog>
      )}
    </>
  );
};

export default PostModal;
