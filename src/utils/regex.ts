// Expressão regular para validar senhas:
// - Pelo menos um número
// - Pelo menos uma letra minúscula
// - Pelo menos uma letra maiúscula
// - Mínimo de seis caracteres
export const passwordRegex =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6})$/;

// Expressão regular para validar números de telefone brasileiros:
// - Começa com dois dígitos
// - Seguido por um "9"
// - Mais oito dígitos
export const phoneRegex = /^(\d{2})(9\d{8})$/;

// Expressão regular para validar endereços de e-mail:
export const emailRegex =
  /^[A-Za-z][A-Za-z0-9._-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

// Expressão regular para validar valores numéricos, incluindo decimais:
export const valueRegex = /^\d+(\.\d+)?$/;

// Expressão regular para validar CEPs brasileiros:
// - Oito dígitos
export const cepRegex = /^\d{8}$/;

// Expressão regular para validar sequências que contêm apenas números:
export const onlyNumbersRegex = /^[0-9]+$/;

// Expressão regular para validar sequências que contêm apenas letras e espaços:
export const onlyLettersRegex = /^[A-Za-z\s]+$/;
