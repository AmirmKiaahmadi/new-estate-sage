import { useMemo, createContext, useContext } from 'react'
import { useLocalStorage } from 'utilities/hooks/localStorage/uselocalStorage'

type TAuthProviderProps = {
    children: React.ReactNode
}

export const AuthContext = createContext<IAuthContext>({
    user: null,
    login: () => null,
    logout: () => null,
    update: () => null,
})

export const AuthProvider = ({ children }: TAuthProviderProps) => {
    const [user, setUser] = useLocalStorage('user', null)

    const login = async (data: IUser) => {
        const user = { ...data }
        setUser(user)
    }

    const update = async (data: IUser) => {
        setUser(data)
    }

    const logout = () => {
        setUser(null)
        window.localStorage.clear()
    }

    const value = useMemo(
        () => ({
            user,
            login,
            logout,
            update,
        }),
        [user]
    )
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}
