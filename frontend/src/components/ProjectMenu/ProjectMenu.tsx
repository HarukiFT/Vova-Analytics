import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react'
import Styles from './ProjectMenu.module.scss'
import { Link, useNavigate, useNavigation, useParams } from 'react-router-dom'
import { ProjectData } from '../../shared/typings/project.type'
import { AxiosInstance } from '../../shared/services/axiosInstance'
import { InterceptorConfig, InterceptorError, InterceptorResponse } from '../../shared/typings/interceptor.type'
import { toast } from 'react-toastify'
import { Interface } from 'readline'
import { GeneralMenuProps, SectionData } from './ProjectMenu.type'
import Analytics from './Analytics/Analytics'


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

const validators: Record<string, (value: any) => boolean> = {
    ['name']: (value: any): boolean => {
        return (value && value !== '')
    },

    ['client']: (value: any): boolean => {
        return true
    },

    ['placeLink']: (value: any): boolean => {
        return true
    },
}

const GeneralComponent = ({projectData, setReady, trigger, onUpdate}: GeneralMenuProps) => {
    const handleApiKey = () => {
        if (!projectData?.apiKey) {
            toast.error('Данные не загружены...')
            return
        }

        navigator.clipboard.writeText(projectData.apiKey)
        toast.success('Скопировано!')
    }

    const [fields, setFields] = useState<any>({})
    useEffect(() => {
        setReady(false)

        if (Object.keys(fields).length == 0) return;

        AxiosInstance.patch('/projects/update', fields, {
            headers: {
                'project-id': projectData?._id
            },
            showToast: true,
        } as any).then((response: InterceptorResponse) => {
            if (response.endToast) {
                response.endToast('Сохранено')
            }

            onUpdate()
        }).catch((err: InterceptorError) => {
            if (err.endToast) {
                err.endToast('Ошибка при сохранении')
            }
        })
    }, [trigger])

    useEffect(() => {
        setReady(false)

        setFields({
            client: projectData?.client,
            placeLink: projectData?.placeLink,
            name: projectData?.name
        })
    }, [projectData])

    useEffect(() => {
        for (let key of Object.keys(validators)) {
            if (!validators[key](fields[key])) {
                setReady(false)
                return
            }
        }
    }, [fields])

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setReady(true)

        setFields({
            ...fields,
            [event.target.name]: event.target.value   
        })
    }

    return (
        <div className={Styles.mainGrid}>
            <div className={Styles.gridInput} style={{ gridColumn: '1/2' }}>
                <p>Имя проекта <span className={Styles.mark}>*</span></p>
                <input type="text" name="name" onChange={handleChange} value={fields.name} placeholder='Например: Chocopie Game' />
            </div>

            <div className={Styles.gridInput} style={{ gridColumn: '2/3' }}>
                <p>Клиент</p>
                <input type="text" name="client" onChange={handleChange} value={fields.client} placeholder='Например: Lotte Corporation' />
            </div>

            <div className={Styles.gridInput} style={{ gridColumn: '1/3', gridRow: '2/3' }}>
                <p>Ссылка на плейс <span className={Styles.transparentText}>позволит нам автоматически записывать открытые данные</span></p>
                <input type="text" name="placeLink" onChange={handleChange} placeholder='Ссылка в формате https://roblox.com/...' />
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

    useNavigation()
    const navigate = useNavigate()
    const [projectData, setProjectData] = useState<ProjectData>()
    const [lastUpdate, setUpdate] = useState<number>()
    const [isReady, setReady] = useState<boolean>()
    const [trigger, setTrigger] = useState<boolean>(false)

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
    }, [lastUpdate])

    useEffect(() => {
        if (!(hash in Sections)) {
            navigate('#general')
        }
    })

    const renderSection = () => {
        if (!projectData) return;

        switch(hash) {
            case 'general':
                return <GeneralComponent trigger={trigger} onUpdate={() => {setUpdate(Date.now())}} setReady={setReady} projectData={projectData}/>
            case 'analytics':
                return <Analytics projectData={projectData}/>
        }
    }

    return (<div className={Styles.wrapper}>
        <div className={Styles.header}>
            <div className={Styles.sideWrapper}>
                <a className={Styles.logo}>Metrologist</a>
                <span className={Styles.projectName}>{projectData?.name}</span>
            </div>

            {}

            <div className={Styles.sideWrapper}>
                {hash == 'general' && 
                <input type="button" onClick={() => {isReady && setTrigger(!trigger)}} className={isReady ? Styles.activeButton : Styles.inactiveButton} value="Сохранить" />
                }
            </div>
        </div>

        <div className={Styles.gridWrapper}>
            <div className={Styles.contentWrapper}>
                <div className={Styles.content}>
                    <p className={Styles.sectionTitle}>{Sections[hash].title}</p>
                    <p className={Styles.sectionDescription}>{Sections[hash].description}</p>

                    {renderSection()}
                </div>
            </div>

            <div className={Styles.sectionWrapper}>
                <Link to={"#general"} className={Styles.sectionButton}>Общее</Link>
                <Link to={"#analytics"} className={Styles.sectionButton}>Аналитика</Link>
                <input type='button' value="Аудит логов" className={Styles.sectionButton} />
            </div>
        </div>
    </div>)
}
