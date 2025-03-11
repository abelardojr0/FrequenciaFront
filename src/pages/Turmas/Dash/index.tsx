import { useEffect, useState } from 'react';
import { SpinnerAtom } from '../../../components/Atoms/SpinnerAtom';
import { BoxInputMolecule } from '../../../components/Molecules/BoxInputMolecule';
import { useTurmas } from '../../../hooks/useTurmas';
import { SubtitleAdd } from '../../../components/Molecules/SubtitleAdd';
import { TurmaTable } from '../../../components/Organismo/TableTurma';

export const Turmas = () => {
  const { turmas, getTurmas, loading, deleteTurma } = useTurmas();
  const [busca, setBusca] = useState('');
  const [onSearch, setOnSearch] = useState(false);

  useEffect(() => {
    getTurmas();
  }, []);

  const filteredTurmas = turmas?.filter((turma) => {
    if (!busca) return true;
    return (
      turma.nome.toLowerCase().includes(busca.toLowerCase()) ||
      turma.modulo_atual.toLowerCase().includes(busca.toLowerCase())
    );
  });

  return (
    <>
      {loading ? (
        <SpinnerAtom />
      ) : (
        <>
          <SubtitleAdd
            to="/turmas/form"
            text="Lista de Turmas"
            setSearch={setOnSearch}
          />
          {onSearch && (
            <BoxInputMolecule
              htmlFor="busca"
              id="busca"
              type="text"
              children=""
              placeholder="Buscar por Nome ou Módulo"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          )}
          <TurmaTable turmas={filteredTurmas || []} onDelete={deleteTurma} />
        </>
      )}
    </>
  );
};
