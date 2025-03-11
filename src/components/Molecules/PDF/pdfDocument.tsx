import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

// Estilos para o PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
  },
  header: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subheader: {
    fontSize: 12,
    marginBottom: 10,
  },
  // Estilos da "tabela" de frequências
  table: {
    flexDirection: 'column',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#eeeeee',
    padding: 4,
    fontWeight: 'bold',
  },
  tableCol: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4,
  },
  // Larguras ajustadas para as colunas da tabela de frequências
  colData: { width: '16%' },
  colDia: { width: '16%' },
  colTurma: { width: '28%' },
  colInicio: { width: '15%' },
  colFim: { width: '15%' },
  colAssinatura: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Estilos da tabela de Totais
  totalsTable: {
    flexDirection: 'column',
    marginTop: 20,
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  totalsRow: {
    flexDirection: 'row',
  },
  totalsColHeader: {
    width: '33%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#eeeeee',
    padding: 4,
    fontWeight: 'bold',
  },
  totalsCol: {
    width: '33%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4,
  },
});

// Função para formatar a data no formato "dd/mm"
const formatDate = (dateStr: string): string => {
  const parts = dateStr.split('-');
  if (parts.length < 3) return dateStr;
  return `${parts[2]}/${parts[1]}`;
};

interface PDFDocumentProps {
  filteredFrequencias: any[];
  totals: {
    formattedWK: string;
    formattedSM: string;
    formattedOther: string;
    valorWK: number;
    valorSM: number;
    valorHoras: number;
    total: number;
    formattedTotalHoras: string; // Total em horas (formatação "HH:mm")
  };
  professor: string;
}

const PDFDocument: React.FC<PDFDocumentProps> = ({
  filteredFrequencias,
  totals,
  professor,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Cabeçalho com o nome do professor */}
      <Text style={styles.header}>Professor: {professor}</Text>
      <Text style={styles.subheader}>Relatório de Frequências</Text>

      {/* Tabela de Frequências */}
      <View style={styles.table}>
        {/* Cabeçalho */}
        <View style={styles.tableRow}>
          <Text style={[styles.tableColHeader, styles.colData]}>Data</Text>
          <Text style={[styles.tableColHeader, styles.colDia]}>
            Dia da Semana
          </Text>
          <Text style={[styles.tableColHeader, styles.colTurma]}>
            Nome da Turma
          </Text>
          <Text style={[styles.tableColHeader, styles.colInicio]}>Início</Text>
          <Text style={[styles.tableColHeader, styles.colFim]}>Fim</Text>
          <Text style={[styles.tableColHeader, styles.colAssinatura]}>
            Assinatura
          </Text>
        </View>
        {filteredFrequencias.map((freq, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={[styles.tableCol, styles.colData]}>
              {formatDate(freq.data)}
            </Text>
            <Text style={[styles.tableCol, styles.colDia]}>
              {freq.dia_da_semana}
            </Text>
            <Text style={[styles.tableCol, styles.colTurma]}>
              {freq.turma_details?.nome || ''}
            </Text>
            <Text style={[styles.tableCol, styles.colInicio]}>
              {freq.horario_inicio}
            </Text>
            <Text style={[styles.tableCol, styles.colFim]}>
              {freq.horario_fim}
            </Text>
            <View style={[styles.tableCol, styles.colAssinatura]}>
              {freq.assinatura ? (
                <Image
                  src={freq.assinatura}
                  style={{ width: 40, height: 40 }}
                />
              ) : (
                <Text>—</Text>
              )}
            </View>
          </View>
        ))}
      </View>

      {/* Tabela de Totais */}
      <View style={styles.totalsTable}>
        <View style={styles.totalsRow}>
          <Text style={styles.totalsColHeader}>Tipo</Text>
          <Text style={styles.totalsColHeader}>Horas</Text>
          <Text style={styles.totalsColHeader}>Valor (R$)</Text>
        </View>
        <View style={styles.totalsRow}>
          <Text style={styles.totalsCol}>Aula Compartilhada</Text>
          <Text style={styles.totalsCol}>{totals.formattedWK}</Text>
          <Text style={styles.totalsCol}>{totals.valorWK.toFixed(2)}</Text>
        </View>
        <View style={styles.totalsRow}>
          <Text style={styles.totalsCol}>Super Módulo</Text>
          <Text style={styles.totalsCol}>{totals.formattedSM}</Text>
          <Text style={styles.totalsCol}>{totals.valorSM.toFixed(2)}</Text>
        </View>
        <View style={styles.totalsRow}>
          <Text style={styles.totalsCol}>Hora/Aula</Text>
          <Text style={styles.totalsCol}>{totals.formattedOther}</Text>
          <Text style={styles.totalsCol}>{totals.valorHoras.toFixed(2)}</Text>
        </View>
        {/* Linha com o Total em Valor */}
        <View style={styles.totalsRow}>
          <Text style={styles.totalsCol}>Total</Text>
          <Text style={styles.totalsCol}>{totals.formattedTotalHoras}</Text>
          <Text style={styles.totalsCol}>{totals.total.toFixed(2)}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
