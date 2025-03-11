import { useCallback, useState } from 'react';
import api from '../services';
import { messageError, messageSuccess } from '../utils/toast';
import { Turma } from '../utils/type';
import { useNavigate } from 'react-router-dom';

export const useTurmas = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [turma, setTurma] = useState<Turma | null>(null);
  const navigate = useNavigate();

  const postTurma = async (newTurma: Turma) => {
    setLoading(true);
    try {
      const { data } = await api.post('/turmas', newTurma);
      messageSuccess('Turma cadastrada com sucesso!');
      navigate('/turmas');
      return data;
    } catch (error: any) {
      return error.response.data;
    } finally {
      setLoading(false);
    }
  };

  const getTurmas = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/turmas');
      setTurmas(data);
    } catch (error: any) {
      messageError('Erro ao carregar turmas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  const getTurmaById = async (id: string | undefined) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/turmas/${id}`);
      setTurma(data);
    } catch (error: any) {
      messageError('Erro ao carregar turma. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const updateTurma = async (id: string, turmaData: Turma) => {
    setLoading(true);
    try {
      const { data } = await api.put(`/turmas/${id}`, turmaData);
      messageSuccess('Turma atualizada com sucesso!');
      navigate('/turmas');
      return data;
    } catch (error: any) {
      messageError('Erro ao atualizar turma. Tente novamente.');
      return error.response.data;
    } finally {
      setLoading(false);
    }
  };

  const deleteTurma = async (id: string | undefined) => {
    try {
      const { data } = await api.delete(`/turmas/${id}`);
      messageSuccess('Turma excluída com sucesso!');
      setTurmas((prevTurmas) => prevTurmas.filter((turma) => turma.id !== id));
      return data;
    } catch (error: any) {
      messageError('Erro ao excluir turma. Tente novamente.');
      return error.response.data;
    } finally {
      setLoading(false);
    }
  };

  return {
    postTurma,
    getTurmas,
    getTurmaById,
    updateTurma,
    deleteTurma,
    turma,
    turmas,
    loading,
  };
};
