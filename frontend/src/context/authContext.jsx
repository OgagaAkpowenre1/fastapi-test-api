import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export function AuthProvider({ children }){
    const [user, setUser] = useState(null);

    const login = (userData) => setUser(userData)

    const logout = () => setUser(null)

    const updateUser = (updatedData) => {
        setUser(prev => ({...prev, ...updatedData}))
    }

    return (
        <AuthContext.Provider value={{user, login, logout, updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)