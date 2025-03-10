import api from "./api";

export interface Invite {
  id: string;
  fromUser: {
    id: string;
    email: string;
    name: string;
  };
  permission: "READ" | "EDIT";
  createdAt: string;
}

export interface SharedUser {
  id: string;
  name: string;
  email: string;
  permission: "READ" | "EDIT";
}

export const sendInvite = async (
  email: string,
  permission: "READ" | "EDIT"
): Promise<void> => {
  await api.post("/shared-access/invite", { email, permission });
};

export const getInvites = async (): Promise<Invite[]> => {
  const response = await api.get<Invite[]>("/shared-access/invites");
  return response.data;
};

export const respondToInvite = async (
  inviteId: string,
  accept: boolean
): Promise<void> => {
  await api.post(`/shared-access/respond/${inviteId}`, { accept });
};

export const getSharedUsers = async (): Promise<SharedUser[]> => {
  const response = await api.get<SharedUser[]>("/shared-access/shared-users");
  return response.data;
};
