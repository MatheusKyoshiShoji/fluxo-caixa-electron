const CurrentRevenue = () => {
    return (
        <div className="bg-slate-800 p-4 rounded-lg col-span-1">
            <h3 className="text-2xl font-bold"> Outubro </h3>
            <div className="mt-2 p-4 rounded-lg bg-slate-700" >
                <h4 className="text-xl"> Tipos de transação </h4>
                <ul>
                    <li>
                        <span className="text-green-700"> Receitas </span>
                        <span> R$ 0.00 </span>
                    </li>
                    <li>
                        <span className="text-red-700"> Despesas </span>
                        <span> R$ 0.00 </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default CurrentRevenue;