//Arquivo de funções utilizadas pelo sistema
export function formatDate(date: Date | string | null): string {
  if (!date) return '';

  let dateObj: Date;

  // Verifica se a data já está no formato AAAA-MM-DD
  if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    dateObj = new Date(date); 
  } else if (typeof date === 'string') {
    // Assume o formato DD/MM/YYYY se for uma string e não estiver no formato AAAA-MM-DD
    const [day, month, year] = date.split('/');
    dateObj = new Date(Number(year), Number(month) - 1, Number(day));
  } else {
    dateObj = new Date(date);
  }

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
