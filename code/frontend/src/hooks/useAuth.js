import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  function updateUserDetails(updatedUser) {
    let tempUser = { ...user };
    tempUser.firstName = updatedUser.firstName;
    tempUser.lastName = updatedUser.lastName;
    tempUser.phone = updatedUser.phone;
    tempUser.pet = updatedUser.pet;
    setUser(tempUser);
  }

  const login = async (data) => {
    setUser(data);
    setTimeout(() => {
      logout();
    }, 3600000);
    navigate("/dashboard", { replace: true });
  };

  const logout = () => {
    setUser(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      updateUserDetails,
    }),
    // eslint-disable-next-line
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
