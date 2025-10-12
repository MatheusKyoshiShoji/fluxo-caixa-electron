import { Transaction } from "src/types/transaction";
import { formatCurrencyBRL, formatDateBR } from "../utils/formatValues";

interface TransactionListProps {
  transacoes: Transaction[];
  onRemove?: (id: number) => void;
}

const TransactionList = ({ transacoes, onRemove }: TransactionListProps) => {
  if (!transacoes.length)
    return (
      <p className="text-center text-gray-500">Nenhuma transação ainda.</p>
    );

  return (
    <div className="bg-slate-800 p-4 rounded-lg mt-8 w-full">
      <table className="w-full mt-2 text-left">
        <thead>
          <tr>
            <th className="border-b border-slate-600 pb-2">Data</th>
            <th className="border-b border-slate-600 pb-2">Descrição</th>
            <th className="border-b border-slate-600 pb-2">Tipo</th>
            <th className="border-b border-slate-600 pb-2">Valor (R$)</th>
            <th className="border-b border-slate-600 pb-2">Status</th>
            <th className="border-b border-slate-600 pb-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {transacoes.map((t) => (
            <tr key={t.id} className="hover:bg-slate-700 transition">
              <td className="border-b border-slate-600 py-3 pl-2">
                {formatDateBR(t.data)}
              </td>
              <td className="border-b border-slate-600 py-3 pl-2 capitalize">
                {t.descricao}
              </td>
              <td
                className={`border-b border-slate-600 py-3 pl-2 ${
                  t.tipo === "entrada" ? "text-green-400" : "text-red-400"
                }`}
              >
                {t.tipo}
              </td>
              <td className="border-b border-slate-600 py-3 pl-2">
                {formatCurrencyBRL(t.valor)}
              </td>
              <td
                className={`border-b border-slate-600 py-3 pl-2 ${
                  t.status === "pago" ? "text-green-400" : "text-red-400"
                }`}
              >
                {t.status}
              </td>
              <td className="border-b border-slate-600 py-3">
                {onRemove && (
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    onClick={() => onRemove(t.id)}
                  >
                    Remover
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
