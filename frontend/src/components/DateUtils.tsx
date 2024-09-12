//Arquivo de funções utilizadas pelo sistema
export function formatDate(date: Date | string | null): string {
  if (!date) return '';

  // Verifica se a data já está no formato AAAA-MM-DD
  if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }

  let dateObj = new Date(date);

  // Ajusta para o fuso horário local
  dateObj.setTime(
    dateObj.getTime() + dateObj.getTimezoneOffset() * 60 * 1000
  );

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
