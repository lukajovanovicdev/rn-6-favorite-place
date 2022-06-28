import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Button, Image, Text, View, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import OutlinedButton from '../ui/OutlinedButton';

const ImagePicker = ({ onTakeImage }) => {
  const [imageUri, setImageUri] = useState();

  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

  const verifyPermissions = async () => {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.'
      );

      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setImageUri(image.uri);
    onTakeImage(image.uri);
  };

  let imagePreview = <Text>No image taken yet.</Text>;

  if (imageUri) {
    imagePreview = <Image style={styles.image} source={{ uri: imageUri }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary100,
    borderRadius: 4,
  },
  image: { width: '100%', height: '100%', borderRadius: 4 },
});
