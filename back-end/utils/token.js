const jwt = require('jsonwebtoken');

const crypto = require('crypto');

const { JWT_SECRET_KEY, JWT_EXP_TIME } = process.env;

exports.signJWT = (userId, email) => {
  const token = jwt.sign({ id: userId, email }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXP_TIME
  });
  return token;
};

exports.verifyJWT = (token) => {
  const isValid = jwt.verify(token, JWT_SECRET_KEY);
  return isValid;
};

exports.passwordResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  return { resetToken, hashedToken };
};

exports.hashToken = (token) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  return hashedToken;
};
