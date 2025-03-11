import styled from 'styled-components';
import { cores } from '../../../utils/theme';
import responsivo, { breakpoints } from '../../../utils/responsive';

export const StyledSubtitleAdd = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  & svg {
    font-size: 50px;
    cursor: pointer;
    background-color: ${cores.cor_principal};
    color: white;
    border-radius: 50%;
    padding: 5px;
    ${responsivo(breakpoints.tablet)} {
      font-size: 30px;
    }
  }
`;

export const SubtitleIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export const Linhazinha = styled.hr`
  border: none;
  height: 2px;
  background-color: ${cores.cor_principal};
  width: 100%;
  margin: 8px 0;
`;
