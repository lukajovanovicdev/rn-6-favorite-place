const GOOGLE_API_KEY = 'AIzaSyBdBgpa-KWIZqB47S8LW5kbQRmicJvTzaE';

export const getMapPreview = (lat, lng) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;

  return imagePreviewUrl;
};

export const getAddress = async (lat, lng) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to get address');
  }

  const data = await response.json();
  const address = data.results[0].formatted_address;
  return address;
};
