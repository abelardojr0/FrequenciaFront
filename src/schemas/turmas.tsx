import { z } from 'zod';

export const turmaSchema = z.object({
  nome: z.string().nonempty('Nome é obrigatório'),
  horario_inicio: z.string().nonempty('Horário de início é obrigatório'),
  horario_fim: z.string().nonempty('Horário de fim é obrigatório'),
  total_alunos: z.coerce
    .number({ invalid_type_error: 'Total de alunos deve ser um número' })
    .min(0, 'Deve ser um número positivo'),
  media_frequencia: z.coerce
    .number({ invalid_type_error: 'Média de frequência deve ser um número' })
    .min(0, 'Deve ser um número positivo'),
  modulo_atual: z.string().nonempty('Módulo atual é obrigatório'),
  tipo: z.string().nonempty('Nome é obrigatório'),
});
