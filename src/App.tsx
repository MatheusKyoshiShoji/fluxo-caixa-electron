import { useState } from "react";
import FinancePage from "./components/FinancePage";
import { Transaction } from "src/types/transaction";

const App = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([
      {
        id: 1,
        data: "2025-10-01",
        descricao: "Salário",
        tipo: "entrada",
        valor: 5000.0,
        status: "pago",
      },
      {
        id: 2,
        data: "2025-10-04",
        descricao: "Compras",
        tipo: "saida",
        valor: 400.0,
        status: "pago",
      },
      {
        id: 3,
        data: "2025-10-30",
        descricao: "IPTU",
        tipo: "saida",
        valor: 250.0,
        status: "A pagar",
      },
    ]);

  return (
    <>
      <header className="w-full">
        <nav className="bg-blue-950 p-4 w-full flex justify-between items-center">
          <h1 className="text-indigo-50 text-4xl">Fluxo de Caixa JS</h1>
          <ul className="flex gap-4 text-indigo-50 text-lg">
            <li> Finanças </li>
            <li> Vendas </li>
            <li> Contatos </li>
          </ul>
        </nav>
      </header>
      <main className="bg-slate-900 text-white w-full p-4">
        <FinancePage transactions={transactions} setTransactions={setTransactions}/>
      </main>
    </>
  );
};

export default App;
