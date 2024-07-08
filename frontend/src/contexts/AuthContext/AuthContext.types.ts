export interface UserData {
    id: string
    username: string
}

export type AuthContextType = {
    token?: string
    userData?: UserData

    signIn: (token: string) => void
    logout: () => void
}