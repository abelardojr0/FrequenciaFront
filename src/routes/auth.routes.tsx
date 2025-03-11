import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Auth/Home';
import { Login } from '../pages/Auth/Login';
import { Register } from '../pages/Auth/Register';
import { Forgot } from '../pages/Auth/Forgot';
import { Reset } from '../pages/Auth/Reset';
import { NotFound } from '../pages/NotFound';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot" element={<Forgot />} />
        <Route path="reset/:token?" element={<Reset />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
