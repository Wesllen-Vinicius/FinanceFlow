import api from "./api";

export type TransactionType = "INCOME" | "EXPENSE";

export interface Category {
  id: string;
  name: string;
  type: TransactionType;
  totalSpent?: number;
  color?: string;
  createdAt: string;
}

export interface CreateCategoryDto {
  name: string;
  type: TransactionType;
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>("/categories");
  return response.data;
};

export const createCategory = async (
  categoryData: CreateCategoryDto
): Promise<Category> => {
  const response = await api.post<Category>("/categories", categoryData);
  return response.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await api.delete(`/categories/${id}`);
};
