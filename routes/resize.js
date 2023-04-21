import imageCompression from "browser-image-compression";
export const resize = async (file) => {
  const newFile = await handleNewFileFrom(file);
  // return newFile;
  const newUrl = await handleNewUrlFrom(newFile);
  return { file: newFile, id: newFile?.lastModified, url: newUrl };
};
const handleNewFileFrom = async (file) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 70,
  };

  const compressed = await imageCompression(file, options);
  // return compressed;
  const resultFile = new File([compressed], compressed.name, {
    type: compressed.type,
  });
  return resultFile;
};
export const handleNewUrlFrom = async (file) => {
  try {
    const url = await imageCompression.getDataUrlFromFile(file);
    return url;
  } catch (e) {
    console.error(e);
  }
};
