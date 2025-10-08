export interface Transaction {
  id: number;
  data: string;
  descricao: string;
  tipo: "entrada" | "saida";
  valor: number;
  status: string;
}