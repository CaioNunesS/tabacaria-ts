// Função para gerar um código aleatório com base em números
export const generateRandomCode = (randomCodeLength: number) => {
  // Inicializando uma string vazia para armazenar o código aleatório
  let randomCode = '';

  // Definindo os caracteres que podem ser usados no código (apenas dígitos de 0 a 9)
  const characters = '0123456789';

  // Obtendo o comprimento dos caracteres disponíveis
  const charactersLength: number = characters.length;

  // Loop para gerar cada dígito do código aleatório
  while (randomCodeLength > 0) {
    // Gerando um número aleatório entre 0 e o comprimento dos caracteres
    const randomNumber: number = Math.floor(Math.random() * charactersLength);

    // Adicionando o caractere correspondente ao número gerado ao código aleatório
    randomCode += characters.charAt(randomNumber);

    // Decrementando o comprimento restante do código aleatório
    randomCodeLength -= 1;
  }

  // Retornando o código aleatório gerado
  return randomCode;
};
