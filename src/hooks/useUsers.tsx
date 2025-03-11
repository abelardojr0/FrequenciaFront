import { useCallback, useState } from 'react';
import api from '../services';
import { messageError, messageSuccess } from '../utils/toast';
import { User } from '../utils/type';
import { useNavigate } from 'react-router-dom';

export const useUsers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const postUser = async (newUser: User) => {
    setLoading(true);
    try {
      const { data } = await api.post('/register', newUser);
      messageSuccess('Usuário cadastrado com sucesso!');
      navigate('/login');
      return data;
    } catch (error: any) {
      return error.response.data;
    } finally {
      setLoading(false);
    }
  };

  const getUsers = useCallback(async () => {
    try {
      const { data } = await api.get('/users');
      setUsers(data);
      setLoading(false);
    } catch (error: any) {
      messageError('Erro ao carregar usuário. Tente novamente.');
      setLoading(false);
    }
  }, []);

  const getUserById = async (id: string | undefined) => {
    try {
      setLoading(true);
      const { data } = await api.get(`/users/${id}`);
      setUser(data);
      setLoading(false);
    } catch (err: any) {
      messageError('Erro ao carregar usuário. Tente novamente.');
      setLoading(false);
    }
  };

  const updateUser = async (id: string | undefined, userData: FormData) => {
    setLoading(true);
    try {
      const { data } = await api.put(`/users/${id}`, userData);
      messageSuccess('Usuário atualizado com sucesso!');
      return data;
    } catch (error: any) {
      messageError('Erro ao atualizar usuário. Tente novamente.');
      return error.response;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await api.delete(`/users/${id}`);
      messageSuccess('Usuário excluído com sucesso!');
      setUsers(users.filter((user) => user.id !== id));
      return data;
    } catch (error: any) {
      messageError('Erro ao excluir usuário. Tente novamente.');
      return error.response.data;
    } finally {
      setLoading(false);
    }
  };

  return {
    postUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    user,
    users,
    loading,
  };
};
