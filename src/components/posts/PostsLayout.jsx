/* eslint-disable react/prop-types */

import { useContext } from 'react';
import PostsComp from './PostsComp';
import { CommonContext } from '../../context/common/CommonState';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';

const PostsLayout = ({ placeDetails, posts, editing }) => {
  const {
    handleHoldingPostDetails,
    handleHoldingPlaceDetails,
    handleHoldingPlaceId,
  } = useContext(CommonContext);

  return (
    <main className='mt-10'>
      <div className='flex items-center justify-between'>
        <section>
          <h1 className='text-2xl'>{placeDetails?.place_name}</h1>
          <p className='text-gray-500'>
            {placeDetails?.place_description
              ? placeDetails?.place_description
              : '-'}
          </p>
        </section>
        <section>
          {editing && (
            <div className='flex items-center gap-4'>
              <AiFillEdit
                className='cursor-pointer'
                onClick={() => {
                  handleHoldingPlaceDetails({
                    id: placeDetails.id,
                    name: placeDetails?.place_name,
                    description: placeDetails?.place_description,
                  });
                  window.place_edit_modal.showModal();
                }}
              />
              <AiFillDelete
                className='cursor-pointer'
                onClick={() => {
                  handleHoldingPlaceId(placeDetails.id);
                  window.confirm_modal.showModal();
                }}
              />
            </div>
          )}
        </section>
      </div>
      <div className='divider'></div>
      {editing && (
        <section className='flex justify-end mb-5'>
          <button
            className='btn bg-[#2A323C]'
            onClick={() => {
              window.post_modal.showModal();
              handleHoldingPostDetails(null);
            }}
          >
            Add Posts
          </button>
        </section>
      )}
      {posts?.length === 0 ? (
        <section className='flex justify-center items-center my-5 flex-col'>
          <img
            src='/src/assets/empty-state.svg'
            alt=''
            style={{ height: '300px' }}
          />
          {editing ? (
            <>
              <p className='text-xl my-4'>
                No posts found in {placeDetails?.place_name}, add here
              </p>
              <button
                className='btn bg-[#2A323C]'
                onClick={() => {
                  window.post_modal.showModal();
                  handleHoldingPostDetails(null);
                }}
              >
                Add Posts
              </button>
            </>
          ) : (
            <>
              <p className='text-xl my-4'>
                No posts found in {placeDetails?.place_name}
              </p>
            </>
          )}
        </section>
      ) : (
        <section className='grid grid-cols-3 gap-5 mt-5'>
          {posts?.map((post) => (
            <PostsComp key={post.id} post={post} editing={editing} />
          ))}
        </section>
      )}
    </main>
  );
};

export default PostsLayout;
