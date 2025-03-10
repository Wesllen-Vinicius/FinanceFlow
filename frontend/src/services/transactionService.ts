import api from "./api";

export type TransactionType = "INCOME" | "EXPENSE";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  categoryId?: string;
  createdAt: string;
}

export interface TransactionData {
  title: string;
  amount: number;
  type: TransactionType;
  categoryId?: string;
}

export interface DashboardSummary {
  saldo: number;
  receitas: number;
  despesas: number;
}

export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get<Transaction[]>("/transactions");
  return response.data;
};

export const getTransactionById = async (id: string): Promise<Transaction> => {
  const response = await api.get<Transaction>(`/transactions/${id}`);
  return response.data;
};

export const createTransaction = async (
  transactionData: TransactionData
): Promise<Transaction> => {
  const response = await api.post<Transaction>(
    "/transactions",
    transactionData
  );
  return response.data;
};

export const updateTransaction = async (
  id: string,
  transactionData: Partial<TransactionData>
): Promise<Transaction> => {
  const response = await api.put<Transaction>(
    `/transactions/${id}`,
    transactionData
  );
  return response.data;
};

export const deleteTransaction = async (id: string): Promise<Transaction> => {
  const response = await api.delete<Transaction>(`/transactions/${id}`);
  return response.data;
};

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const response = await api.get<DashboardSummary>("/transactions/dashboard");
  return response.data;
};

export const exportTransactionsCSV = async (): Promise<Blob> => {
  const response = await api.get("/transactions/export/csv", {
    responseType: "blob",
  });
  return response.data;
};

export const exportTransactionsPDF = async (): Promise<Blob> => {
  const response = await api.get("/transactions/export/pdf", {
    responseType: "blob",
  });
  return response.data;
};
