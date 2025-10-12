import React from "react";
import { Transaction } from "src/types/transaction";
import { formatCurrencyBRL } from "../utils/formatValues.js";

interface CurrentRevenueProps {
  transactions: Transaction[];
}

function calculateCurrentRevenue(transactions: Transaction[]) {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  let receitas = 0;
  let despesas = 0;
  transactions.forEach((t) => {
    const [year, month] = t.data.split("-").map(Number);
    if (year === currentYear && month === currentMonth) {
      if (t.tipo === "entrada") {
        receitas += t.valor;
      } else {
        despesas += t.valor;
      }
    }
  });
  return { receitas, despesas };
}

function calculateBalance(transactions: Transaction[]) {
  let balance = 0;
  transactions.forEach((t) => {
    if (t.tipo === "entrada") {
      balance += t.valor;
    } else {
      balance -= t.valor;
    }
  });
  return balance;
}

const ResumeRevenue: React.FC<CurrentRevenueProps> = ({
  transactions
}) => {

  const { receitas, despesas } = calculateCurrentRevenue(transactions);
  const balance = calculateBalance(transactions);

  return (
    <div className="bg-slate-800 p-4 rounded-lg col-span-1">
      <div className="flex flex-col gap-4">
        <div className="w-full flex justify-between bg-slate-700 p-4 rounded-lg">
          <h3 className="text-2xl font-bold">Saldo </h3>
          <span className="text-2xl font-semibold">{formatCurrencyBRL(balance)}</span>
        </div>
        <div className="mt-2 p-4 rounded-lg bg-slate-700">
          <h3 className="text-2xl font-bold mb-2">Resumo do Mês</h3>
          <ul>
            <li>
              <span className="text-green-700 font-semibold"> Receitas: </span>
              <span> {formatCurrencyBRL(receitas)} </span>
            </li>
            <li>
              <span className="text-red-700 font-semibold"> Despesas: </span>
              <span> {formatCurrencyBRL(despesas)} </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResumeRevenue;
