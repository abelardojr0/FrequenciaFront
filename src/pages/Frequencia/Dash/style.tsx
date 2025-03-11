// Exemplo: em src/utils/globalStyles.ts (ou em um arquivo separado de estilos)
import styled from 'styled-components';
import { ButtonAtom } from '../../../components/Atoms/ButtonAtom';

export const ContainerGridFrequencia = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px;
`;

export const ButtonRelatorio = styled(ButtonAtom)`
  align-self: flex-end;
`;

export const FilterDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
