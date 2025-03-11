import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastOptions: ToastOptions = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const messageSuccess = (message: string) => {
  toast.success(message, {
    ...toastOptions,
    style: {
      backgroundColor: '#fff',
      color: '#4caf50',
    },
  });
};

export const messageError = (message: string) => {
  toast.error(message, {
    ...toastOptions,
    style: {
      backgroundColor: '#fff',
      color: '#f44336',
    },
  });
};

export const messageWarning = (message: string) => {
  toast.warn(message, {
    ...toastOptions,
    style: {
      backgroundColor: '#fff',
      color: '#ff9800',
    },
  });
};
