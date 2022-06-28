export const uploadImage = async (
  file,
  reader,
  message,
  url,
  url_tab,
  uploadImagePosition = '10'
) => {
  const image = new FormData();
  image.append('file', file);
  image.append('layerPriority', uploadImagePosition);

  const {
    data: { files },
  } = await apiClient.post('/map/infos', image, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  if (files.length === 1) {
    const [image] = files;
    addImage(image.id, reader.result, false, true);
    setSelectedObject(image.id);
    setObjectionOption(message, url, url_tab);
    setUserImage({ id: image.id, path: image.path });

    return true;
  }
};
