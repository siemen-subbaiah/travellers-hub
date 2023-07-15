import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthState';
import PlaceDetails from '../components/add-place/PlaceDetails';
import { supabase } from '../supabase';
import Loading from '../components/common/Loading';

const AddPlace = () => {
  const { user } = useContext(AuthContext);

  const mapId = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [mapDetails, setMapDetails] = useState(null);
  const [placeDetails, setPlaceDetails] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }

    getMapDetails();
    getPlaceDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMapDetails = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('map')
      .select()
      .eq('id', mapId.id);

    if (error) {
      alert(error.message);
      setLoading(false);
    }

    if (data) {
      setLoading(false);
      setMapDetails(data[0]);
    }
  };

  const getPlaceDetails = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('place')
      .select()
      .eq('map_id', mapId.id);

    if (error) {
      alert(error.message);
      setLoading(false);
    }

    if (data) {
      setLoading(false);
      setPlaceDetails(data);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <PlaceDetails mapDetails={mapDetails} placeDetails={placeDetails} />
      )}
    </>
  );
};

export default AddPlace;
