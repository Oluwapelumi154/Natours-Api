const sharp = require('sharp');
const path = require('path');
exports.resize = async (file, width, height) => {
  const resizedImage = await sharp(file)
    .resize(width, height)
    .toFormat('jpeg')
    .jpeg({ quality: 90 });
  // .toFile(path.join(__dirname, '/public/users', filename));
  return resizedImage;
};
