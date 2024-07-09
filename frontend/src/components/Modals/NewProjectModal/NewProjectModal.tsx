import { useSpring, animated } from "react-spring"
import Styles from './NewProjectModal.module.scss'
import { transform } from "typescript"
import { createRef, useState } from "react"
import { useModal } from "../../../contexts/ModalContext/ModalContext"
import { AxiosInstance } from "../../../shared/services/axiosInstance"
import { InterceptorConfig, InterceptorError, InterceptorResponse } from "../../../shared/typings/interceptor.type"

export default () => {
    const [isClosed, setClosed] = useState<boolean>()
    const [isLoading, setLoading] = useState<boolean>(false)

    const inputRef = createRef<HTMLInputElement>()

    const modal = useModal()

    const modalSpring = useSpring({
        from: {
            transform: 'scale(30%)'
        },

        to: {
            transform: !isClosed ? 'scale(100%)' : 'scale(30%)',
            opacity: !isClosed ? 1 : 0
        },

        config: {
            bounce: isClosed ? 0 : 10
        },

        onChange: () => {
            if (isClosed) {
                modal.closeModal(false)
            }
        },

        onRest: () => {
            if (isClosed) {
                modal.closeModal(true)
            }
        }
    })

    const handleClose = () => {
        setClosed(true)
    }

    const handleCreate = () => {
        if (isLoading) return;
        if (!inputRef.current) return;

        const projectName: string = inputRef.current.value
        AxiosInstance.post('/projects/create', {
            name: projectName
        }, {showToast: true} as InterceptorConfig).then((response: InterceptorResponse) => {
            response.endToast!('Проект создан!')
            handleClose()
        }).catch((error: InterceptorError) => {
            if (error.endToast) {
                error.endToast('Ошибка при создании проекта')
                handleClose()
            }
        })
    }

    return (
        <div className={Styles.wrapper}>
            <animated.div style={modalSpring} className={Styles.modal}>
                <p className={Styles.title}>Новый проект</p>
                <p className={Styles.subtitle}>Придумай название проекта, которое увидит клиент</p>
                <input type="text" ref={inputRef} className={Styles.inputField} placeholder={"Например \"TOP SECRET\""}/>
                <div className={Styles.buttonsWrapper}>
                    <input type="button" className={Styles.buttonInput} onClick={handleClose} value={"Отмена"}/>
                    <input type="button" className={Styles.accentButton} onClick={handleCreate} value={"Создать"}/>
                </div>
            </animated.div>
        </div> 
    )
}