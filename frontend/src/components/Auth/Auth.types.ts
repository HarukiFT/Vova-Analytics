type FieldParams = {
    type: 'text' | 'password',
    placeholder: string
}

export enum AuthStage {
    Username,
    Password
}

export type AuthFields = {
    username?: string,
    password?: string
}

export const StageParams: Record<AuthStage, FieldParams> = {
    [AuthStage.Username]: {
        type: 'text',
        placeholder: 'Введите свой логин'
    },

    [AuthStage.Password]: {
        type: 'password',
        placeholder: 'Введите свой пароль'
    },
}