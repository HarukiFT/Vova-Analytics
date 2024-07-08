import Card from './Card/Card'
import NewCard from './NewCard/NewCard'
import Styles from './Projects.module.scss'

export default () => {
    return (
        <div className={Styles.wrapper}>
            <div className={Styles.holder}>
                <p className={Styles.title}>Твои проекты</p>
                <p className={Styles.subtitle}>Проект содержит в себе аудит-логов и метрики. Именно тут ты можешь создавать и модерировать проекты</p>

                <div className={Styles.projectsHolders}>
                    <NewCard/>
                    <Card/>
                </div>
            </div>
        </div>
    )
}