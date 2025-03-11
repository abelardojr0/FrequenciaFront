import { useState, useEffect, createContext, ReactNode } from 'react';
import api from '../services';
import { messageError, messageSuccess } from '../utils/toast';
import { User } from '../utils/type';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  signin: (email: string, password: string) => Promise<any>;
  forgot: (email: string) => Promise<any>;
  reset: (email: string, token: string, password: string) => Promise<any>;
}

export const AuthContext = createContext<AuthContextProps>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const signin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await api.post('/login', {
        email,
        password,
      });
      setUser(data.user);
      localStorage.setItem('authToken', data.access_token);
      localStorage.setItem('refreshToken', data.refresh_token);
      localStorage.setItem('userId', data.data.user.id);
      navigate('/');
      await fetchUserDetails(data.data.user.id);
      console.log(data);

      return data;
    } catch (error: any) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  const forgot = async (email: string) => {
    setLoading(true);
    try {
      const { data } = await api.post('/forgot-password', { email });
      messageSuccess('Email de confirmação enviado');
      return data;
    } catch (error: any) {
      messageError('Email incorreto. Tente novamente');
      return error.message;
    } finally {
      setLoading(false);
    }
  };

  const reset = async (token: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await api.post('/reset-password', {
        token,
        password,
      });
      messageSuccess('Senha confirmada com sucesso');
      return data;
    } catch (error: any) {
      messageError('Dados incorretos. Tente novamente');
      return error.message;
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async (userId: number) => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      try {
        const { data } = await api.get(`/users/${userId}/`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        localStorage.setItem('username', data.username);
        setUser(data);
      } catch (error) {
        console.error('Erro ao obter detalhes do usuário:', error);
      }
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    if (authToken && userId && !user) {
      fetchUserDetails(+userId);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, signin, loading, forgot, reset }}>
      {children}
    </AuthContext.Provider>
  );
};
