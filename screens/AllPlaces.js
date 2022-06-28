import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import PlacesList from '../components/places/PlacesList';
import { fetchPlaces } from '../util/database';

const AllPlaces = ({ route }) => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadedPlaces = async () => {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    };
    if (isFocused) {
      loadedPlaces();
      // setLoadedPlaces((prevState) => [...prevState, route.params.place]);
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
