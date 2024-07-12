import { useEffect, useState } from 'react'
import DropList from '../../DropList/DropList'
import Styles from './Analytics.module.scss'
import { AxiosInstance } from '../../../shared/services/axiosInstance'
import { InterceptorConfig, InterceptorError } from '../../../shared/typings/interceptor.type'
import { ProjectAnalyticsProp } from './Analytics.type'
import { toast } from 'react-toastify'

export default ({projectData}: ProjectAnalyticsProp) => {
    const [metrics, setMetrics] = useState<string[]>()

    useEffect(() => {
        console.log(projectData)

        AxiosInstance.get('/metrics/values', {
            headers: {
                'project-id': projectData?._id
            } 
        } as any).then(response => {
            setMetrics(response.data)
            console.log(response.data)
        }).catch((err) => {
            toast.error('Ошибка при получении метрик')
        })
    },[])

    return (
        <div className={Styles.wrapper}>
            <div className={Styles.actionBar}>
                <DropList choices={metrics ?? []} isActive={true}/>
            </div>
        </div>
    )
}