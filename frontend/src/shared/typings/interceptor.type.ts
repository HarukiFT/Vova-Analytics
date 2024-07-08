import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { Id } from "react-toastify";

export interface InterceptorResponse extends AxiosResponse {
    config: InterceptorConfig
    endToast?: (message: string) => void
}

export interface InterceptorConfig extends InternalAxiosRequestConfig {
    showToast?: boolean
    meta?: {
        toastId?: Id
    }
}

export interface InterceptorError {
    endToast?: (message: string) => void
    statusCode?: number
}