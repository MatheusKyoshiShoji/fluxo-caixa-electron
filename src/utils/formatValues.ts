export function formatCurrencyBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

export function formatDateBR(value: string): string {
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}