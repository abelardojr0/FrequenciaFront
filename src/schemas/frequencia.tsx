import { z } from 'zod';

export const frequenciaSchema = z.object({
  data: z.string().nonempty('Data é obrigatória'),
  dia_da_semana: z.string().nonempty('Dia da semana é obrigatório'),
  turma: z.string().nonempty('Turma é obrigatória'),
  horario_inicio: z.string().nonempty('Horário de início é obrigatório'),
  horario_fim: z.string().nonempty('Horário de fim é obrigatório'),
});
