import styled from 'styled-components';
import { cores } from '../../../utils/theme';

export const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;
export const SelectAtomStyled = styled.select<{ error?: boolean }>`
  border: 2px solid ${(props) => (props.error ? 'red' : cores.texto_base)};
  background-color: transparent;
  padding: 10px;
  border-radius: 8px;
  outline: none;
  font-size: 22px;
  color: ${cores.texto_base};
  &:focus {
    border-color: ${(props) => (props.error ? 'red' : cores.cor_principal)};
  }
  option {
    background-color: ${cores.fundo_base};
    color: white;
  }
`;

export const SelectMoleculeStyled = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  color: ${cores.texto_base};
  min-width: 250px;
`;

export const LabelAtomStyled = styled.label`
  font-size: 18px;
  font-weight: 800;
`;
