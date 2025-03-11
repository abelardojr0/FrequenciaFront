import styled from 'styled-components';
import responsive, { breakpoints } from '../../../utils/responsive';

export const FormTurmaStyled = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 20px;
  max-width: 60vw;
  ${responsive(breakpoints.tablet)} {
    grid-template-columns: 1fr;
  }
`;
