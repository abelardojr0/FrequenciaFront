import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import RoutesApp from './routes';
import { ToastContainer } from 'react-toastify';
import { GlobalStyles } from './utils/globalStyles';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <GlobalStyles />
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
