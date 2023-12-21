// Definindo uma classe de erro personalizada chamada AppError
export class AppError extends Error {
  // Adicionando propriedade 'status' para armazenar o código de status HTTP
  status: number;

  // Construtor da classe que aceita uma mensagem e um código de status HTTP
  constructor(message: string, status: number) {
    // Chamando o construtor da classe pai (Error) com a mensagem
    super(message);

    // Atribuindo o código de status HTTP à propriedade 'status' (ou padrão para 400 se não fornecido)
    this.status = status || 400;

    // Definindo o nome da instância da classe como 'AppError'
    this.name = 'AppError';
  }
}
