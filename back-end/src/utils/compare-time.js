exports.compare = (jwtTimeStamp, passwordChangedAt) => {
  if (passwordChangedAt) {
    const changedTimeStamp = parseInt(passwordChangedAt.getTime() / 1000, 10);
    return jwtTimeStamp < changedTimeStamp;
  }
  return false;
};
