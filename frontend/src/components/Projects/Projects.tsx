import { useEffect, useState } from 'react'
import Card from './Card/Card'
import NewCard from './NewCard/NewCard'
import Styles from './Projects.module.scss'
import { ProjectData } from './Projects.types'
import { AxiosInstance } from '../../shared/services/axiosInstance'
import { InterceptorError, InterceptorResponse } from '../../shared/typings/interceptor.type'

export default () => {
    const [projects, setProjects] = useState<ProjectData[]>([])

    useEffect(() => {
        AxiosInstance.get('/projects/fetch').then((response: InterceptorResponse) => {
            setProjects(response.data)
        }).catch((err: InterceptorError) => {
            return
        })
    }, [])

    return (
        <div className={Styles.wrapper}>
            <div className={Styles.holder}>
                <p className={Styles.title}>Твои проекты</p>
                <p className={Styles.subtitle}>Проект содержит в себе аудит-логов и метрики. Именно тут ты можешь создавать и модерировать проекты</p>

                <div className={Styles.projectsHolders}>
                    <NewCard/>
                    {projects.map(projectData => (
                        <Card {...projectData}/>
                    ))}
                </div>
            </div>
        </div>
    )
}