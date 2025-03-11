import styled from 'styled-components';
import { cores } from '../../../utils/theme';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  max-width: 35vw;
  width: 100%;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  h2 {
    color: ${cores.cor_principal};
    font-weight: bold;
    font-size: 24px;
  }
  button {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: ${cores.cor_principal};
    transition: 0.3s ease-in-out;
  }
  button:hover {
    transform: scale(1.2);
  }
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 18px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }

  p:nth-child(odd) {
    background: #f0f0f0;
  }

  p:nth-child(even) {
    background: transparent;
  }

  span {
    color: ${cores.cor_principal};
  }
`;

export const ModalFooter = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;
