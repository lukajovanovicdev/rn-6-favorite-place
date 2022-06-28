import React, { useCallback, useState } from 'react';
import { ScrollView, Text, TextInput, View, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { Place } from '../../models/place';
import Button from '../ui/Button';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';

const PlaceForm = ({ onCreatePlace }) => {
  const [title, setTitle] = useState();
  const [pickedLocation, setPickedLocation] = useState();
  const [selectedImage, setSelectedImage] = useState();

  const changeTitleHandler = (enteredText) => {
    setTitle(enteredText);
  };

  const takeImageHandler = (imageUri) => {
    setSelectedImage(imageUri);
  };

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  const savePlaceHandler = () => {
    console.log(pickedLocation);
    const placeData = new Place(title, selectedImage, pickedLocation);

    onCreatePlace(placeData);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={changeTitleHandler} value={title} />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: { flex: 1, padding: 24 },
  label: { fontWeight: 'bold', marginBottom: 4, color: colors.primary500 },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: colors.primary100,
  },
});
