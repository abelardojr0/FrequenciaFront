export const generateCSVDataFunction = (
  filteredFrequencias: any,
  reportData: any,
) => {
  const base =
    filteredFrequencias?.map((freq: any) => ({
      data: freq.data,
      dia_da_semana: freq.dia_da_semana,
      turma_nome: freq.turma_details?.nome || '',
      modulo_atual: freq.turma_details?.modulo_atual || '',
      horario_inicio: freq.horario_inicio,
      horario_fim: freq.horario_fim,
    })) || [];

  if (reportData) {
    base.push({
      data: '',
      dia_da_semana: '',
      turma_nome: '',
      modulo_atual: '',
      horario_inicio: '',
      horario_fim: '',
    });
    base.push({
      data: 'Tipo',
      dia_da_semana: 'Horas',
      turma_nome: 'Valor',
      modulo_atual: '',
      horario_inicio: '',
      horario_fim: '',
    });
    base.push({
      data: 'Aula Compartilhada',
      dia_da_semana: reportData.formattedWK,
      turma_nome: reportData.valorWK.toFixed(2),
      modulo_atual: '',
      horario_inicio: '',
      horario_fim: '',
    });
    base.push({
      data: 'Super Módulo)',
      dia_da_semana: reportData.formattedSM,
      turma_nome: reportData.valorSM.toFixed(2),
      modulo_atual: '',
      horario_inicio: '',
      horario_fim: '',
    });
    base.push({
      data: 'Hora/Aula',
      dia_da_semana: reportData.formattedOther,
      turma_nome: reportData.valorHoras.toFixed(2),
      modulo_atual: '',
      horario_inicio: '',
      horario_fim: '',
    });
    base.push({
      data: 'Total',
      dia_da_semana: reportData.formattedTotalHoras,
      turma_nome: reportData.total.toFixed(2),
      modulo_atual: '',
      horario_inicio: '',
      horario_fim: '',
    });
  }

  return base;
};

export const headers = [
  { label: 'Data', key: 'data' },
  { label: 'Dia da Semana', key: 'dia_da_semana' },
  { label: 'Nome da Turma', key: 'turma_nome' },
  { label: 'Módulo Atual', key: 'modulo_atual' },
  { label: 'Horário de Início', key: 'horario_inicio' },
  { label: 'Horário de Fim', key: 'horario_fim' },
];
