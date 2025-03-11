import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthContext } from '../../../contexts/AuthProvider';
import { ContainerAuth, FormStyled } from '../../../utils/globalStyles';
import { BoxInputMolecule } from '../../../components/Molecules/BoxInputMolecule';
import { ButtonAtom } from '../../../components/Atoms/ButtonAtom';
import { messageError } from '../../../utils/toast';
import { loginSchema } from '../../../schemas/login';
import { cores } from '../../../utils/theme';

export const Login = () => {
  const auth = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const { email, password } = data;
      const { data: responseData } = await auth.signin(email, password);
      console.log(data);
      console.log(responseData);

      if (!responseData) {
        setError('email', {
          type: 'server',
          message: 'Credenciais inválidas',
        });
        return;
      }
    } catch (error) {
      messageError('Erro ao fazer login');
      console.error(error);
    }
  };

  return (
    <ContainerAuth>
      <FormStyled onSubmit={handleSubmit(onSubmit)}>
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
          type="password"
          htmlFor="password"
          id="password"
          children="Senha"
          {...register('password')}
          error={!!errors.password}
          errorMessage={errors.password?.message as string | undefined}
        />
        <Link style={{ color: cores.cor_principal }} to={'/forgot'}>
          Esqueceu a senha?
        </Link>
        <ButtonAtom disabled={isSubmitting}>
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </ButtonAtom>
      </FormStyled>
    </ContainerAuth>
  );
};
