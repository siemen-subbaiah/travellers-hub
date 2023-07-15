import { useEffect, useState } from 'react';
import MapPanel from '../add-memory/MapPanel';
import { AiFillInfoCircle } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';

/* eslint-disable react/prop-types */
const PlaceDetails = ({ mapDetails, placeDetails }) => {
  const [editing, setEditing] = useState(true);

  const { pathname } = useLocation();

  useEffect(() => {
    if (!pathname.includes('add')) {
      setEditing(false);
    } else {
      setEditing(true);
    }
  }, []);

  return (
    <main className='mt-5'>
      <section className='grid grid-cols-12 gap-10'>
        <section className='col-span-3'>
          <div className='bg-[#2A323C] p-3 rounded-md'>
            <h1 className='text-2xl font-semibold'>{mapDetails?.map_name}</h1>
            <p className='mt-2'>{mapDetails?.map_description}</p>
            {placeDetails?.length >= 1 && (
              <p className='mt-2'>
                Total places visited : {placeDetails?.length}
              </p>
            )}
          </div>

          <div className='bg-[#2A323C] p-3 rounded-md mt-10'>
            <h1 className='text-2xl'>Places</h1>

            {placeDetails?.length === 0 && (
              <p className='mt-2'>No places visited yet</p>
            )}

            {placeDetails?.map((place) => {
              return (
                <p
                  key={place?.id}
                  className='mt-2 p-2 rounded-md cursor-pointer'
                >
                  <Link
                    to={
                      !editing
                        ? `/posts/${place?.id}`
                        : `/add-posts/${place?.id}`
                    }
                  >
                    {place?.place_name}
                  </Link>
                </p>
              );
            })}
          </div>

          {editing && (
            <div className='mt-20 flex items-center gap-5'>
              <AiFillInfoCircle fontSize='1.5rem' />
              <p>Point the location on the map to mark locations</p>
            </div>
          )}
        </section>
        <div className='col-span-9'>
          <MapPanel
            mapImg={mapDetails?.map_image}
            placeDetails={placeDetails}
            editing={editing}
            willClicklocation={location}
          />
        </div>
      </section>
    </main>
  );
};

export default PlaceDetails;
