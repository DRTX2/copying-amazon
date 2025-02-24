import { createContext, useContext } from "react";
import { AuthContextType } from "../types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
//  hook personalisado
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  //  Si intentas usar el hook useAuth en un componente que no está envuelto por el AuthProvider, el valor de AuthContext será undefined, porque no hay un proveedor que le esté dando un valor al contexto.
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
