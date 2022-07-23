const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.uploadUserImage = upload.single('imgUrl');
exports.uploadTourImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'Images', maxCount: 3 }
]);
