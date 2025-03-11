import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUsers } from '../../../hooks/useUsers';
import { ContainerAuth } from '../../../utils/globalStyles';
import { FormRegisterStyled } from './style';
import { BoxInputMolecule } from '../../../components/Molecules/BoxInputMolecule';
import { ButtonAtom } from '../../../components/Atoms/ButtonAtom';
import { registerSchema } from '../../../schemas/register';

export const Register = () => {
  const { postUser } = useUsers();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: any) => {
    const result = await postUser({
      nome: data.nome,
      email: data.email,
      password: data.password,
    });

    if (result.email) {
      setError('email', {
        type: 'server',
        message: result.email[0],
      });
    }

    if (result.nome) {
      setError('nome', {
        type: 'server',
        message: result.nome[0],
      });
    }
  };

  return (
    <ContainerAuth>
      <FormRegisterStyled onSubmit={handleSubmit(onSubmit)}>
        <BoxInputMolecule
          required
          type="text"
          htmlFor="nome"
          id="nome"
          children="nome"
          {...register('nome')}
          error={!!errors.nome}
          errorMessage={errors.nome?.message as string | undefined}
        />
        <BoxInputMolecule
          required
          type="email"
          htmlFor="email"
          id="email"
          children="Email"
          {...register('email')}
          error={!!errors.email}
          errorMessage={errors.email?.message as string | undefined}
        />
        <BoxInputMolecule
          required
          type="password"
          htmlFor="password"
          id="password"
          children="Senha"
          {...register('password')}
          error={!!errors.password}
          errorMessage={errors.password?.message as string | undefined}
        />
        <BoxInputMolecule
          required
          type="password"
          htmlFor="confirmPassword"
          id="confirmPassword"
          children="Confirmar Senha"
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message as string | undefined}
        />

        <ButtonAtom disabled={isSubmitting}>
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </ButtonAtom>
      </FormRegisterStyled>
    </ContainerAuth>
  );
};
