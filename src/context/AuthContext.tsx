import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

interface User {
  username: string;
  email?: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check logged-in user when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('loggedInUser');
      }
    }

    setLoading(false);
  }, []);

  // Login
  const login = async (
    username: string,
    password: string
  ): Promise<void> => {
    setLoading(true);

    try {
      // Get registered user
      const storedUser = localStorage.getItem('registeredUser');

      if (!storedUser) {
        throw new Error(
          'No account found. Please register first.'
        );
      }

      const registeredUser = JSON.parse(storedUser);

      // Check username and password
      if (
        registeredUser.username !== username ||
        registeredUser.password !== password
      ) {
        throw new Error('Invalid username or password.');
      }

      // Create logged-in user
      const loggedInUser: User = {
        username: registeredUser.username,
        email: registeredUser.email,
        name: `${registeredUser.firstName} ${registeredUser.lastName}`,
      };

      // Save login
      localStorage.setItem(
        'loggedInUser',
        JSON.stringify(loggedInUser)
      );

      // Update state
      setUser(loggedInUser);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used within AuthProvider'
    );
  }

  return context;
}