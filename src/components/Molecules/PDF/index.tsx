// MyPdfButton.tsx
import React, { useContext } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { AuthContext } from '../../../contexts/AuthProvider';
import { ButtonAtom } from '../../Atoms/ButtonAtom';
import PDFDocument from './pdfDocument';

interface MyPdfButtonProps {
  filteredFrequencias: any[];
  totals: any;
}

const MyPdfButton: React.FC<MyPdfButtonProps> = ({
  filteredFrequencias,
  totals,
}) => {
  const auth = useContext(AuthContext);

  return (
    <PDFDownloadLink
      document={
        <PDFDocument
          filteredFrequencias={filteredFrequencias}
          totals={totals}
          professor={auth?.user?.nome || 'N/D'}
        />
      }
      fileName="frequencias.pdf"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      {({ loading }) =>
        loading ? (
          'Gerando PDF...'
        ) : (
          <ButtonAtom type="button">Gerar PDF</ButtonAtom>
        )
      }
    </PDFDownloadLink>
  );
};

export default MyPdfButton;
