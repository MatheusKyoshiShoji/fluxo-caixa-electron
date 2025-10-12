import React, { useState } from "react";

interface TransactionFormProps {
  onSubmit: (data: any) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit }) => {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("entrada");
  const [data, setData] = useState("");
  const [status, setStatus] = useState("A pagar");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      descricao,
      valor: parseFloat(valor),
      tipo,
      data,
      status,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
      <input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={e => setDescricao(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={e => setValor(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="date"
        value={data}
        onChange={e => setData(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <select
        value={tipo}
        onChange={e => setTipo(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="entrada">Entrada</option>
        <option value="saida">Saída</option>
      </select>
      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="A pagar">A pagar</option>
        <option value="pago">Pago</option>
      </select>
      <button type="submit" className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-800 transition">
        Salvar
      </button>
    </form>
  );
};

export default TransactionForm;