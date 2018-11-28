const getCurrentTime = () => {
  const dt = new Date();
  const localDate = dt.toLocaleString();
  console.log(localDate);
  return localDate;
};

export default { getCurrentTime };
