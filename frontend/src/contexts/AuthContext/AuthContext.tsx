import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, UserData } from "./AuthContext.types";
import { AxiosInstance } from "../../shared/services/axiosInstance";
import { InterceptorError } from "../../shared/typings/interceptor.type";
import { toast } from "react-toastify";

const AuthContext = createContext<AuthContextType>({logout: () => {}, signIn: () => {}})

const AuthContextProvider = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
    const [token, setToken] = useState<string | undefined>(localStorage.getItem('AUTH_TOKEN') ?? undefined)
    const [userData, setUserData] = useState<UserData | undefined>()

    const signIn = (token: string) => {
        setToken(token)
    }

    const logout = () => {
        setToken(undefined)
        setUserData(undefined)
    }

    useEffect(() => {
        if (!token || token == '') {
            setUserData(undefined)

            localStorage.removeItem('AUTH_TOKEN')
            return
        }

        localStorage.setItem('AUTH_TOKEN', token)

        AxiosInstance.get('/users/data').then(response => {
            setUserData(response.data)
        }).catch((err: InterceptorError) => {
            if (!err.statusCode) toast.error('Ошибка подключения...')
        })
    }, [token])

    const payload = {token, signIn, logout, userData}

    return <AuthContext.Provider value={payload}>{children}</AuthContext.Provider>
}

const useAuth = () => {
    const context = useContext(AuthContext)

    return context
}

export {AuthContextProvider, useAuth}