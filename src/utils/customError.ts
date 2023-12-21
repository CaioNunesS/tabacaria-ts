// Definindo uma classe de erro personalizada chamada CustomError
export class CustomError extends Error {
  // Adicionando propriedade 'statusCode' para armazenar o código de status HTTP
  statusCode: number;

  // Construtor da classe que aceita uma mensagem e um código de status HTTP
  constructor(message: string, statusCode: number) {
    // Chamando o construtor da classe pai (Error) com a mensagem
    super(message);

    // Atribuindo o código de status HTTP à propriedade 'statusCode' (ou padrão para 400 se não fornecido)
    this.statusCode = statusCode || 400;
  }
}

// Função para lançar uma instância de CustomError com uma mensagem e um código de status HTTP
export const throwError = (message: string, statusCode: number) => {
  throw new CustomError(message, statusCode);
};
