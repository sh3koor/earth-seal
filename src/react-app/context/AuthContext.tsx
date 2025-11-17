import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "admin" | "proponent";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Demo user - in real app this would come from authentication service
  const [user, setUser] = useState<User>({
    id: "1",
    name: "Salem Alharbi",
    email: "salem.alharbi.4@aramco.com",
    role: "admin",
  });

  const login = async (email: string, _password: string) => {
    // Mock login - in real app this would authenticate with backend
    setUser({
      id: "1",
      name: "Ahmed Al-Rashid",
      email: email,
      role: "admin",
    });
  };

  const logout = () => {
    setUser(null as any);
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}
