import { object, string } from 'zod';
import { onlyLettersRegex, phoneRegex } from '../../utils/regex';
import { IChangePassword } from '../auth/auth.service';

export const registerSchema = object({
  body: object({
    name: string({
      required_error: 'Nome é um campo obrigatório',
    })
      .trim()
      .regex(onlyLettersRegex, { message: 'Apenas letras são aceitas no nome' })
      .min(3, 'O nome deve ter ao menos 3 caracteres'),
    email: string({
      required_error: 'Email é um campo obrigatório',
    }).email({ message: 'Email inválido' }),
    phoneNumber: string({
      required_error: 'O celular é um campo obrigatório',
    }).regex(phoneRegex, { message: 'O telefone informado é inválido' }),
    password: string({
      required_error: 'Senha é um campo obrigatório',
    })
      .trim()
      .min(6, 'A senha deve ter ao menos 6 caracteres'),
  }),
});

export const registerCompleteSchema = object({
  body: object({
    email: string({
      required_error: 'Email é um campo obrigatório',
    })
      .trim()
      .email(),
    name: string({
      required_error: 'Nome é um campo obrigatório',
    }).trim(),
    gitHubId: string({
      required_error: 'GitHubId é um campo obrigatório',
    }),
    password: string({
      required_error: 'Password é um campo obrigatório',
    })
      .trim()
      .min(6, 'A senha deve ter ao menos 6 caracteres'),
  }),
});

export const loginSchema = object({
  body: object({
    email: string({
      required_error: 'Email é um campo obrigatório',
    })
      .trim()
      .email({ message: 'Senha ou email incorretos' }),
    password: string({
      required_error: 'Senha é um campo obrigatório',
    })
      .trim()
      .min(6, 'Senha ou email incorretos'),
  }),
});

export const refreshTokenSchema = object({
  body: object({
    refreshToken: string({
      required_error: 'O refresh token é um campo obrigatório',
    }),
  }),
});

export const revokeTokenSchema = object({
  body: object({
    userId: string({
      required_error: 'O userId é um campo obrigatório',
    }).uuid({ message: 'Padrão inválido para uuid' }),
  }),
});

export const validateChangePassword = (body: IChangePassword) => {
  const user = object({
    newPassword: string({
      required_error: 'O newPassword é um campo obrigatório',
    })
      .trim()
      .min(6)
      .max(255),
    confirmNewPassword: string({
      required_error: 'O confirmNewPassword é um campo obrigatório',
    })
      .trim()
      .min(6)
      .max(255),
  }).refine(
    ({ newPassword, confirmNewPassword }) => newPassword === confirmNewPassword,
    { message: 'As senhas não são iguais' }
  );
  return user.safeParse(body);
};
