import React from 'react';
import { Link } from 'react-router-dom';
import { Turma } from '../../../utils/type';
import {
  TableWrapper,
  StyledTable,
  Th,
  Td,
  ActionContainer,
  EditButton,
  DeleteButton,
} from './style';

interface TurmaTableProps {
  turmas: Turma[];
  onDelete: (id: string | undefined) => void;
}

export const TurmaTable: React.FC<TurmaTableProps> = ({ turmas, onDelete }) => {
  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            <Th>Nome</Th>
            <Th>Horário Início</Th>
            <Th>Horário Fim</Th>
            <Th>Total de Alunos</Th>
            <Th>Média de Frequência</Th>
            <Th>Módulo Atual</Th>
            <Th>Tipo</Th>
            <Th>Ações</Th>
          </tr>
        </thead>
        <tbody>
          {turmas.map((turma) => (
            <tr key={turma.id}>
              <Td>{turma.nome}</Td>
              <Td>{turma.horario_inicio}</Td>
              <Td>{turma.horario_fim}</Td>
              <Td>{turma.total_alunos}</Td>
              <Td>{turma.media_frequencia}</Td>
              <Td>{turma.modulo_atual}</Td>
              <Td>{turma.tipo}</Td>
              <Td>
                <ActionContainer>
                  <Link to={`/turmas/form/${turma.id}`}>
                    <EditButton>Editar</EditButton>
                  </Link>
                  <DeleteButton onClick={() => onDelete(turma?.id)}>
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
