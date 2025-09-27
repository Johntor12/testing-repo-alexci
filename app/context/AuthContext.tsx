import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type User = { name: string; email?: string } | null;

interface AuthContextType {
  user: User;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (
    email: string,
    password: string,
    username: string,
    nomor_telepon: string
  ) => Promise<boolean>;
  fetchWithAuth: (url: string, options?: RequestInit) => Promise<Response>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(null);
  const backendUrl =
    "https://ppk.grayhill-39d1a131.southeastasia.azurecontainerapps.io";

  const [isLoading, setIsLoading] = useState(false);

  // 🔄 Cek token di AsyncStorage saat app dibuka
  useEffect(() => {
    AsyncStorage.getItem("token").then((savedToken) => {
      if (savedToken) {
        setToken(savedToken); // ✅ set token supaya bisa dipakai nanti
        // Optional: bisa fetch user, tapi dibungkus try-catch biar ga error
        fetch(`${backendUrl}/users/me`, {
          headers: { Authorization: `Bearer ${savedToken}` },
        })
          .then((res) => (res.ok ? res.json() : null))
          .then((userData) => {
            if (userData) {
              setUser({ name: userData.username, email: userData.email });
            }
          })
          .catch(() => {
            AsyncStorage.removeItem("token");
            setToken(null);
          });
      }
    });
  }, [backendUrl]);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!email || !password) return false;
    try {
      // ✅ Backend Anda butuh JSON dengan field "identifier" dan "password"
      const res = await fetch(`${backendUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: email, // <--- gunakan identifier, bukan username
          password,
        }),
      });

      const data = await res.json();
      console.log("Login response:", data); // 🔍 debug

      if (res.ok && data?.access_token) {
        await AsyncStorage.setItem("token", data.access_token);
        setToken(data.access_token);

        // ✅ Ambil user info dengan token
        const userRes = await fetch(`${backendUrl}/users/me`, {
          headers: { Authorization: `Bearer ${data.access_token}` },
        });

        if (!userRes.ok) {
          console.log("User fetch gagal:", await userRes.text());
          return false;
        }

        const userData = await userRes.json();
        setUser({ name: userData.username, email: userData.email });
        return true;
      }

      console.log("Login gagal:", data);
      return false;
    } catch (e) {
      console.error("Login error:", e);
      return false;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const register = async (
    email: string,
    password: string,
    username: string,
    nomor_telepon: string
  ): Promise<boolean> => {
    if (!email || !password || !username || !nomor_telepon) return false;
    try {
      const res = await fetch(`${backendUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username, nomor_telepon }),
      });

      const data = await res.json();
      if (res.ok && data.username && data.email) {
        setUser({ name: data.username, email: data.email });
        return true;
      }
      return false;
    } catch (e) {
      console.error("Register error:", e);
      return false;
    }
  };

  // 🔑 Helper untuk fetch otomatis dengan token
  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    if (!token) throw new Error("No token available");
    const headers = {
      ...(options.headers || {}),
      Authorization: token ? `Bearer ${token}` : "",
    };
    return fetch(url, { ...options, headers });
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, register, fetchWithAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
