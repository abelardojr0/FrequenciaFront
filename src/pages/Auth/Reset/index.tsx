import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '../../../schemas/resetPasswordSchema';
import api from '../../../services';
import { messageError, messageSuccess } from '../../../utils/toast';
import { ContainerAuth, FormStyled } from '../../../utils/globalStyles';
import { BoxInputMolecule } from '../../../components/Molecules/BoxInputMolecule';
import { ButtonAtom } from '../../../components/Atoms/ButtonAtom';

export const Reset = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const { password } = data;
      const { data: responseData } = await api.post(
        '/accounts/password_recovery/confirm/',
        {
          token,
          password,
        },
      );

      messageSuccess(responseData.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message;
      messageError(errorMessage);
      setError('password', { type: 'server', message: errorMessage });
    }
  };

  return (
    <ContainerAuth>
      <FormStyled onSubmit={handleSubmit(onSubmit)}>
        <BoxInputMolecule
          type="password"
          htmlFor="password"
          id="password"
          children="Nova Senha"
          {...register('password')}
          error={!!errors.password}
          errorMessage={errors.password?.message as string | undefined}
        />
        <BoxInputMolecule
          type="password"
          htmlFor="confirmPassword"
          id="confirmPassword"
          children="Confirmar Senha"
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message as string | undefined}
        />
        <ButtonAtom disabled={isSubmitting}>
          {isSubmitting ? 'Alterando...' : 'Alterar'}
        </ButtonAtom>
      </FormStyled>
    </ContainerAuth>
  );
};
