import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { formatCurrencyBRL, formatDateBR } from "../utils/formatValues";
import { Transaction } from "src/types/transaction";

interface TransactionsChartProps {
  transacoes: Transaction[];
  selectedYear: number;
  selectedMonth: number; // 1-12
}

function getMonthTransactions(transacoes: Transaction[], year: number, month: number) {
  return transacoes.filter(t => {
    const [tYear, tMonth] = t.data.split("-").map(Number);
    return tYear === year && tMonth === month;
  });
}

function getChartData(transacoes: Transaction[]) {
  const days: { [key: string]: number } = {};
  transacoes.forEach(t => {
    if (!days[t.data]) days[t.data] = 0;
    days[t.data] += t.tipo === "entrada" ? t.valor : -t.valor;
  });
  const sortedDays = Object.keys(days).sort();
  let cumulative = 0;
  return sortedDays.map(date => {
    cumulative += days[date];
    return { date, saldo: cumulative };
  });
}

const TransactionsChart: React.FC<TransactionsChartProps> = ({ transacoes, selectedYear, selectedMonth }) => {
  const monthTransacoes = getMonthTransactions(transacoes, selectedYear, selectedMonth);
  const data = getChartData(monthTransacoes);

  const finalSaldo = data.length ? data[data.length - 1].saldo : 0;
  const lineColor = finalSaldo >= 0 ? "#22c55e" : "#ef4444";

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="date" tickFormatter={formatDateBR}/>
        <YAxis tickFormatter={formatCurrencyBRL} />
        <Tooltip formatter={(value: number) => formatCurrencyBRL(value)} labelFormatter={formatDateBR} />
        <Line
          type="monotone"
          dataKey="saldo"
          stroke={lineColor}
          strokeWidth={3}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TransactionsChart;