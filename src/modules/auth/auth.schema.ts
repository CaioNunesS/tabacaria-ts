import { object, string } from 'zod';

export const registerSchema = object({
  body: object({
    email: string({
      required_error: 'Email é obrigatório',
    }).email(),
    name: string({
      required_error: 'Nome é obrigatório',
    }),
    password: string({
      required_error: 'password é obrigatório',
    }).min(6, 'Deve ter ao menos 6 caracteres'),
  }),
});

export const registerCompleteSchema = object({
  body: object({
    email: string({
      required_error: 'Email é obrigatório',
    }).email(),
    name: string({
      required_error: 'Nome é obrigatório',
    }),
    gitHubId: string({
      required_error: 'gitHubId é obrigatório',
    }),
    password: string({
      required_error: 'password é obrigatório',
    }).min(6, 'Deve ter ao menos 6 caracteres'),
  }),
});

export const loginSchema = object({
  body: object({
    email: string({
      required_error: 'email is requiredEmail é obrigatório',
    }).email(),
    password: string({
      required_error: 'Password é obrigatório',
    }).min(6, 'Deve ter ao menos 6 caracteres'),
  }),
});

export const refreshTokenSchema = object({
  body: object({
    refreshToken: string({
      required_error: 'refresh token é obrigatório',
    }),
  }),
});

export const revokeTokenSchema = object({
  body: object({
    userId: string({
      required_error: 'userId é obrigatório',
    }),
  }),
});
