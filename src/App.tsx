import { stat } from "original-fs";
import Dashboard from "./components/Dashboard";
import TransactionList from "./components/TransactionList";
import { useState } from "react";
import Modal from "./components/Modal";
import TransactionForm from "./components/TransactionForm";

const App = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [transacoes, setTransacoes] = useState([
        { id: 1, data: '2025-10-01', descricao: 'Salário', tipo: 'entrada', valor: 5000.00, status: 'pago' },
        { id: 2, data: '2025-10-04', descricao: 'Compras', tipo: 'saida', valor: 400.00, status: 'pago' },
        { id: 3, data: '2025-10-30', descricao: 'IPTU', tipo: 'saida', valor: 250.00, status: 'A pagar' }
    ]);

    const handleAddTransaction = (data: any) => {
        setTransacoes([
            ...transacoes,
            { ...data, id: transacoes.length + 1 }
        ]);
        setModalOpen(false);
    };

    return (
        <>
            <header className="w-full">
                <nav className="bg-blue-950 p-4 w-full flex justify-between items-center">
                    <h1 className="text-indigo-50 text-4xl">Fluxo de Caixa JS</h1>
                    <ul className="flex gap-4 text-indigo-50 text-lg">
                        <li> Finanças </li>
                        <li> Contatos </li>
                        <li> Calendário </li>
                    </ul>
                </nav>
            </header>
            <main className="bg-slate-900 text-white w-full p-4">
                <div className="mb-8 flex justify-between items-center">
                    <h2 className="text-3xl font-bold"> Finanças </h2>
                    <button 
                        className="bg-blue-950 px-4 py-2 rounded cursor-pointer hover:bg-blue-800 transition"
                        onClick={() => setModalOpen(true)}> 
                        Adicionar Transação +
                    </button>
                </div>
                <Dashboard transacoes={transacoes}/>
                <h2 className="text-3xl mt-8 font-bold"> Transaçãoes </h2>
                <TransactionList transacoes={transacoes}/>
            </main>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <h2 className="text-xl font-bold mb-4">Nova Transação</h2>
                <TransactionForm onSubmit={handleAddTransaction} />
            </Modal>
        </>
    );
};

export default App;