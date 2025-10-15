import { formatCurrencyBRL, formatDateBR } from "../utils/formatValues";
import { Transaction } from "src/types/transaction";

interface UpcomingTransactionsProps {
  transactions: Transaction[];
}

const UpcomingTransactions = ({ transactions }: UpcomingTransactionsProps) => {
  const today = new Date();
  const upcoming = transactions
    .filter(
      (t) =>
        t.status === "A pagar" &&
        new Date(t.data) > today
    )
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

  return (
    <div className="bg-slate-800 p-4 rounded-lg col-span-1 row-span-2">
      <h3 className="text-2xl font-bold mb-2">Próximas Transações</h3>
      <div className="h-3/4 overflow-y-auto scrollbar-hidden">
        <ul>
          {upcoming.length === 0 && (
            <li className="p-2 text-gray-400">Nenhuma transação futura.</li>
          )}
          {upcoming.map((t) => (
            <li key={t.id} className="border-b border-slate-700 p-2 flex flex-col">
              <span className="font-semibold">{formatDateBR(t.data)} - {t.descricao}</span>
              <span>
                {formatCurrencyBRL(t.valor)} - <span className={`${t.tipo === "entrada" ? "text-green-400" : "text-red-400"}`}>{t.status}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UpcomingTransactions;