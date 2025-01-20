const randomNumberGenerator = (lenght = 10) => {
  return [...Array(lenght).keys()]
    .map(() => Math.floor(Math.random() * 10))
    .join("");
};
export default randomNumberGenerator;
