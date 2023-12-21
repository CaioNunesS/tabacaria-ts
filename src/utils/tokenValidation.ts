// Função para gerar uma sequência aleatória de números entre 0 e 5 e concatená-los em uma string
export const secretValidation = (n: number) => {
  // Criando um array para armazenar os números
  const number = [];

  // Gerando n números aleatórios
  for (let i = 0; i < n; i++) {
    // Gerando um número aleatório entre 0 e 5
    const token = Math.floor(Math.random() * 6);

    // Adicionando o número ao array
    number.push(token);
  }

  // Convertendo o array de números em uma string
  return number.join('');
};
