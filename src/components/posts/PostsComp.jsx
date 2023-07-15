/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { CommonContext } from '../../context/common/CommonState';

const PostsComp = ({ post, editing }) => {
  const {
    handleHoldingPostDetails,
    handleHoldingPostId,
    handleHoldingImgPath,
  } = useContext(CommonContext);

  return (
    <>
      <div className='bg-[#2A323C] shadow-2xl p-3 rounded-md flex justify-center items-center hover:scale-105 transition'>
        <div>
          <img
            src={`https://lzvnerhwtykxukdqaooq.supabase.co/storage/v1/object/public/map-bucket/${post.image}`}
            alt='post'
            height={450}
            width={450}
          />
          <div className='flex items-center justify-between'>
            <p className='my-3'>{post.description}</p>
            {editing && (
              <div className='flex gap-4'>
                <AiFillEdit
                  className='cursor-pointer'
                  onClick={() => {
                    handleHoldingPostDetails({
                      id: post.id,
                      img: post.image,
                      caption: post.description,
                    });
                    window.post_modal.showModal();
                  }}
                />
                <AiFillDelete
                  className='cursor-pointer'
                  onClick={() => {
                    handleHoldingPostId(post.id);
                    handleHoldingImgPath(post.image);
                    window.confirm_modal.showModal();
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostsComp;
