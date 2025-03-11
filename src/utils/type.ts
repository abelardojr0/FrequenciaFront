export interface User {
  id?: string | number;
  email: string;
  nome?: string;
  password?: string;
  assinatura?: any;
  valor_hora_aula?: string | number;
}

interface TurmaDetailsProps {
  nome: string;
  tipo: string;
  modulo_atual: string;
}
export type Frequencia = {
  id?: string;
  data: string;
  dia_da_semana: string;
  turma: string;
  horario_inicio: string;
  horario_fim: string;
  assinatura: string;
  turma_details: TurmaDetailsProps;
};

export type Turma = {
  id?: string;
  nome: string;
  horario_inicio: string;
  horario_fim: string;
  total_alunos: number;
  media_frequencia: number;
  modulo_atual: string;
  tipo: string;
  dia_da_semana: string;
};
