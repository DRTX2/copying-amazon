import { createContext, useContext } from 'react';
import { AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);
//  hook personalisado
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
