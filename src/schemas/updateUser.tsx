import { z } from 'zod';

export const updateUserSchema = z.object({
  nome: z.string().nonempty('Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  assinatura: z.string().optional(),
  valor_hora_aula: z.coerce.number().optional(),
});
