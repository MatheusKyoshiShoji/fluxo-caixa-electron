import { formatCurrencyBRL } from "../utils/formatValues";

const TransactionList = ({transacoes}: { transacoes: any[]}) => {
if (!transacoes.length) return <p className="text-center text-gray-500">Nenhuma transação ainda.</p>;

    return (
    <table className="w-full border bg-slate-800 rounded shadow my-8">
        <thead>
            <tr className="bg-blue-950">
            <th className="p-2">Data</th>
            <th className="p-2">Descrição</th>
            <th className="p-2">Tipo</th>
            <th className="p-2">Valor (R$)</th>
            <th className="p-2">Status</th>
            </tr>
        </thead>
        <tbody>
            {transacoes.map((t) => (
            <tr key={t.id}>
                <td className="border p-2">{new Date(t.data).toLocaleDateString()}</td>
                <td className="border p-2">{t.descricao}</td>
                <td className={`border p-2 ${t.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'}`}>
                {t.tipo}
                </td>
                <td className="border p-2">{formatCurrencyBRL(t.valor)}</td>
                <td className={`border p-2 ${t.status === 'pago' ? 'text-green-600' : 'text-red-600'}`}>
                {t.status}
                </td>
            </tr>
            ))}
        </tbody>
    </table>
    );
};

export default TransactionList;