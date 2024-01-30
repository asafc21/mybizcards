const MakeFirstLetterCapital = (str) => {
  return (str.charAt(0).toUpperCase() + str.slice(1)).trim();
};

export default MakeFirstLetterCapital;
