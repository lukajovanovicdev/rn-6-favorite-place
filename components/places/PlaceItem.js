import React from 'react';
import { Image, Pressable, Text, View, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

const PlaceItem = ({ place, onSelect }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect.bind(this, place.id)}
    >
      <Image source={{ uri: place.imageUri }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: colors.primary500,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: { opacity: 0.9 },
  image: { flex: 1, borderBottomLeftRadius: 4, borderBottomLeftRadius: 4, height: 100 },
  info: { flex: 2, padding: 12 },
  title: { fontWeight: 'bold', fontSize: 18, color: colors.gray700 },
  address: { fontSize: 12, color: colors.gray700 },
});
