import { useState } from "react";
import CurrentRevenue from "./ResumeRevenue";
import TransactionsChart from "./TransactionsChart";
import UpcomingTransactions from "./UpcomingTransactions";

const Dashboard = ({ transacoes }: { transacoes: any[] }) => {
    const now = new Date();
    const [selectedYear, setSelectedYear] = useState(now.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);

    const years = Array.from(new Set(transacoes.map(t => new Date(t.data).getFullYear())));
    const months = Array.from(new Set(
        transacoes
            .filter(t => new Date(t.data).getFullYear() === selectedYear)
            .map(t => new Date(t.data).getMonth() + 1)
    ));

    return (
        <div className="grid grid-cols-3 grid-rows-2 gap-4 w-full">
            <CurrentRevenue transactions={transacoes}/>
            <div className="bg-slate-800 p-4 rounded-lg col-span-2">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-bold">Gráfico de Transações</h3>
                    <div className="flex gap-2">
                        <select
                            value={selectedYear}
                            onChange={e => setSelectedYear(Number(e.target.value))}
                            className="bg-slate-700 text-white px-2 py-1 rounded"
                        >
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        <select
                            value={selectedMonth}
                            onChange={e => setSelectedMonth(Number(e.target.value))}
                            className="bg-slate-700 text-white px-2 py-1 rounded"
                        >
                            {months.map(month => (
                                <option key={month} value={month}>
                                    {month.toString().padStart(2, "0")}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <TransactionsChart
                    transacoes={transacoes}
                    selectedYear={selectedYear}
                    selectedMonth={selectedMonth}
                />
            </div>
            <UpcomingTransactions transactions={transacoes}/>
            <div className="bg-slate-800 p-4 rounded-lg col-span-2 row-span-2">
                <h3 className="text-2xl font-bold">Calendário</h3>
            </div>
        </div>
    );
};

export default Dashboard;