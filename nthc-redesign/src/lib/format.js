export function formatDate(isoDate) {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatMoney(amount) {
  return amount.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
