import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormStyled } from './style';
import { useUsers } from '../../../hooks/useUsers';
import { updateUserSchema } from '../../../schemas/updateUser';
import { ContainerAuth, TitlePage } from '../../../utils/globalStyles';
import { BoxInputMolecule } from '../../../components/Molecules/BoxInputMolecule';
import { SignaturePadComponent } from '../../../components/Molecules/Assinatura';
import { ButtonAtom } from '../../../components/Atoms/ButtonAtom';

export const ConfiguracoesUsers = () => {
  const { id } = useParams();
  const { getUserById, user, updateUser } = useUsers();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      nome: '',
      cpf: '',
      email: '',
      user_type: 'Admin',
      assinatura: '',
      valor_hora_aula: '',
    },
  });

  const [signature, setSignature] = useState<string>('');

  useEffect(() => {
    if (id) {
      getUserById(id);
    }
  }, [id]);

  useEffect(() => {
    if (user) {
      reset({
        nome: user.nome,
        email: user.email,
        assinatura: user.assinatura || '',
        valor_hora_aula: user.valor_hora_aula
          ? user.valor_hora_aula.toString()
          : '',
      });
      setSignature(user.assinatura || '');
    }
  }, [user, reset]);

  const handleSignatureSave = (data: string) => {
    setSignature(data);
    setValue('assinatura', data);
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append('nome', data.nome);
    formData.append('email', data.email);
    formData.append('assinatura', data.assinatura);
    formData.append('valor_hora_aula', data.valor_hora_aula);
    await updateUser(id, formData);
  };

  return (
    <ContainerAuth>
      <TitlePage>Atualizar Informações do Usuário</TitlePage>
      <FormStyled onSubmit={handleSubmit(onSubmit)}>
        <BoxInputMolecule
          type="text"
          htmlFor="nome"
          id="nome"
          children="Nome"
          {...register('nome')}
          error={!!errors.nome}
          errorMessage={errors.nome?.message as string | undefined}
        />
        <BoxInputMolecule
          type="email"
          htmlFor="email"
          id="email"
          children="Email"
          {...register('email')}
          error={!!errors.email}
          errorMessage={errors.email?.message as string | undefined}
        />
        <BoxInputMolecule
          type="number"
          htmlFor="valor_hora_aula"
          id="valor_hora_aula"
          children="Valor da Hora Aula"
          {...register('valor_hora_aula')}
          error={!!errors.valor_hora_aula}
          errorMessage={errors.valor_hora_aula?.message as string | undefined}
        />
        
        <SignaturePadComponent
          onSave={handleSignatureSave}
          initialSignature={signature}
        />
        <ButtonAtom disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
        </ButtonAtom>
      </FormStyled>
    </ContainerAuth>
  );
};
