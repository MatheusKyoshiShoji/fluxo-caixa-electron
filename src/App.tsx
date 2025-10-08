import Dashboard from "./components/Dashboard";
import TransactionList from "./components/TransactionList";
import { useMemo, useState } from "react";
import Modal from "./components/Modal";
import TransactionForm from "./components/TransactionForm";
import TransactionBreakdown from "./components/TransactionBreakdown";
import { Period } from "./types/period";

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [transacoes, setTransacoes] = useState([
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

  const [viewType, setViewType] = useState<"monthly" | "yearly">("yearly");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const handleAddTransaction = (data: any) => {
    setTransacoes([...transacoes, { ...data, id: transacoes.length + 1 }]);
    setModalOpen(false);
  };

  // ---- Agrupar transações por ano ----
  const yearlyData = useMemo(() => {
    const grouped: Record<number, Period> = {};
    transacoes.forEach((t) => {
      const year = new Date(t.data).getFullYear();
      if (!grouped[year]) {
        grouped[year] = {
          date: year.toString(),
          balance: 0,
          revenue: 0,
          expense: 0,
        };
      }
      if (t.tipo === "entrada") grouped[year].revenue += t.valor;
      if (t.tipo === "saida") grouped[year].expense += t.valor;
      grouped[year].balance = grouped[year].revenue - grouped[year].expense;
    });
    return Object.values(grouped).sort(
      (a, b) => Number(b.date) - Number(a.date)
    );
  }, [transacoes]);

  const monthlyData = useMemo(() => {
    if (!selectedYear) return [];
    const grouped: Record<number, Period> = {};
    transacoes
      .filter((t) => new Date(t.data).getFullYear() === selectedYear)
      .forEach((t) => {
        const month = new Date(t.data).getMonth(); // 0 = Janeiro
        if (!grouped[month]) {
          grouped[month] = {
            date: new Date(selectedYear, month).toLocaleString("pt-BR", {
              month: "long",
            }),
            balance: 0,
            revenue: 0,
            expense: 0,
          };
        }
        if (t.tipo === "entrada") grouped[month].revenue += t.valor;
        if (t.tipo === "saida") grouped[month].expense += t.valor;
        grouped[month].balance =
          grouped[month].revenue - grouped[month].expense;
      });
    return Object.values(grouped);
  }, [transacoes, selectedYear]);

  const handlePeriodClick = (period: Period) => {
    if (viewType === "yearly") {
      setSelectedYear(Number(period.date));
      setViewType("monthly");
    }
  };

  const handleBackToYearly = () => {
    setSelectedYear(null);
    setViewType("yearly");
  };

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
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold"> Finanças </h2>
          <button
            className="bg-blue-950 px-4 py-2 rounded cursor-pointer hover:bg-blue-800 transition"
            onClick={() => setModalOpen(true)}
          >
            Adicionar Transação +
          </button>
        </div>
        <Dashboard transacoes={transacoes} />
        <h2 className="text-3xl mt-8 font-bold"> Transaçãoes </h2>
        <TransactionList transacoes={transacoes} />
        <h2 className="text-3xl mt-8 font-bold"> Breakdown de Transações </h2>
        <TransactionBreakdown 
          periods={viewType === "yearly" ? yearlyData : monthlyData}
          viewType={viewType}
          onViewTypeChange={setViewType}
          onPeriodClick={handlePeriodClick}
          onBack={handleBackToYearly}
          selectedYear={selectedYear}
        />
      </main>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Nova Transação</h2>
        <TransactionForm onSubmit={handleAddTransaction} />
      </Modal>
    </>
  );
};

export default App;
