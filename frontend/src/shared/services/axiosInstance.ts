import axios from "axios";
import { toast } from "react-toastify";
import { LoadingMessages } from "../data/loading-messages";
import { InterceptorConfig, InterceptorResponse } from "../typings/interceptor.type";

export const AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_ENDPOINT ?? 'http://localhost:3001'
})

AxiosInstance.interceptors.request.use(
    (config: InterceptorConfig) => {
        if (config.showToast === true) {
            config.meta = config.meta || {}
            config.meta.toastId = toast.loading(LoadingMessages[Math.round(Math.random() * LoadingMessages.length)])
        }

        if (localStorage.getItem('AUTH_TOKEN') && localStorage.getItem('AUTH_TOKEN') != '') {
            config.headers.Authorization = `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

AxiosInstance.interceptors.response.use(
    (response: InterceptorResponse) => {
        if (response.config.showToast && response.config.meta && response.config.meta.toastId) {
            const toastId = response.config.meta?.toastId!
            response.endToast = (message: string) => {
                toast.update(toastId, {
                    render: message,
                    type: 'success',
                    autoClose: 2500,
                    isLoading: false
                })
            }
        }

        return response
    },

    (error) => {
        if (error.code !== 'ERR_NETWORK' && error.response.status != 500) {
            error.statusCode = error.response.status
        }

        if (error.config && error.config.showToast && error.config.meta.toastId) {
            if (!error.statusCode) {
                toast.update(error.config.meta.toastId, {
                    render: 'Ошибка подключения...',
                    type: 'error',
                    autoClose: 2500,
                    isLoading: false
                })
            } else {
                if (error.statusCode == 401 && window.location.pathname !== "/login") {
                    toast.update(error.config.meta.toastId, {
                        render: 'Требуется авторизация',
                        type: 'error',
                        autoClose: 2500,
                        isLoading: false
                    })

                    window.location.href = ""
                } else {
                    error.endToast = (message: string) => {
                        toast.update(error.config.meta.toastId, {
                            render: message,
                            type: 'error',
                            autoClose: 2500,
                            isLoading: false
                        })
                    }
                }
            }
        }

        return Promise.reject(error)
    }
)