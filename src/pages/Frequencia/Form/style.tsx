import styled from 'styled-components';
import responsive, { breakpoints } from '../../../utils/responsive';

export const FormFrequenciaStyled = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 20px;
  ${responsive(breakpoints.tablet)} {
    grid-template-columns: 1fr;
  }
`;
