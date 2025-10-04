const UpcomingTransactions = () => {
  return (
    <div className="bg-slate-800 p-4 rounded-lg col-span-1 row-span-2">
      <h3 className="text-2xl font-bold"> Próximas Transações </h3>
      <ul>
        <li className="border-b p-2">
          <span> 01/10 - Conta de Luz - R$ 150.00 - A pagar </span>
        </li>
        <li className="border-b p-2">
          <span> 05/10 - Conta de Água - R$ 80.00 - A pagar </span>
        </li>
        <li className="border-b p-2">
          <span> 10/10 - Internet - R$ 100.00 - A pagar </span>
        </li>
      </ul>
    </div>
  );
};

export default UpcomingTransactions;
