import { Transaction } from "src/types/transaction";
import { formatCurrencyBRL, formatDateBR } from "../utils/formatValues";
import { useMemo, useState } from "react";

interface TransactionListProps {
  transacoes: Transaction[];
  onRemove?: (id: number) => void;
  onEdit?: (updated: Transaction) => void;
}

const TransactionList = ({ transacoes, onRemove, onEdit }: TransactionListProps) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Transaction>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filterViewType, setFilterViewType] = useState<"monthly" | "yearly">("monthly");
  const [filterYear, setFilterYear] = useState<number>(new Date().getFullYear());
  const [filterMonth, setFilterMonth] = useState<number>(new Date().getMonth() + 1);
  const [filterTipo, setFilterTipo] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");

  const pageSize = 10;
  const years = useMemo(() =>
    Array.from(new Set(transacoes.map(t => new Date(t.data).getFullYear()))), [transacoes]);
  const months = useMemo(() =>
    Array.from(new Set(
      transacoes
        .filter(t => new Date(t.data).getFullYear() === filterYear)
        .map(t => new Date(t.data).getMonth() + 1)
    )), [transacoes, filterYear]);

  const filteredTransacoes = useMemo(() => {
    return transacoes.filter(t => {
      const tDate = new Date(t.data);
      const tYear = tDate.getFullYear();
      const tMonth = tDate.getMonth() + 1;
      let match = true;
      if (filterViewType === "monthly") {
        match = match && tYear === filterYear && tMonth === filterMonth;
      } else {
        match = match && tYear === filterYear;
      }
      if (filterTipo) match = match && t.tipo === filterTipo;
      if (filterStatus) match = match && t.status === filterStatus;
      return match;
    });
  }, [transacoes, filterViewType, filterYear, filterMonth, filterTipo, filterStatus]);

  const totalPages = Math.ceil(filteredTransacoes.length / pageSize);
  const paginatedTransacoes = filteredTransacoes.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
    <div className="bg-slate-800 p-4 rounded-lg mt-8 w-full h-[65vh] overflow-y-auto scrollbar-hidden">
      <div className="flex flex-wrap gap-4 mb-4 items-center float-end">
        <select
          value={filterViewType}
          onChange={e => setFilterViewType(e.target.value as "monthly" | "yearly")}
          className="bg-slate-700 text-white px-2 py-1 rounded"
        >
          <option value="monthly">Mensal</option>
          <option value="yearly">Anual</option>
        </select>
        <select
          value={filterYear}
          onChange={e => setFilterYear(Number(e.target.value))}
          className="bg-slate-700 text-white px-2 py-1 rounded"
        >
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        {filterViewType === "monthly" && (
          <select
            value={filterMonth}
            onChange={e => setFilterMonth(Number(e.target.value))}
            className="bg-slate-700 text-white px-2 py-1 rounded"
          >
            {months.map(month => (
              <option key={month} value={month}>{month.toString().padStart(2, "0")}</option>
            ))}
          </select>
        )}
        <select
          value={filterTipo}
          onChange={e => setFilterTipo(e.target.value)}
          className="bg-slate-700 text-white px-2 py-1 rounded"
        >
          <option value="">Todos os Tipos</option>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="bg-slate-700 text-white px-2 py-1 rounded"
        >
          <option value="">Todos os Status</option>
          <option value="A pagar">A pagar</option>
          <option value="pago">Pago</option>
        </select>
      </div>
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
          {paginatedTransacoes.map((t) => (
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
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          className="px-3 py-1 rounded bg-slate-700 text-white disabled:opacity-50"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="text-white">{currentPage} de {totalPages}</span>
        <button
          className="px-3 py-1 rounded bg-slate-700 text-white disabled:opacity-50"
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default TransactionList;
