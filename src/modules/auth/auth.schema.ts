import { object, string } from 'zod';

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
