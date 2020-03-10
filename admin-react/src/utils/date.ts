export function dateFormat(date: string) {
  const D = new Date(date);
  const y = D.getFullYear();
  const m = `${D.getMonth() + 1}`.padStart(2, '0');
  const d = `${D.getDate()}`.padStart(2, '0');
  const H = `${D.getHours()}`.padStart(2, '0');
  const M = `${D.getMinutes()}`.padStart(2, '0');
  const S = `${D.getSeconds()}`.padStart(2, '0');
  return `${y}-${m}-${d} ${H}:${M}:${S}`;
}
