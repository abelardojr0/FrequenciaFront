import React, { useState } from 'react';
import { SignaturePadComponent } from '../Assinatura'; // o caminho para o componente
export const FormularioComAssinatura = () => {
  const [assinatura, setAssinatura] = useState<string>('');

  const handleSaveSignature = (data: string) => {
    setAssinatura(data);
    // Você pode, por exemplo, definir esse valor em seu formulário ou enviá-lo para o backend
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Assinatura salva:', assinatura);
    // Aqui você envia o valor da assinatura junto com os demais dados do formulário para o backend
  };

  return (
    <form onSubmit={handleSubmit}>
      <SignaturePadComponent
        onSave={handleSaveSignature}
        initialSignature={assinatura}
      />
    </form>
  );
};
