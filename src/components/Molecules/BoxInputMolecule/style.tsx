import styled from 'styled-components';
import { cores } from '../../../utils/theme';
import responsive, { breakpoints } from '../../../utils/responsive';

export const BoxInputMoleculeStyled = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  color: ${cores.texto_base};
  min-width: 250px;
`;

export const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;

export const InputAtomStyled = styled.input<{ error?: boolean }>`
  border: 2px solid
    ${(props) =>
      props.error ? 'red' : props.disabled ? 'grey' : cores.texto_base};
  background-color: transparent;
  padding: 10px;
  border-radius: 8px;
  outline: none;
  font-size: 22px;
  color: ${(props: any) => (props.disabled ? 'grey' : cores.texto_base)};
  &:focus {
    border-color: ${(props) => (props.error ? 'red' : cores.cor_secundaria)};
  }
  ${responsive(breakpoints.mobile)} {
    font-size: 16px;
  }
`;

export const LabelAtomStyled = styled.label`
  font-size: 18px;
  font-weight: 800;
  ${responsive(breakpoints.mobile)} {
    font-size: 16px;
  }
`;
