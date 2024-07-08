import { createRef, useEffect, useState } from 'react'
import Styles from './Auth.module.scss'
import { AuthFields, AuthStage, StageParams } from './Auth.types'
import { toast } from 'react-toastify'
import { AxiosInstance } from '../../shared/services/axiosInstance'
import { InterceptorConfig, InterceptorError, InterceptorResponse } from '../../shared/typings/interceptor.type'
import { useAuth } from '../../contexts/AuthContext/AuthContext'
import { useNavigate } from 'react-router-dom'

export default () => {
    const [stage, setStage] = useState<AuthStage>(AuthStage.Username)
    const [fields, setFields] = useState<AuthFields>({})
    const [isBusy, setBusy] = useState<boolean>(false)
    const navigate = useNavigate()
    
    const auth = useAuth()

    const inputRef = createRef<HTMLInputElement>()

    const proceedNext = () => {
        if(isBusy) return;

        const nextStage = stage + 1

        if (inputRef.current?.value === '') {
            toast.error('Нужно ввести что-нибудь...')
            return
        }

        setFields({
            ...fields,
            [AuthStage[stage].toLowerCase()]: inputRef.current?.value
        })

        if (nextStage in AuthStage) {
            setStage(nextStage as AuthStage)
        }
    }

    useEffect(() => {
        const stagesCount = Object.keys(AuthStage).length / 2
        if (Object.keys(fields).length == stagesCount) {
            setBusy(true)

            AxiosInstance.post('/auth/signin', fields, {showToast: true} as InterceptorConfig).then((response: InterceptorResponse) => {
                auth.signIn(response.data.token)
                response.endToast!('С возвращением!')
                navigate('/')
                
            }).catch((err: InterceptorError) => {
                err.endToast!('Что-то не сходится...')

                setFields({})
                setBusy(false)
                setStage(AuthStage.Username)
            })
        }
    },[fields])

    useEffect(() => {
        auth.logout()
    }, [])

    return (
        <div className={Styles.wrapper}>
            <p className={Styles.title}>Добро пожаловать!</p>
            <p className={Styles.undertitle}>Войди в аккаунт и управляй<br/><span className={Styles.mark}>проектами</span> уже <span className={Styles.mark}>сейчас</span></p>
            <input type={StageParams[stage].type} ref={inputRef} className={Styles.inputField} key={stage} placeholder={StageParams[stage].placeholder}/>
            <input type="button" onClick={proceedNext} value="Дальше" className={Styles.proceedButton}/>
        </div>
    )
}