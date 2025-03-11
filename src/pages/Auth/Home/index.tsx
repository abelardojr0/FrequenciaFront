import { Outlet, useLocation } from 'react-router-dom';
import {
  BoxDash,
  BoxDivDash,
  ButtonDash,
  ContainerDash,
  DashEstruturaCabecalho,
  DashEstruturaCorpo,
  DashEstruturaImagem,
  DashEstruturaLogin,
  DashImagem,
  DashLogo,
  DashLogoHidden,
} from './style';
import { useState } from 'react';
import foto from '../../../assets/foto.png';
import logo from '../../../assets/logo.jpeg';

export const Home = () => {
  const [active, setActive] = useState<string>('');
  const location = useLocation();

  return (
    <ContainerDash>
      <DashEstruturaCorpo>
        <DashEstruturaImagem>
          <DashImagem src={foto} alt="" />
        </DashEstruturaImagem>

        <DashEstruturaLogin>
          <BoxDash>
            <BoxDivDash>
              <ButtonDash
                className={active === 'login' ? 'ativo' : ''}
                to={'/login'}
                onClick={() => setActive('login')}
              >
                Login
              </ButtonDash>
              <ButtonDash
                className={active === 'register' ? 'ativo' : ''}
                to={'/register'}
                onClick={() => setActive('register')}
              >
                Cadastrar
              </ButtonDash>
            </BoxDivDash>
            <DashLogoHidden
              src={logo}
              style={{ display: location.pathname === '/' ? 'block' : 'none' }}
            />
            <Outlet />
          </BoxDash>
        </DashEstruturaLogin>
      </DashEstruturaCorpo>
    </ContainerDash>
  );
};
