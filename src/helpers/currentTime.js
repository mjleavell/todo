const getCurrentTime = () => {
  const dt = new Date();
  const localDate = dt.toLocaleString();
  return localDate;
};

export default { getCurrentTime };
