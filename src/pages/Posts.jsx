import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth/AuthState';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../supabase';
import Loading from '../components/common/Loading';
import PostsLayout from '../components/posts/PostsLayout';
import PostModal from '../components/posts/PostModal';
import Confirm from '../components/common/Confirm';
import PlaceEditModal from '../components/add-place/PlaceEditModal';

const Posts = () => {
  const { user } = useContext(AuthContext);

  const { pathname } = useLocation();

  const placeId = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [placeDetails, setPlaceDetails] = useState(null);
  const [posts, setPosts] = useState(null);
  const [editing, setEditing] = useState(true);
  const [performReload, setPerformReload] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }

    if (!pathname.includes('add')) {
      setEditing(false);
    } else {
      setEditing(true);
    }

    if (performReload) {
      setPerformReload(false);
    }

    getPlaceDetails();
    getPlacePosts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [performReload]);

  const getPlaceDetails = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('place')
      .select()
      .eq('id', placeId.id);

    if (error) {
      alert(error.message);
      setLoading(false);
    }

    if (data) {
      setLoading(false);
      setPlaceDetails(data[0]);
    }
  };

  const getPlacePosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select()
      .eq('place_id', placeId.id);

    if (error) {
      alert(error.message);
      setLoading(false);
    }

    if (data) {
      setLoading(false);
      setPosts(data);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <PostsLayout
          placeDetails={placeDetails}
          posts={posts}
          editing={editing}
        />
      )}
      <PostModal
        setPerformReload={setPerformReload}
        placeDetails={placeDetails}
      />
      <PlaceEditModal setPerformReload={setPerformReload} />
      <Confirm setPerformReload={setPerformReload} title='Post' />
    </>
  );
};

export default Posts;
