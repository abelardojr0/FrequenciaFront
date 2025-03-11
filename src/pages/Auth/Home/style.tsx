import styled from 'styled-components';
import { Link } from 'react-router-dom';
import responsive, { breakpoints } from '../../../utils/responsive';
import { cores } from '../../../utils/theme';

export const ContainerDash = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  padding: 20px 0;
  min-height: 100vh;
  ${responsive(breakpoints.tablet)} {
    padding: 0px;
  }
`;

export const DashEstruturaLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-direction: column;
`;

export const DashEstruturaImagem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-direction: column;
`;
export const DashEstruturaCabecalho = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${responsive(breakpoints.tablet)} {
    flex-direction: column;
  }
`;

export const DashEstruturaCorpo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 30px;

  background: rgba(255, 255, 255, 0.1);

  backdrop-filter: blur(5px);

  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  border-radius: 20px;

  ${responsive(breakpoints.tablet)} {
    box-shadow: none;
    background: none;
    padding: 0px;
  }
`;

export const DashImagem = styled.img`
  max-width: 700px;
  height: 450px;
  border-radius: 20px;
  ${responsive(breakpoints.desktop)} {
    display: none;
  }
`;

export const BoxDash = styled.section`
  height: 450px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  padding: 20px;
  ${responsive(breakpoints.tablet)} {
    height: 100%;
  }
`;

export const BoxDivDash = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 5px;
  width: 100%;
  ${responsive(breakpoints.tablet)} {
    grid-template-columns: 1fr;
  }
`;

export const ButtonDash = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${cores.cor_principal};
  padding: 10px 15px;
  border-radius: 10px;
  color: ${cores.texto_base};
  text-decoration: none;
  font-size: 24px;
  transition: 0.8s ease-in-out;
  border: 1px solid ${cores.cor_secundaria};
  &:hover {
    background: transparent;
    border: 1px solid ${cores.cor_principal};
    color: ${cores.cor_principal};
  }
  &.ativo {
    background: transparent;
    color: ${cores.cor_principal};
  }
  ${responsive(breakpoints.mobile)} {
    font-size: 18px;
  }
`;

export const DashLogo = styled.img`
  width: 100px;
  color: #141414;
`;
export const DashLogoHidden = styled.img`
  width: 150px;
  margin-top: 50px;
`;
