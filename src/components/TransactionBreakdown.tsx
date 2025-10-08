import { Period } from "src/types/period";
import { formatCurrencyBRL } from "../utils/formatValues";

interface TransactionBreakdownProps {
  periods: Period[];
  viewType: "monthly" | "yearly";
  onViewTypeChange: (type: "monthly" | "yearly") => void;
  onPeriodClick: (period: Period) => void;
  onBack: () => void;
  selectedYear?: number | null;
}

const TransactionBreakdown = ({
  periods,
  viewType,
  onPeriodClick,
  onBack,
  selectedYear,
}: TransactionBreakdownProps) => {
  const totalRevenue = periods.reduce((sum, p) => sum + p.revenue, 0);
  const totalExpense = periods.reduce((sum, p) => sum + p.expense, 0);
  const totalBalance = periods.reduce((sum, p) => sum + p.balance, 0);

  return (
    <div className="bg-slate-800 p-4 rounded-lg mt-8 w-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-2xl font-bold capitalize">
          {viewType === "yearly" ? "Visão Anual" : `Visão Mensal (${selectedYear})`}
        </h3>

        {viewType === "monthly" && (
          <button
            className="bg-slate-700 px-3 py-1 rounded hover:bg-slate-600 transition"
            onClick={onBack}
          >
            Voltar
          </button>
        )}
      </div>

      <table className="w-full mt-4 text-left">
        <thead>
          <tr>
            <th className="border-b border-slate-600 pb-2">Período</th>
            <th className="border-b border-slate-600 pb-2">Receita</th>
            <th className="border-b border-slate-600 pb-2">Despesa</th>
            <th className="border-b border-slate-600 pb-2">Saldo</th>
          </tr>
        </thead>

        <tbody>
          {periods.map((period) => (
            <tr
              key={period.date}
              className={`cursor-pointer hover:bg-slate-700 transition ${
                viewType === "yearly" ? "font-medium" : ""
              }`}
              onClick={() => onPeriodClick(period)}
            >
              <td className="border-b border-slate-600 py-3 pl-2 capitalize">
                {period.date}
              </td>
              <td className="border-b border-slate-600 py-2 text-green-400">
                {formatCurrencyBRL(period.revenue)}
              </td>
              <td className="border-b border-slate-600 py-2 text-red-400">
                {formatCurrencyBRL(period.expense)}
              </td>
              <td className="border-b border-slate-600 py-2">
                {formatCurrencyBRL(period.balance)}
              </td>
            </tr>
          ))}

          <tr className="font-bold bg-slate-900">
            <td className="py-3 pl-2 border-t border-slate-600">Total</td>
            <td className="py-3 border-t border-slate-600 text-green-400">
              {formatCurrencyBRL(totalRevenue)}
            </td>
            <td className="py-3 border-t border-slate-600 text-red-400">
              {formatCurrencyBRL(totalExpense)}
            </td>
            <td className="py-3 border-t border-slate-600">
              {formatCurrencyBRL(totalBalance)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default TransactionBreakdown;