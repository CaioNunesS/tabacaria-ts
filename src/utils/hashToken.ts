// Importando a função createHash do módulo crypto
import { createHash } from 'crypto';

// Função para gerar um hash SHA-256 de um token
export const hashToken = (token: string) => {
  // Criando um objeto de hash usando o algoritmo SHA-256
  const hash = createHash('sha256');

  // Atualizando o hash com o conteúdo do token
  hash.update(token);

  // Gerando o hash final como uma string hexadecimal
  const hashedToken = hash.digest('hex');

  // Retornando o hash gerado
  return hashedToken;
};
