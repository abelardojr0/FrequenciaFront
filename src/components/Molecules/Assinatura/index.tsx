import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import styled from 'styled-components';

const CanvasWrapper = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 12px;
  background-color: #9d1a1a;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

interface SignaturePadProps {
  onSave: (signature: string) => void;
  initialSignature?: string;
}

export const SignaturePadComponent: React.FC<SignaturePadProps> = ({
  onSave,
  initialSignature,
}) => {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [dataURL, setDataURL] = useState<string>(initialSignature || '');

  // Atualiza o estado se a prop initialSignature mudar
  useEffect(() => {
    setDataURL(initialSignature || '');
  }, [initialSignature]);

  const clearSignature = () => {
    sigCanvas.current?.clear();
    setDataURL('');
    onSave('');
  };

  const saveSignature = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      const canvas = sigCanvas.current.getCanvas();
      const url = canvas.toDataURL('image/png');
      setDataURL(url);
      onSave(url);
    }
  };

  return (
    <div>
      <CanvasWrapper>
        {dataURL ? (
          <img
            src={dataURL}
            alt="Assinatura"
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <SignatureCanvas
            ref={sigCanvas}
            penColor="#9d1a1a"
            canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
          />
        )}
      </CanvasWrapper>
      <ButtonContainer>
        <Button type="button" onClick={clearSignature}>
          Limpar
        </Button>
        <Button type="button" onClick={saveSignature}>
          Salvar Assinatura
        </Button>
      </ButtonContainer>
    </div>
  );
};
