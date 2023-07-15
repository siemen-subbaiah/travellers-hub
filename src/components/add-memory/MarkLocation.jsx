/* eslint-disable react/prop-types */
import { useMapEvents } from 'react-leaflet/hooks';

const MarkLocation = ({ setLocation }) => {
  useMapEvents({
    click: (e) => {
      console.log(e);
      setLocation([e.latlng.lat, e.latlng.lng]);
      window.place_details.showModal();
    },
  });

  return null;
};

export default MarkLocation;
