import { useMemo, useState } from "react";
import { Period } from "src/types/period";
import Dashboard from "./Dashboard";
import TransactionList from "./TransactionList";
import TransactionBreakdown from "./TransactionBreakdown";
import TransactionForm from "./TransactionForm";
import Modal from "./Modal";
import { Transaction } from "src/types/transaction";

interface FinancePageProps {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
}

const FinancePage = ({ transactions, setTransactions }: FinancePageProps) => {
  const [modalOpen, setModalOpen] = useState(false);


  const [viewType, setViewType] = useState<"monthly" | "yearly">("yearly");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const handleAddTransaction = (data: any) => {
    setTransactions([...transactions, { ...data, id: transactions.length + 1 }]);
    setModalOpen(false);
  };

  const yearlyData = useMemo(() => {
    const grouped: Record<number, Period> = {};
    transactions.forEach((t) => {
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
  }, [transactions]);

  const monthlyData = useMemo(() => {
    if (!selectedYear) return [];
    const grouped: Record<number, Period> = {};
    transactions
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
  }, [transactions, selectedYear]);

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
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-3xl font-bold"> Finanças </h2>
        <button
          className="bg-blue-950 px-4 py-2 rounded cursor-pointer hover:bg-blue-800 transition"
          onClick={() => setModalOpen(true)}
        >
          Adicionar Transação +
        </button>
      </div>
      <Dashboard transacoes={transactions} />
      <h2 className="text-3xl mt-8 font-bold"> Transaçãoes </h2>
      <TransactionList transacoes={transactions} onRemove={id => setTransactions(transactions.filter(t => t.id !== id))} />
      <h2 className="text-3xl mt-8 font-bold"> Breakdown de Transações </h2>
      <TransactionBreakdown
        periods={viewType === "yearly" ? yearlyData : monthlyData}
        viewType={viewType}
        onViewTypeChange={setViewType}
        onPeriodClick={handlePeriodClick}
        onBack={handleBackToYearly}
        selectedYear={selectedYear}
      />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Nova Transação</h2>
        <TransactionForm onSubmit={handleAddTransaction} />
      </Modal>
    </>
  );
};

export default FinancePage;
