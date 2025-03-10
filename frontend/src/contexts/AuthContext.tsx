import { createContext } from "react";
import { AuthContextType } from "./AuthTypes";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
