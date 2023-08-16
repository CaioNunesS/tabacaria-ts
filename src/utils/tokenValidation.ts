export const secretValidation = (n: number) => {
  // eslint-disable-next-line prefer-const
  let number = []
  for (let i = 0; i < n; i++) {
    const token = Math.floor(Math.random() * 6)
    number.push(token)
  }
  return number.join('')
}

// export const verifySecret = (userSecret: number, secret: number) => {
//   if(user)
// }
