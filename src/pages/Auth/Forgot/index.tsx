import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotSchema } from '../../../schemas/forgotSchema';
import api from '../../../services';
import { messageError, messageSuccess } from '../../../utils/toast';
import { ContainerAuth, FormStyled } from '../../../utils/globalStyles';
import { BoxInputMolecule } from '../../../components/Molecules/BoxInputMolecule';
import { ButtonAtom } from '../../../components/Atoms/ButtonAtom';

export const Forgot = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const { email } = data;
      const { data: responseData } = await api.post(
        '/accounts/password_recovery/',
        {
          email,
        },
      );

      messageSuccess(responseData.message);
      setTimeout(() => navigate('/login'), 500);
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message;
      messageError(errorMessage);
      setError('email', { type: 'server', message: errorMessage });
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
        <ButtonAtom disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Recuperar Senha'}
        </ButtonAtom>
      </FormStyled>
    </ContainerAuth>
  );
};
