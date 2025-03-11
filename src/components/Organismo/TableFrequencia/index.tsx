// src/components/Molecules/FrequenciaTable.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Frequencia } from '../../../utils/type';
import {
  ActionContainer,
  DeleteButton,
  EditButton,
  StyledTable,
  TableWrapper,
  Td,
  Th,
} from './style';

// Função para formatar a data no padrão dd/mm
const formatDate = (dateStr: string): string => {
  // Supondo que a data esteja no formato "YYYY-MM-DD"
  const dateParts = dateStr.split('-');
  if (dateParts.length < 3) return dateStr;
  return `${dateParts[2]}/${dateParts[1]}`;
};

interface FrequenciaTableProps {
  frequencias: Frequencia[];
  onDelete: (id: string) => void;
}

export const FrequenciaTable: React.FC<FrequenciaTableProps> = ({
  frequencias,
  onDelete,
}) => {
  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            <Th>Data</Th>
            <Th>Dia da Semana</Th>
            <Th>Turma</Th>
            <Th>Módulo</Th>
            <Th>Início</Th>
            <Th>Fim</Th>
            <Th>Assinatura</Th>
            <Th>Ações</Th>
          </tr>
        </thead>
        <tbody>
          {frequencias.map((freq) => (
            <tr key={freq.id}>
              <Td>{formatDate(freq.data)}</Td>
              <Td>{freq.dia_da_semana}</Td>
              <Td>{freq.turma_details ? freq.turma_details.nome : 'N/A'}</Td>
              <Td>
                {freq.turma_details ? freq.turma_details.modulo_atual : 'N/A'}
              </Td>

              <Td>{freq.horario_inicio}</Td>
              <Td>{freq.horario_fim}</Td>
              <Td>
                {freq.assinatura ? (
                  <img
                    src={freq.assinatura}
                    alt="Assinatura"
                    style={{
                      width: '50px',
                      height: 'auto',
                      borderRadius: '4px',
                    }}
                  />
                ) : (
                  'Sem assinatura'
                )}
              </Td>
              <Td>
                <ActionContainer>
                  <Link to={`/frequencias/form/${freq.id}`}>
                    <EditButton>Editar</EditButton>
                  </Link>
                  <DeleteButton onClick={() => freq.id && onDelete(freq.id!)}>
                    Excluir
                  </DeleteButton>
                </ActionContainer>
              </Td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};
