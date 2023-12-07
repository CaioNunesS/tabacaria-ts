import rateLimit from 'express-rate-limit';

// Cria a regra de limite de taxa
export const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  limit: 2, // limita cada IP a 2 solicitações por windowMs
});
