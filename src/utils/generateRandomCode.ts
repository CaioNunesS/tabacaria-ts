export const generateRandomCode = (randomCodeLength: number) => {
  let randomCode = '' as string;
  const characters = '0123456789' as string;
  const charactersLength: number = characters.length;
  while (randomCodeLength > 0) {
    const randomNumber: number = Math.floor(Math.random() * charactersLength);
    randomCode += characters.charAt(randomNumber);
    randomCodeLength -= 1;
  }
  return randomCode;
};
