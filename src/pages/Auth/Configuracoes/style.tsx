import styled from 'styled-components';

export const FormStyled = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  max-width: 350px;
  margin-top: 20px;
`;

export const DivHospitaisEdit = styled.div`
  display: flex;
  gap: 100px;
`;

export const DivHospitaisMaquinasEdit = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

export const DivHospitaisMaquinasGridEdit = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;
