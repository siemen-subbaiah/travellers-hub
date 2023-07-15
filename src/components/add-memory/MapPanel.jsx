/* eslint-disable react/prop-types */

import { ImageOverlay, MapContainer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngBounds } from 'leaflet';
import MarkLocation from './MarkLocation';
import { useMemo, useRef, useState } from 'react';
import PlaceDetailsModal from '../add-place/PlaceDetailsModal';
import { useNavigate } from 'react-router-dom';

const MapPanel = ({ mapImg, placeDetails, editing }) => {
  const navigate = useNavigate();

  const [location, setLocation] = useState(null);
  const markerRef = useRef(null);

  const bounds = new LatLngBounds(
    [40.712216, -74.22655],
    [40.773941, -74.12544]
  );

  const dragHandler = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const coord = marker.getLatLng();
          setLocation([coord.lat, coord.lng]);
          window.place_details.showModal();
        }
      },
    }),
    []
  );

  return (
    <div className='map'>
      <MapContainer
        attributionControl={false}
        center={bounds.getCenter()}
        zoom={13}
        scrollWheelZoom={true}
      >
        <ImageOverlay
          url={`https://lzvnerhwtykxukdqaooq.supabase.co/storage/v1/object/public/map-bucket/${mapImg}`}
          bounds={bounds}
        />
        {editing && <MarkLocation setLocation={setLocation} />}
        {placeDetails?.length >= 1 &&
          placeDetails?.map((place) => {
            return (
              <Marker
                position={JSON.parse(place.place_coordinates)}
                key={place.id}
                eventHandlers={{
                  click: () => {
                    navigate(
                      !editing
                        ? `/posts/${place?.id}`
                        : `/add-posts/${place?.id}`
                    );
                  },
                }}
              >
                <Tooltip>{place?.place_name}</Tooltip>
              </Marker>
            );
          })}
        {location && (
          <Marker
            draggable
            eventHandlers={dragHandler}
            ref={markerRef}
            position={location}
          />
        )}
      </MapContainer>
      <PlaceDetailsModal location={location} />
    </div>
  );
};

export default MapPanel;
