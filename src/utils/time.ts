export const calcularHoras = (inicio: string, fim: string): number => {
  const start = new Date(`1970-01-01T${inicio}Z`);
  const end = new Date(`1970-01-01T${fim}Z`);
  const diffMs = end.getTime() - start.getTime();
  return diffMs / (1000 * 60 * 60);
};

export const formatDecimalToTime = (decimal: number): string => {
  const hours = Math.floor(decimal);
  const minutes = Math.round((decimal - hours) * 60);
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
};
