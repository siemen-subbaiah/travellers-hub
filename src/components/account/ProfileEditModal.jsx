/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth/AuthState';
import { supabase } from '../../supabase';

const ProfileEditModal = ({
  description,
  instagram_link,
  twitter_link,
  id,
  setPerformReload,
  profileId,
}) => {
  const { user, user_id } = useContext(AuthContext);

  const [newDescription, setNewDescription] = useState('');
  const [newInstaLink, setNewInstaLink] = useState('');
  const [newTwitterLink, setNewTwitterLink] = useState('');

  useEffect(() => {
    setNewDescription(description);
    setNewInstaLink(instagram_link);
    setNewTwitterLink(twitter_link);
  }, [description, instagram_link, twitter_link]);

  const updateProfile = async () => {
    if (id) {
      const { error } = await supabase
        .from('user_metadata')
        .update({
          description: newDescription,
          instagram_link: newInstaLink,
          twitter_link: newTwitterLink,
        })
        .eq('id', id);

      if (!error) {
        setPerformReload(true);
        window.profile_edit.close();
      }
    } else {
      const { error } = await supabase.from('user_metadata').insert({
        description: newDescription,
        instagram_link: newInstaLink,
        twitter_link: newTwitterLink,
        user_id,
        profile_id: profileId,
      });

      if (!error) {
        setPerformReload(true);
        window.profile_edit.close();
      }
    }
  };

  return (
    <dialog id='profile_edit' className='modal'>
      <form method='dialog' className='modal-box shadow-2xl'>
        <h3 className='font-bold text-lg'>Edit Profile</h3>
        <div>
          <label className='label'>
            <span className='label-text'>Username</span>
          </label>
          <input
            type='text'
            value={user?.full_name ? user?.full_name : user?.user_name}
            className='input w-full'
            disabled
          />
        </div>
        <div>
          <label className='label'>
            <span className='label-text'>Email</span>
          </label>
          <input
            type='text'
            value={user?.email}
            className='input w-full'
            disabled
          />
        </div>
        <div>
          <label className='label'>
            <span className='label-text'>Description</span>
          </label>
          <input
            type='text'
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className='input bg-[#191E24] w-full'
          />
        </div>
        <div>
          <label className='label'>
            <span className='label-text'>Instagram</span>
          </label>
          <input
            type='text'
            value={newInstaLink}
            onChange={(e) => setNewInstaLink(e.target.value)}
            className='input bg-[#191E24] w-full'
          />
        </div>
        <div>
          <label className='label'>
            <span className='label-text'>Twitter</span>
          </label>
          <input
            type='text'
            value={newTwitterLink}
            onChange={(e) => setNewTwitterLink(e.target.value)}
            className='input bg-[#191E24]  w-full'
          />
        </div>
        <div className='modal-action'>
          {/* if there is a button in form, it will close the modal */}
          <button className='btn btn-ghost'>Close</button>
          <span onClick={updateProfile} className='btn btn-bg-[#2A323C]'>
            Save
          </span>
        </div>
      </form>
    </dialog>
  );
};

export default ProfileEditModal;
