import api from "./api";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
}

export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
};

export const createUser = async (user: CreateUserDto): Promise<User> => {
  const response = await api.post<User>("/users", user);
  return response.data;
};

export const updateUser = async (
  id: string,
  user: UpdateUserDto
): Promise<User> => {
  const response = await api.put<User>(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: string): Promise<User> => {
  const response = await api.delete<User>(`/users/${id}`);
  return response.data;
};
