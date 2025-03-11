import styled from 'styled-components';
import { cores } from '../../../utils/theme';

export const ButtonAtomStyled = styled.button`
  border: 1px solid black;
  border-radius: 8px;
  background-color: transparent;
  color: ${cores.preto};
  padding: 15px 30px;
  font-size: 26px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
  &:hover {
    transform: scale(1.03);
  }
`;
