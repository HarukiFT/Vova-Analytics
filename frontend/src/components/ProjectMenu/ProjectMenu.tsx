import { useEffect, useState } from 'react'
import Styles from './ProjectMenu.module.scss'
import { useNavigate, useNavigation, useParams } from 'react-router-dom'
import { ProjectData } from '../../shared/typings/project.type'
import { AxiosInstance } from '../../shared/services/axiosInstance'
import { InterceptorError, InterceptorResponse } from '../../shared/typings/interceptor.type'
import { toast } from 'react-toastify'
import { Interface } from 'readline'
import { SectionData } from './ProjectMenu.type'

interface ProjectMenuProps {
    projectData?: ProjectData
}

const Sections: SectionData = {
    ['general']: {
        title: 'Общее',
        description: 'Заполните информацию о проекте, чтобы оптимизировать работу над ним'
    },

    ['analytics']: {
        title: 'Аналитика',
        description: 'В разаработке'
    }
}

const GeneralComponent = ({projectData}: ProjectMenuProps) => {
    const handleApiKey = () => {
        if (!projectData?.apiKey) {
            toast.error('Данные не загружены...')
            return
        }

        navigator.clipboard.writeText(projectData.apiKey)
        toast.success('Скопировано!')
    }

    return (
        <div className={Styles.mainGrid}>
            <div className={Styles.gridInput} style={{ gridColumn: '1/2' }}>
                <p>Имя проекта <span className={Styles.mark}>*</span></p>
                <input type="text" value={projectData?.name ?? undefined} placeholder='Например: Chocopie Game' />
            </div>

            <div className={Styles.gridInput} style={{ gridColumn: '2/3' }}>
                <p>Клиент</p>
                <input type="text" value={projectData?.client ?? undefined} placeholder='Например: Lotte Corporation' />
            </div>

            <div className={Styles.gridInput} style={{ gridColumn: '1/3', gridRow: '2/3' }}>
                <p>Ссылка на плейс <span className={Styles.transparentText}>позволит нам автоматически записывать открытые данные</span></p>
                <input type="text" placeholder='Ссылка в формате https://roblox.com/...' />
            </div>

            <div className={Styles.gridInput} style={{ gridColumn: '1/3', gridRow: '3' }}>
                <p>API ключ</p>
                <input type="button" onClick={handleApiKey} value={"Нажмите чтобы скопировать"} />
            </div>
        </div>
    )
}

export default () => {
    const { projectId } = useParams<Record<string, string | undefined>>()

    const navigation = useNavigation()
    const navigate = useNavigate()
    const [projectData, setProjectData] = useState<ProjectData>()
    
    const hash = window.location.hash.substring(1)

    useEffect(() => {
        AxiosInstance.get('/projects/get', {
            headers: {
                'project-id': projectId
            }
        }).then((response: InterceptorResponse) => {
            setProjectData(response.data)
        }).catch((err: InterceptorError) => {
            if (err.statusCode == 403) {
                toast.error('Нет доступа к этому проекту')
                navigate('/')
            }
        })
    }, [])

    useEffect(() => {
        if (!(hash in Sections)) {
            navigate('#general')
        }
    })

    return (<div className={Styles.wrapper}>
        <div className={Styles.header}>
            <div className={Styles.sideWrapper}>
                <a className={Styles.logo}>Metrologist</a>
                <span className={Styles.projectName}>Dirol</span>
            </div>

            <div className={Styles.sideWrapper}>
                <input type="button" className={Styles.inactiveButton} value="Сохранить" />
            </div>
        </div>

        <div className={Styles.gridWrapper}>
            <div className={Styles.contentWrapper}>
                <div className={Styles.content}>
                    <p className={Styles.sectionTitle}>{Sections[hash].title}</p>
                    <p className={Styles.sectionDescription}>{Sections[hash].description}</p>

                    {window.location.hash === '#general' && <GeneralComponent projectData={projectData}/>}
                </div>
            </div>

            <div className={Styles.sectionWrapper}>
                <input type='button' value="Общее" className={Styles.sectionButton} />
                <input type='button' value="Аналитика" className={Styles.sectionButton} />
                <input type='button' value="Аудит логов" className={Styles.sectionButton} />
            </div>
        </div>
    </div>)
}
