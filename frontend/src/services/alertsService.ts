import api from "./api";

export interface AlertStatus {
  limitExceeded: boolean;
  monthlyLimit: number;
  totalSpent: number;
}

export const setMonthlyLimit = async (monthlyLimit: number): Promise<void> => {
  await api.post("/alerts/set-limit", { monthlyLimit });
};

export const checkAlerts = async (): Promise<AlertStatus> => {
  const response = await api.get<AlertStatus>("/alerts/check");
  return response.data;
};
