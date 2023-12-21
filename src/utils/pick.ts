// Função para extrair propriedades específicas de um objeto
const pick = (obj: object, keys: string[]) => {
  // Usando o método reduce para criar um novo objeto contendo apenas as propriedades desejadas
  return keys.reduce<{ [key: string]: unknown }>((finalObj, key) => {
    // Verificando se o objeto original tem a propriedade desejada
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      // Adicionando a propriedade ao novo objeto
      finalObj[key] = obj[key as keyof typeof obj];
    }
    // Retornando o objeto acumulado
    return finalObj;
  }, {});
};

// Exportando a função pick como padrão
export default pick;
