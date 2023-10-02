import { object, string } from 'zod';
import { phoneRegex } from '../../utils/regex';
import { IChangePassword } from '../auth/auth.service';

export const registerSchema = object({
  body: object({
    email: string({
      required_error: 'Email é um campo obrigatório',
    }).email({ message: 'Email inválido' }),
    name: string({
      required_error: 'Name é um campo obrigatório',
    })
      .min(3, 'O name deve ter ao menos 3 caracteres')
      .trim(),
    password: string({
      required_error: 'Password é um campo obrigatório',
    })
      .min(6, 'Deve ter ao menos 6 caracteres')
      .trim(),
    phoneNumber: string({
      required_error: 'O phoneNumber é um campo obrigatório',
    }).regex(phoneRegex, { message: 'O telefone informado é inválido' }),
  }),
});

export const registerCompleteSchema = object({
  body: object({
    email: string({
      required_error: 'Email é um campo obrigatório',
    }).email(),
    name: string({
      required_error: 'Nome é um campo obrigatório',
    }),
    gitHubId: string({
      required_error: 'GitHubId é um campo obrigatório',
    }),
    password: string({
      required_error: 'Password é um campo obrigatório',
    }).min(6, 'Deve ter ao menos 6 caracteres'),
  }),
});

export const loginSchema = object({
  body: object({
    email: string({
      required_error: 'Email é um campo obrigatório',
    }).email({ message: 'Email inválido' }),
    password: string({
      required_error: 'Password é um campo obrigatório',
    }).min(6, 'Deve ter ao menos 6 caracteres'),
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
