import CurrentRevenue from "./CurrentRevenue";
import TransactionsChart from "./TransactionsChart";
import UpcomingTransactions from "./UpcomingTransactions";

const Dashboard = ({ transacoes }: { transacoes: any[] }) => {
    return (
        <div className="grid grid-cols-3 grid-rows-2 gap-4 w-full">
            <CurrentRevenue />
            <div className="bg-slate-800 p-4 rounded-lg col-span-2">
                <h3 className="text-2xl font-bold mb-2"> Gráfico de Transações </h3>
                <TransactionsChart transacoes={transacoes} />
            </div>
            <UpcomingTransactions />
            <div className="bg-slate-800 p-4 rounded-lg col-span-2 row-span-2">
                <h3 className="text-2xl font-bold"> Calendário </h3>
            </div>
        </div>
    );
};

export default Dashboard;