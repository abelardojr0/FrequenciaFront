import styled from 'styled-components';
import { cores } from '../../../utils/theme';
import responsive, { breakpoints } from '../../../utils/responsive';

export const ButtonAtomStyled = styled.button`
  border: none;
  border-radius: 8px;
  background-color: ${cores.cor_principal};
  color: ${cores.texto_base};
  padding: 15px 30px;
  font-size: 26px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);

  &:hover {
    transform: scale(1.03);
  }

  &:disabled {
    background-color: ${cores.desativado};
    color: rgba(255, 255, 255, 0.5);
    cursor: not-allowed;
    box-shadow: none;
    transform: scale(1);
  }

  ${responsive(breakpoints.mobile)} {
    font-size: 18px;
  }
`;
