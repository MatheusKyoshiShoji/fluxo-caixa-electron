import React from "react";
import { Transaction } from "src/types/transaction";
import { formatCurrencyBRL } from "../utils/formatValues.ts";

interface CurrentRevenueProps {
    transactions: Transaction[];
}

function calculateCurrentRevenue(transactions: Transaction[]) {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    let receitas = 0;
    let despesas = 0;
    transactions.forEach(t => {
        const [year, month] = t.data.split("-").map(Number);
        if (year === currentYear && month === currentMonth) {
            if (t.tipo === "entrada") {
                receitas += t.valor;
            }
            else {
                despesas += t.valor;
            }
        }
    });
    return { receitas, despesas };
}

const CurrentRevenue: React.FC<CurrentRevenueProps> = ({transactions}) => {

    const { receitas, despesas } = calculateCurrentRevenue(transactions);

    return (
        <div className="bg-slate-800 p-4 rounded-lg col-span-1">
            <h3 className="text-2xl font-bold"> Outubro </h3>
            <div className="mt-2 p-4 rounded-lg bg-slate-700" >
                <ul>
                    <li>
                        <span className="text-green-700 font-semibold"> Receitas: </span>
                        <span> {formatCurrencyBRL(receitas)} </span>
                    </li>
                    <li>
                        <span className="text-red-700 font-semibold"> Despesas: </span>
                        <span> {formatCurrencyBRL(despesas)} </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default CurrentRevenue;