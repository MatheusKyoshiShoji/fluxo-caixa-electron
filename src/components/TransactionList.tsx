import { Transaction } from "src/types/transaction";
import { formatCurrencyBRL, formatDateBR } from "../utils/formatValues";
import { useState } from "react";

interface TransactionListProps {
  transacoes: Transaction[];
  onRemove?: (id: number) => void;
  onEdit?: (updated: Transaction) => void;
}

const TransactionList = ({ transacoes, onRemove, onEdit }: TransactionListProps) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Transaction>>({});

  if (!transacoes.length) {
    return (
      <p className="text-center text-gray-500">Nenhuma transação ainda.</p>
    );
  }

  const startEdit = (t: Transaction) => {
    setEditingId(t.id);
    setEditData({ ...t });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveEdit = () => {
    if (onEdit && editingId !== null) {
        onEdit(editData as Transaction);
        setEditingId(null);
        setEditData({});
    };
  }

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
            <tr key={t.id} className={` ${editingId === t.id ? "" : "hover:bg-slate-700"}  transition`}>
              {editingId === t.id ? (
                <>
                  <td className="border-b border-slate-600 py-3 pl-2">
                    <input
                      type="date"
                      value={editData.data || ""}
                      onChange={e => setEditData({ ...editData, data: e.target.value })}
                      className="bg-slate-700 text-white px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="border-b border-slate-600 py-3 pl-2">
                    <input
                      type="text"
                      value={editData.descricao || ""}
                      onChange={e => setEditData({ ...editData, descricao: e.target.value })}
                      className="bg-slate-700 text-white px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="border-b border-slate-600 py-3 pl-2">
                    <select
                      value={editData.tipo || "entrada"}
                      onChange={e => setEditData({ ...editData, tipo: e.target.value as "entrada" | "saida" })}
                      className="bg-slate-700 text-white px-2 py-1 rounded w-full"
                    >
                      <option value="entrada">Entrada</option>
                      <option value="saida">Saída</option>
                    </select>
                  </td>
                  <td className="border-b border-slate-600 py-3 pl-2">
                    <input
                      type="number"
                      value={editData.valor?.toString() || ""}
                      onChange={e => setEditData({ ...editData, valor: Number(e.target.value) })}
                      className="bg-slate-700 text-white px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="border-b border-slate-600 py-3 pl-2">
                    <select
                      value={editData.status || "A pagar"}
                      onChange={e => setEditData({ ...editData, status: e.target.value })}
                      className="bg-slate-700 text-white px-2 py-1 rounded w-full"
                    >
                      <option value="A pagar">A pagar</option>
                      <option value="pago">Pago</option>
                    </select>
                  </td>
                  <td className="border-b border-slate-600 py-3 pl-2 flex gap-2">
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                      onClick={saveEdit}
                    >
                      Salvar
                    </button>
                    <button
                      className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition"
                      onClick={cancelEdit}
                    >
                      Cancelar
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border-b border-slate-600 py-3 pl-2">
                    {formatDateBR(t.data)}
                  </td>
                  <td className="border-b border-slate-600 py-3 pl-2 capitalize">
                    {t.descricao}
                  </td>
                  <td className={`border-b border-slate-600 py-3 pl-2 ${t.tipo === "entrada" ? "text-green-400" : "text-red-400"}`}>
                    {t.tipo.charAt(0).toUpperCase() + t.tipo.slice(1)}
                  </td>
                  <td className="border-b border-slate-600 py-3 pl-2">
                    {formatCurrencyBRL(t.valor)}
                  </td>
                  <td className={`border-b border-slate-600 py-3 pl-2 ${t.status === "pago" ? "text-green-400" : "text-red-400"}`}>
                    {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                  </td>
                  <td className="border-b border-slate-500 py-3 pl-2 flex gap-2">
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                      onClick={() => startEdit(t)}
                    >
                      Editar
                    </button>
                    <button
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                        onClick={() => onRemove(t.id)}
                      >
                        Remover
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
