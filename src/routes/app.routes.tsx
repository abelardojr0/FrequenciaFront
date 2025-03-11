import { Route, Routes } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { Layout } from '../layout';
import { NotFound } from '../pages/NotFound';
import { Frequencias } from '../pages/Frequencia/Dash';
import { Turmas } from '../pages/Turmas/Dash';
import { FrequenciaForm } from '../pages/Frequencia/Form';
import { TurmaForm } from '../pages/Turmas/Form';
import { ConfiguracoesUsers } from '../pages/Auth/Configuracoes';

export const AppRoutesAdmin = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/frequencias" element={<Frequencias />} />
        <Route path="/frequencias/form/:id?" element={<FrequenciaForm />} />
        <Route path="/turmas" element={<Turmas />} />
        <Route path="/turmas/form/:id?" element={<TurmaForm />} />
        <Route path="/config/:id?" element={<ConfiguracoesUsers />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
