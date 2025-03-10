import api from "./api";

interface LoginResponse {
  access_token: string;
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
  localStorage.setItem("token", response.data.access_token);
  return response.data;
};

export const logout = (): void => {
  localStorage.removeItem("token");
};
