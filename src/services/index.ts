import axios from 'axios';
import { messageError } from '../utils/toast';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});
let isRefreshing = false;
let refreshSubscribers: any = [];

api.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem('authToken');

    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  function (error) {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalConfig = error.config;

    if (error?.response?.status === 403) {
      alert('Usuário não tem permissão para a ação!');
    }

    if (
      error?.response?.status === 401 &&
      !originalConfig._retry &&
      (sessionStorage.getItem('refreshToken') ||
        localStorage.getItem('refreshToken'))
    ) {
      originalConfig._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refresh =
            sessionStorage.getItem('refreshToken') ||
            localStorage.getItem('refreshToken');

          const { data } = await api.post('/refresh-token', {
            refresh,
          });

          const access_token = data.access;
          const refresh_token = data.refresh;

          if (sessionStorage.getItem('authToken')) {
            sessionStorage.setItem('authToken', access_token);
            sessionStorage.setItem('refreshToken', refresh_token);
          } else {
            localStorage.setItem('authToken', access_token);
            localStorage.setItem('refreshToken', refresh_token);
          }

          // Executa todos os pedidos pendentes após a atualização do token
          refreshSubscribers.forEach((callback: any) => callback(access_token));
          refreshSubscribers = [];

          return api(originalConfig);
        } catch (_error) {
          console.log(_error);

          messageError('Sessão expirada. Por favor, faça login novamente.');

          sessionStorage.removeItem('authToken');
          sessionStorage.removeItem('refreshToken');

          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');

          window.location.href = window.location.origin;
          return Promise.reject(_error);
        } finally {
          isRefreshing = false;
        }
      } else {
        return new Promise((resolve) => {
          refreshSubscribers.push((token: string) => {
            originalConfig.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalConfig));
          });
        });
      }
    }

    return Promise.reject(error);
  },
);

export default api;
