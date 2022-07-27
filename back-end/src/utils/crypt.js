const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });
const { ENCRYPTION_IV, ENCRYPTION_KEY } = process.env;

exports.encrypt = (data) => {
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    ENCRYPTION_KEY,
    ENCRYPTION_IV
  );
  let encrypted = cipher.update(data, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

exports.decrypt = (data) => {
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    ENCRYPTION_KEY,
    ENCRYPTION_IV
  );
  let decrypted = decipher.update(data, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
};
