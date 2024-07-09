import { useEffect, useState } from 'react'
import Card from './Card/Card'
import NewCard from './NewCard/NewCard'
import Styles from './Projects.module.scss'
import { ProjectData } from '../../shared/typings/project.type'
import { AxiosInstance } from '../../shared/services/axiosInstance'
import { InterceptorError, InterceptorResponse } from '../../shared/typings/interceptor.type'
import { useModal } from '../../contexts/ModalContext/ModalContext'

export default () => {
    const [projects, setProjects] = useState<ProjectData[]>([])
    const modal = useModal()

    useEffect(() => {
        AxiosInstance.get('/projects/fetch').then((response: InterceptorResponse) => {
            setProjects(response.data)
        }).catch((err: InterceptorError) => {
            return
        })
    }, [modal.isOpen])

    return (
        <div className={Styles.wrapper}>
            <div className={Styles.holder}>
                <p className={Styles.title}>Твои проекты</p>
                <p className={Styles.subtitle}>Проект содержит в себе аудит-логов и метрики. Именно тут ты можешь создавать и модерировать проекты</p>

                <div className={Styles.projectsHolders}>
                    <NewCard/>
                    {projects.map(projectData => (
                        <Card {...projectData} key={projectData._id}/>
                    ))}
                </div>
            </div>
        </div>
    )
}