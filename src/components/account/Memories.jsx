/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { AiFillEdit } from 'react-icons/ai';
import { useContext } from 'react';
import { CommonContext } from '../../context/common/CommonState';

const Memories = ({ memory, isPublic, showProfileInfo }) => {
  const { handleHoldingMapId, handleHoldingImgPath, handleHoldingMapDetails } =
    useContext(CommonContext);

  return (
    <div className='bg-[#2A323C] shadow-lg p-3 rounded-md cursor-pointer hover:scale-105 transition'>
      {isPublic && showProfileInfo && (
        <Link to={`/profile/${memory.profile_id}`}>
          <section>
            <div className='flex items-center gap-2 mb-2'>
              <div className='avatar'>
                <div className='w-8 rounded-full'>
                  <img src={memory.profiles.avatar_url} />
                </div>
              </div>
              <p>{memory?.profiles.user_name}</p>
            </div>
            <div className='divider mt-0 mb-0'></div>
          </section>
        </Link>
      )}
      <>
        <div>
          <div className='mb-5 mt-1 flex items-center justify-between'>
            <h1 className='text-lg'>{memory?.map_name}</h1>
            {!isPublic && (
              <div className='flex gap-4'>
                <AiFillEdit
                  className='cursor-pointer'
                  onClick={() => {
                    handleHoldingMapDetails({
                      name: memory?.map_name,
                      description: memory?.map_description,
                      isPublic: memory?.is_public,
                      id: memory?.id,
                    });
                    window.map_edit_modal.showModal();
                  }}
                />
                <AiFillDelete
                  className='cursor-pointer'
                  onClick={() => {
                    handleHoldingMapId(memory?.id);
                    handleHoldingImgPath(memory?.map_image);
                    window.confirm_modal.showModal();
                  }}
                />
              </div>
            )}
          </div>
          <Link
            to={isPublic ? `/place/${memory.id}` : `/add-place/${memory.id}`}
          >
            <div className='flex items-center justify-center'>
              <img
                src={`https://lzvnerhwtykxukdqaooq.supabase.co/storage/v1/object/public/map-bucket/${memory.map_image}`}
                alt=''
                style={{ height: '300px' }}
              />
            </div>
          </Link>
        </div>
      </>
    </div>
  );
};

export default Memories;
