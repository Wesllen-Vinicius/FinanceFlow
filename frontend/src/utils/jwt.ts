export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    console.error("Erro ao fazer login:", e);
    return null;
  }
};
