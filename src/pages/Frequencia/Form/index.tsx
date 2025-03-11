import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonAtom } from '../../../components/Atoms/ButtonAtom';
import { BoxInputMolecule } from '../../../components/Molecules/BoxInputMolecule';
import { SelectMolecule } from '../../../components/Molecules/SelectMolecule';
import { ContainerAuth, TitlePage } from '../../../utils/globalStyles';
import { frequenciaSchema } from '../../../schemas/frequencia';
import { useFrequencias } from '../../../hooks/useFrequencias';
import { useTurmas } from '../../../hooks/useTurmas';
import { FormRegisterStyled } from '../../Auth/Register/style';
import { AuthContext } from '../../../contexts/AuthProvider';

export const FrequenciaForm = () => {
  const { id } = useParams();
  const { frequencia, getFrequenciaById, updateFrequencia, postFrequencia } =
    useFrequencias();
  const { turmas, getTurmas } = useTurmas();
  const auth = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(frequenciaSchema),
    defaultValues: {
      data: '',
      dia_da_semana: '',
      turma: '',
      horario_inicio: '',
      horario_fim: '',
      assinatura: '',
    },
  });

  const selectedDate = watch('data');
  const selectedTurmaId = watch('turma');

  // Estado para armazenar a última turma selecionada e evitar atualizações repetitivas
  const [lastSelectedTurmaId, setLastSelectedTurmaId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (id) {
      getFrequenciaById(id);
    }
    getTurmas();
  }, [id]);

  // Reseta o formulário com os dados carregados (modo edição)
  useEffect(() => {
    if (id && frequencia) {
      reset({
        data: frequencia.data,
        dia_da_semana: frequencia.dia_da_semana,
        turma: frequencia.turma,
        horario_inicio: frequencia.horario_inicio,
        horario_fim: frequencia.horario_fim,
        assinatura: frequencia.assinatura,
      });
      // Define a última turma selecionada para não disparar o efeito abaixo
      setLastSelectedTurmaId(frequencia.turma);
    }
  }, [id, frequencia, reset]);

  // Atualiza o campo "dia_da_semana" sempre que a data selecionada muda
  useEffect(() => {
    if (selectedDate) {
      const dateObj = new Date(selectedDate + 'T00:00:00');
      const daysOfWeek = [
        'Domingo',
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado',
      ];
      setValue('dia_da_semana', daysOfWeek[dateObj.getDay()]);
    }
  }, [selectedDate, setValue]);

  // Limpa os campos de horário sempre que a data for modificada
  useEffect(() => {
    if (selectedDate) {
      setValue('horario_inicio', '');
      setValue('horario_fim', '');
    }
  }, [selectedDate, setValue]);

  const turmaOptions =
    turmas?.map((turma) => ({
      value: turma.id,
      text: turma.nome,
    })) || [];

  // Cria a opção padrão
  const defaultOption = { value: '', text: 'Selecione uma Turma' };

  // Filtra as opções de turma conforme o dia da semana
  const dayToPrefix: Record<string, string> = {
    Domingo: '1',
    'Segunda-feira': '2',
    'Terça-feira': '3',
    'Quarta-feira': '4',
    'Quinta-feira': '5',
    'Sexta-feira': '6',
    Sábado: '7',
  };
  const selectedDay = watch('dia_da_semana');
  const desiredPrefix = selectedDay ? dayToPrefix[selectedDay] : '';

  const filteredTurmaOptions =
    selectedDay && desiredPrefix.length > 0
      ? [
          defaultOption,
          ...turmaOptions.filter((option) =>
            String(option.text).startsWith(desiredPrefix),
          ),
        ]
      : [defaultOption];

  // Atualiza os campos de horário automaticamente ao selecionar uma nova turma,
  // somente se a turma selecionada for diferente da última registrada.
  useEffect(() => {
    if (selectedTurmaId && turmas && selectedTurmaId !== lastSelectedTurmaId) {
      const selectedTurma = turmas.find(
        (turma) => String(turma.id) === String(selectedTurmaId),
      );
      if (selectedTurma) {
        setValue('horario_inicio', selectedTurma.horario_inicio);
        setValue('horario_fim', selectedTurma.horario_fim);
        setLastSelectedTurmaId(selectedTurmaId);
      }
    }
  }, [selectedTurmaId, turmas, lastSelectedTurmaId, setValue]);

  const onSubmit = async (data: any) => {
    data.assinatura = auth.user?.assinatura;
    if (id) {
      await updateFrequencia(id, data);
    } else {
      await postFrequencia(data);
    }
  };

  return (
    <ContainerAuth>
      <TitlePage>{id ? 'Editar Frequência' : 'Cadastrar Frequência'}</TitlePage>
      <FormRegisterStyled onSubmit={handleSubmit(onSubmit)}>
        <BoxInputMolecule
          required
          type="date"
          htmlFor="data"
          id="data"
          children="Data"
          {...register('data')}
          error={!!errors.data}
          errorMessage={errors.data?.message as string | undefined}
        />
        <BoxInputMolecule
          required
          type="text"
          htmlFor="dia_da_semana"
          id="dia_da_semana"
          children="Dia da Semana"
          {...register('dia_da_semana')}
          error={!!errors.dia_da_semana}
          errorMessage={errors.dia_da_semana?.message as string | undefined}
          disabled
        />
        <SelectMolecule
          htmlFor="turma"
          id="turma"
          children="Turma"
          options={filteredTurmaOptions}
          error={!!errors.turma}
          errorMessage={errors.turma?.message as string | undefined}
          {...register('turma')}
        />

        <BoxInputMolecule
          required
          type="time"
          htmlFor="horario_inicio"
          id="horario_inicio"
          children="Horário de Início"
          {...register('horario_inicio')}
          error={!!errors.horario_inicio}
          errorMessage={errors.horario_inicio?.message as string | undefined}
        />
        <BoxInputMolecule
          required
          type="time"
          htmlFor="horario_fim"
          id="horario_fim"
          children="Horário de Fim"
          {...register('horario_fim')}
          error={!!errors.horario_fim}
          errorMessage={errors.horario_fim?.message as string | undefined}
        />

        <ButtonAtom disabled={isSubmitting}>
          {isSubmitting
            ? id
              ? 'Salvando...'
              : 'Cadastrando...'
            : id
            ? 'Salvar Alterações'
            : 'Cadastrar'}
        </ButtonAtom>
      </FormRegisterStyled>
    </ContainerAuth>
  );
};
