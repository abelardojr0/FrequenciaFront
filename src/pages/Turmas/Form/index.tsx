import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonAtom } from '../../../components/Atoms/ButtonAtom';
import { BoxInputMolecule } from '../../../components/Molecules/BoxInputMolecule';
import { SelectMolecule } from '../../../components/Molecules/SelectMolecule';
import { ContainerAuth, TitlePage } from '../../../utils/globalStyles';
import { useTurmas } from '../../../hooks/useTurmas';
import { FormTurmaStyled } from './style';
import { turmaSchema } from '../../../schemas/turmas';
import {
  dayMapping,
  dayOptions,
  moduloOptions,
  tipoOptions,
} from '../../../utils/options';

export const TurmaForm = () => {
  const { id } = useParams();
  const { turma, getTurmaById, updateTurma, postTurma } = useTurmas();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(turmaSchema),
    defaultValues: {
      nome: '',
      dia_da_semana: '',
      horario_inicio: '',
      horario_fim: '',
      total_alunos: 0,
      media_frequencia: 0,
      modulo_atual: '',
      tipo: '',
    },
  });

  const selectedDay = watch('dia_da_semana');
  const selectedHorInicio = watch('horario_inicio');
  const selectedTipo = watch('tipo');

  useEffect(() => {
    const dayPart = selectedDay ? dayMapping[selectedDay] : 'x';
    const hourPart = selectedHorInicio
      ? selectedHorInicio.substring(0, 2)
      : 'xx';
    const tipoPart = selectedTipo ? selectedTipo : 'x';
    const generatedName = `${dayPart}${hourPart} ${tipoPart}`;
    setValue('nome', generatedName);
  }, [selectedDay, selectedHorInicio, selectedTipo, setValue]);

  useEffect(() => {
    if (id) {
      getTurmaById(id);
    }
  }, [id, getTurmaById]);

  useEffect(() => {
    if (id && turma) {
      reset({
        nome: turma.nome,
        dia_da_semana: turma.dia_da_semana,
        horario_inicio: turma.horario_inicio,
        horario_fim: turma.horario_fim,
        total_alunos: turma.total_alunos,
        media_frequencia: turma.media_frequencia,
        modulo_atual: turma.modulo_atual,
        tipo: turma.tipo || '',
      });
    }
  }, [id, turma, reset]);

  const onSubmit = async (data: any) => {
    console.log(data);

    if (id) {
      await updateTurma(id, data);
    } else {
      await postTurma(data);
    }
  };

  const availableModuloOptions =
    selectedTipo && moduloOptions[selectedTipo]
      ? moduloOptions[selectedTipo]
      : [{ value: '', text: 'Selecione um Módulo' }];

  return (
    <ContainerAuth>
      <TitlePage>{id ? 'Editar Turma' : 'Cadastrar Turma'}</TitlePage>
      <FormTurmaStyled onSubmit={handleSubmit(onSubmit)}>
        <BoxInputMolecule
          type="text"
          htmlFor="nome"
          id="nome"
          children="Nome da Turma"
          {...register('nome')}
          error={!!errors.nome}
          errorMessage={errors.nome?.message as string | undefined}
          disabled
        />
        <SelectMolecule
          htmlFor="dia_da_semana"
          id="dia_da_semana"
          children="Dia da Semana"
          options={dayOptions}
          error={!!errors.dia_da_semana}
          errorMessage={errors.dia_da_semana?.message as string | undefined}
          {...register('dia_da_semana')}
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
        <SelectMolecule
          htmlFor="modulo_atual"
          id="modulo_atual"
          children="Módulo Atual"
          options={availableModuloOptions}
          error={!!errors.modulo_atual}
          errorMessage={errors.modulo_atual?.message as string | undefined}
          {...register('modulo_atual')}
        />
        <SelectMolecule
          htmlFor="tipo"
          id="tipo"
          children="Tipo de Curso"
          options={tipoOptions}
          error={!!errors.tipo}
          errorMessage={errors.tipo?.message as string | undefined}
          {...register('tipo')}
        />
        <BoxInputMolecule
          required
          type="number"
          htmlFor="total_alunos"
          id="total_alunos"
          children="Total de Alunos"
          {...register('total_alunos')}
          error={!!errors.total_alunos}
          errorMessage={errors.total_alunos?.message as string | undefined}
        />
        <BoxInputMolecule
          required
          type="number"
          htmlFor="media_frequencia"
          id="media_frequencia"
          children="Média de Frequência"
          {...register('media_frequencia')}
          error={!!errors.media_frequencia}
          errorMessage={errors.media_frequencia?.message as string | undefined}
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
      </FormTurmaStyled>
    </ContainerAuth>
  );
};
