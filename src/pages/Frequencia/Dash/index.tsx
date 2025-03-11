// Frequencias.tsx
import { useContext, useEffect, useRef, useState, ChangeEvent } from 'react';
import { SpinnerAtom } from '../../../components/Atoms/SpinnerAtom';
import { BoxInputMolecule } from '../../../components/Molecules/BoxInputMolecule';
import { useFrequencias } from '../../../hooks/useFrequencias';
import { SubtitleAdd } from '../../../components/Molecules/SubtitleAdd';
import { FrequenciaTable } from '../../../components/Organismo/TableFrequencia';
import { AuthContext } from '../../../contexts/AuthProvider';
import { ModalRelatorio } from '../../../components/Organismo/ModalRelatorio';
import { CSVLink } from 'react-csv';
import { generateCSVDataFunction, headers } from '../../../utils/generateCSV';
import { calcularHoras, formatDecimalToTime } from '../../../utils/time';
import { ButtonRelatorio, FilterDiv } from './style';
import { SelectMolecule } from '../../../components/Molecules/SelectMolecule';

// Helper para formatar data para input (YYYY-MM-DD)
const formatDateForInput = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper para calcular o período de 21 do mês anterior até 20 do mês selecionado
const computePeriod = (year: number, month: number) => {
  let startDate: Date, endDate: Date;
  if (month === 1) {
    startDate = new Date(year - 1, 11, 21);
    endDate = new Date(year, 0, 20);
  } else {
    startDate = new Date(year, month - 2, 21);
    endDate = new Date(year, month - 1, 20);
  }
  return { startDate, endDate };
};

export const Frequencias = () => {
  const { frequencias, getFrequencias, loading, deleteFrequencia } =
    useFrequencias();
  const [busca, setBusca] = useState('');
  const [onSearch, setOnSearch] = useState(false);
  const auth = useContext(AuthContext);

  const [reportData, setReportData] = useState<{
    formattedWK: string;
    formattedSM: string;
    formattedOther: string;
    valorHoras: number;
    valorWK: number;
    valorSM: number;
    total: number;
    formattedTotalHoras: string;
  } | null>(null);
  const [showModalRelatorio, setShowModalRelatorio] = useState(false);
  const csvLinkRef = useRef<any>(null);

  // Estados para filtros adicionais
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [customRange, setCustomRange] = useState<boolean>(false);
  const [customStartDate, setCustomStartDate] = useState<string>(() => {
    const now = new Date();
    now.setMonth(now.getMonth() - 1);
    return formatDateForInput(now);
  });
  const [customEndDate, setCustomEndDate] = useState<string>(() =>
    formatDateForInput(new Date()),
  );

  useEffect(() => {
    getFrequencias();
  }, []);

  useEffect(() => {
    if (customRange) {
      getFrequencias({ startDate: customStartDate, endDate: customEndDate });
    } else if (selectedYear && selectedMonth) {
      getFrequencias({ year: selectedYear, month: selectedMonth });
    } else if (selectedYear) {
      getFrequencias({ year: selectedYear });
    } else {
      getFrequencias();
    }
  }, [
    selectedYear,
    selectedMonth,
    customRange,
    customStartDate,
    customEndDate,
    getFrequencias,
  ]);

  // Filtro combinando busca textual e filtros de data
  const filteredFrequencias = frequencias?.filter((freq) => {
    const buscaMatch =
      freq.turma_details.nome.toLowerCase().includes(busca.toLowerCase()) ||
      freq.data.toLowerCase().includes(busca.toLowerCase());

    const freqDate = new Date(freq.data);
    let dateMatch = true;

    if (customRange) {
      const start = new Date(customStartDate);
      const end = new Date(customEndDate);
      dateMatch = freqDate >= start && freqDate <= end;
    } else if (selectedYear && selectedMonth) {
      const { startDate, endDate } = computePeriod(
        Number(selectedYear),
        Number(selectedMonth),
      );
      dateMatch = freqDate >= startDate && freqDate <= endDate;
    }

    return buscaMatch && dateMatch;
  });

  const handleReport = () => {
    let totalWK = 0;
    let totalSM = 0;
    let totalOther = 0;

    filteredFrequencias?.forEach((freq) => {
      if (freq.horario_inicio && freq.horario_fim) {
        const horas = calcularHoras(freq.horario_inicio, freq.horario_fim);
        if (freq.turma_details.tipo === 'WK') {
          totalWK += horas;
        } else if (
          freq.turma_details.tipo === 'SM_PROG' ||
          freq.turma_details.tipo === 'SM_CR'
        ) {
          totalSM += horas;
        } else {
          totalOther += horas;
        }
      }
    });

    const formattedWK = formatDecimalToTime(totalWK);
    const formattedSM = formatDecimalToTime(totalSM);
    const formattedOther = formatDecimalToTime(totalOther);
    const totalHoras = totalWK + totalSM + totalOther;

    if (auth?.user?.valor_hora_aula) {
      const valorHoras = totalOther * Number(auth.user.valor_hora_aula);
      const valorWK = totalWK * 35;
      const valorSM = totalSM * 40;
      const total = valorHoras + valorWK + valorSM;

      setReportData({
        formattedWK,
        formattedSM,
        formattedOther,
        valorHoras,
        valorWK,
        valorSM,
        total,
        formattedTotalHoras: formatDecimalToTime(totalHoras),
      });
      setShowModalRelatorio(true);
    }
  };

  const generateCSVData = generateCSVDataFunction(
    filteredFrequencias,
    reportData,
  );
  const handleGenerateSheet = () => {
    if (csvLinkRef.current) {
      csvLinkRef.current.link.click();
    }
  };

  // Handlers para os filtros usando os componentes SelectMolecule
  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  const handleCustomRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomRange(e.target.checked);
  };

  const handleCustomStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomStartDate(e.target.value);
  };

  const handleCustomEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomEndDate(e.target.value);
  };

  return (
    <>
      {loading ? (
        <SpinnerAtom />
      ) : (
        <>
          <SubtitleAdd
            to="/frequencias/form"
            text="Lista de Frequências"
            setSearch={setOnSearch}
          />

          {onSearch && (
            <>
              <BoxInputMolecule
                htmlFor="busca"
                id="busca"
                type="text"
                children=""
                placeholder="Buscar por Turma ou Data"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />

              <FilterDiv style={{ marginBottom: '20px' }}>
                <SelectMolecule
                  htmlFor="year"
                  id="year"
                  value={selectedYear}
                  onChange={handleYearChange}
                  options={[
                    { value: '', text: 'Selecione o Ano' },
                    { value: '2023', text: '2023' },
                    { value: '2024', text: '2024' },
                    { value: '2025', text: '2025' },
                  ]}
                >
                  Ano:
                </SelectMolecule>

                <SelectMolecule
                  htmlFor="month"
                  id="month"
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  options={[
                    { value: '', text: 'Selecione o Mês' },
                    { value: '1', text: 'Janeiro' },
                    { value: '2', text: 'Fevereiro' },
                    { value: '3', text: 'Março' },
                    { value: '4', text: 'Abril' },
                    { value: '5', text: 'Maio' },
                    { value: '6', text: 'Junho' },
                    { value: '7', text: 'Julho' },
                    { value: '8', text: 'Agosto' },
                    { value: '9', text: 'Setembro' },
                    { value: '10', text: 'Outubro' },
                    { value: '11', text: 'Novembro' },
                    { value: '12', text: 'Dezembro' },
                  ]}
                >
                  Mês:
                </SelectMolecule>

                <label style={{ marginLeft: '20px' }}>
                  <input
                    type="checkbox"
                    checked={customRange}
                    onChange={handleCustomRangeChange}
                  />
                  <span style={{ marginLeft: '5px', color: 'white' }}>
                    Usar período personalizado
                  </span>
                </label>

                {customRange && (
                  <>
                    <BoxInputMolecule
                      required
                      type="date"
                      htmlFor="customStartDate"
                      id="customStartDate"
                      children="Início:"
                      value={customStartDate}
                      onChange={handleCustomStartDateChange}
                    />
                    <BoxInputMolecule
                      required
                      type="date"
                      htmlFor="customEndDate"
                      id="customEndDate"
                      children="Fim:"
                      value={customEndDate}
                      onChange={handleCustomEndDateChange}
                    />
                  </>
                )}
              </FilterDiv>
            </>
          )}

          <FrequenciaTable
            frequencias={filteredFrequencias || []}
            onDelete={deleteFrequencia}
          />

          <ButtonRelatorio type="button" onClick={handleReport}>
            Gerar Relatório
          </ButtonRelatorio>

          {showModalRelatorio && reportData && (
            <ModalRelatorio
              data={reportData}
              filteredFrequencias={filteredFrequencias || []}
              onClose={() => setShowModalRelatorio(false)}
              onGenerateSheet={handleGenerateSheet}
            />
          )}

          <CSVLink
            data={generateCSVData || []}
            headers={headers}
            filename="frequencias.csv"
            ref={csvLinkRef}
            target="_blank"
            style={{ display: 'none' }}
            separator=";"
            enclosingCharacter={'"'}
            uFEFF={true}
          />
        </>
      )}
    </>
  );
};

export default Frequencias;
