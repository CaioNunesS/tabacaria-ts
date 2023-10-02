type IVerificationCode = {
  name: string;
  code: string;
};

export const verificationCodeSms = async ({
  name,
  code,
}: IVerificationCode) => {
  return `
    Olá, ${name}, Seu código de verificação é o ${code}
    `;
};
