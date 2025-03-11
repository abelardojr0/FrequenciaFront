import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { cores } from '../utils/theme';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
`;

export const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.027);
  backdrop-filter: blur(5px);
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  padding: 20px;
  transition: 0.4s ease-in-out;
  & svg {
    color: ${cores.cor_principal};
    font-size: 35px;
    transition: 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
      color: ${cores.cor_principal};
    }
  }
`;

export const HeaderLogoStyled = styled(Link)`
  align-self: center;
  img {
    max-width: 220px;
  }
`;

export const HeaderList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

export const HeaderListItemText = styled(Link)`
  color: ${cores.texto_base};
  text-decoration: none;
  font-size: 24px;
  transition: 0.3s ease-in-out;
  display: flex;
  align-items: center;
  gap: 10px;
  svg {
    color: ${cores.texto_base};
  }
  &:hover {
    color: ${cores.cor_secundaria};
    & svg {
      color: ${cores.cor_secundaria};
    }
  }
  &.ativo {
    color: ${cores.cor_principal};
    & svg {
      color: ${cores.cor_principal};
    }
  }
`;

export const ContainerSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 40px;
`;

export const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  cursor: pointer;
`;

export const ProfileIcon = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid ${cores.cor_principal};
  color: ${cores.cor_principal};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 18px;
  font-weight: bold;
  transition: 0.5s ease-in-out;
  &:hover {
    transform: scale(1.04);
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 45px;
  right: 0;
  background-color: white;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  min-width: 150px;
  border-radius: 8px;
  padding: 10px 0;
  z-index: 1000;
`;

export const DropdownItem = styled.div`
  padding: 10px 20px;
  color: #333;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const UserNameDisplay = styled.div`
  padding: 10px 20px;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  background-color: #f1f1f1;
  text-align: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  cursor: default;
`;
