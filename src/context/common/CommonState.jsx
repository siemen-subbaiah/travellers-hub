/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

export const CommonContext = createContext();

const CommonState = ({ children }) => {
  const [holdPostDetails, setHoldPostDetails] = useState(null);
  const [holdPostId, setHoldPostId] = useState(null);
  const [holdMapId, setHoldMapId] = useState(null);
  const [holdImgPath, setHoldImgPath] = useState(null);
  const [holdMapDetails, setHoldMapDetails] = useState(null);
  const [holdPlaceDetails, setHoldPlaceDetails] = useState(null);
  const [holdPlaceId, setHoldPlaceId] = useState(null);

  const handleHoldingPostDetails = (postDetails) => {
    setHoldPostDetails(postDetails);
  };

  const handleHoldingPostId = (postId) => {
    setHoldPostId(postId);
  };

  const handleHoldingMapId = (mapId) => {
    setHoldMapId(mapId);
  };

  const handleHoldingImgPath = (imgPath) => {
    setHoldImgPath(imgPath);
  };

  const handleHoldingMapDetails = (mapDetails) => {
    setHoldMapDetails(mapDetails);
  };

  const handleHoldingPlaceDetails = (placeDetails) => {
    setHoldPlaceDetails(placeDetails);
  };

  const handleHoldingPlaceId = (placeId) => {
    setHoldPlaceId(placeId);
  };

  return (
    <CommonContext.Provider
      value={{
        holdPostDetails,
        handleHoldingPostDetails,
        holdPostId,
        handleHoldingPostId,
        holdMapId,
        handleHoldingMapId,
        holdImgPath,
        handleHoldingImgPath,
        holdMapDetails,
        handleHoldingMapDetails,
        holdPlaceDetails,
        handleHoldingPlaceDetails,
        holdPlaceId,
        handleHoldingPlaceId,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};

export default CommonState;
