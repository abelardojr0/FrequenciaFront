// ModalRelatorio.tsx
import React from 'react';
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalWrapper,
} from './style';
import { ButtonAtom } from '../../Atoms/ButtonAtom';
import MyPdfButton from '../../Molecules/PDF';

interface ModalRelatorioProps {
  data: {
    formattedWK: string;
    formattedSM: string;
    formattedOther: string;
    valorHoras: number;
    valorWK: number;
    valorSM: number;
    total: number;
  };
  filteredFrequencias: any[]; // dados para o PDF
  onClose: () => void;
  onGenerateSheet: () => void;
}

export const ModalRelatorio: React.FC<ModalRelatorioProps> = ({
  data,
  filteredFrequencias,
  onClose,
  onGenerateSheet,
}) => {
  const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <ModalWrapper onClick={handleWrapperClick}>
      <ModalContent>
        <ModalHeader>
          <h2>Relatório de Frequências</h2>
          <button onClick={onClose} type="button">
            &times;
          </button>
        </ModalHeader>
        <ModalBody>
          <p>
            <span>Hora/Aula:</span> {data.formattedOther} hr
          </p>
          <p>
            <span>Workshop:</span> {data.formattedWK} hr
          </p>
          <p>
            <span>Super Módulo:</span> {data.formattedSM} hr
          </p>
          <p>
            <span>Valor Final em Hora/Aula:</span> R${' '}
            {data.valorHoras.toFixed(2)}
          </p>
          <p>
            <span>Valor Final em Aula Compartilhada:</span> R${' '}
            {data.valorWK.toFixed(2)}
          </p>
          <p>
            <span>Valor Final em Super Módulo:</span> R${' '}
            {data.valorSM.toFixed(2)}
          </p>
          <p>
            <span>Valor Total Final:</span> R$ {data.total.toFixed(2)}
          </p>
        </ModalBody>
        <ModalFooter>
          <ButtonAtom type="button" onClick={onGenerateSheet}>
            Gerar Planilha
          </ButtonAtom>
          {/* Renderiza o botão que gera o PDF passando os dados */}
          <MyPdfButton
            filteredFrequencias={filteredFrequencias}
            totals={data}
          />
        </ModalFooter>
      </ModalContent>
    </ModalWrapper>
  );
};
