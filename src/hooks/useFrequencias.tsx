import { useCallback, useState } from 'react';
import api from '../services';
import { messageError, messageSuccess } from '../utils/toast';
import { Frequencia } from '../utils/type';
import { useNavigate } from 'react-router-dom';

export const useFrequencias = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [frequencias, setFrequencias] = useState<Frequencia[]>([]);
  const [frequencia, setFrequencia] = useState<Frequencia | null>(null);
  const navigate = useNavigate();

  const postFrequencia = async (newFrequencia: Frequencia) => {
    setLoading(true);
    try {
      const { data } = await api.post('/frequencias', newFrequencia);
      messageSuccess('Frequência cadastrada com sucesso!');
      navigate('/frequencias');
      return data;
    } catch (error: any) {
      return error.response.data;
    } finally {
      setLoading(false);
    }
  };

  // Aceita um objeto de filtros (pode ser vazio)
  const getFrequencias = useCallback(
    async (filters: Record<string, any> = {}) => {
      // setLoading(true);
      try {
        // Passa os filtros como query params
        const { data } = await api.get('/frequencias', { params: filters });
        setFrequencias(data);
      } catch (error: any) {
        messageError('Erro ao carregar frequências. Tente novamente.');
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const getFrequenciaById = async (id: string | undefined) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/frequencias/${id}`);
      setFrequencia(data);
    } catch (error: any) {
      messageError('Erro ao carregar a frequência. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const updateFrequencia = async (id: string, frequenciaData: Frequencia) => {
    setLoading(true);
    try {
      const { data } = await api.put(`/frequencias/${id}`, frequenciaData);
      messageSuccess('Frequência atualizada com sucesso!');
      return data;
    } catch (error: any) {
      messageError('Erro ao atualizar a frequência. Tente novamente.');
      return error.response.data;
    } finally {
      setLoading(false);
    }
  };

  const deleteFrequencia = async (id: string | undefined) => {
    setLoading(true);
    try {
      const { data } = await api.delete(`/frequencias/${id}`);
      messageSuccess('Frequência excluída com sucesso!');
      setFrequencias(frequencias.filter((item) => item.id !== id));
      return data;
    } catch (error: any) {
      messageError('Erro ao excluir a frequência. Tente novamente.');
      return error.response.data;
    } finally {
      setLoading(false);
    }
  };

  return {
    postFrequencia,
    getFrequencias,
    getFrequenciaById,
    updateFrequencia,
    deleteFrequencia,
    frequencia,
    frequencias,
    loading,
  };
};
