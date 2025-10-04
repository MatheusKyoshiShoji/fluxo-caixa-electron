import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

interface Transaction {
  id: number;
  data: string;
  descricao: string;
  tipo: "entrada" | "saida";
  valor: number;
  status: string;
}

interface TransactionsChartProps {
  transacoes: Transaction[];
}

function getCurrentMonthTransactions(transacoes: Transaction[]) {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  return transacoes.filter(t => {
    const [year, month] = t.data.split("-").map(Number);
    return year === currentYear && month === currentMonth;
  });
}

function getChartData(transacoes: Transaction[]) {
  // Group by day, sum entradas and saídas
  const days: { [key: string]: number } = {};
  transacoes.forEach(t => {
    if (!days[t.data]) days[t.data] = 0;
    days[t.data] += t.tipo === "entrada" ? t.valor : -t.valor;
  });
  // Build cumulative sum for each day
  const sortedDays = Object.keys(days).sort();
  let cumulative = 0;
  return sortedDays.map(date => {
    cumulative += days[date];
    return { date, saldo: cumulative };
  });
}

const TransactionsChart: React.FC<TransactionsChartProps> = ({ transacoes }) => {
  const monthTransacoes = getCurrentMonthTransactions(transacoes);
  const data = getChartData(monthTransacoes);

  // Determine color: green if saldo final >= 0, else red
  const finalSaldo = data.length ? data[data.length - 1].saldo : 0;
  const lineColor = finalSaldo >= 0 ? "#22c55e" : "#ef4444"; // Tailwind green/red

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
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