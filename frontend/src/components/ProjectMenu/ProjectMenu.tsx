import Styles from './ProjectMenu.module.scss'

const GeneralComponent = () => {
    return (
        <div className={Styles.mainGrid}>
            <div className={Styles.gridInput} style={{ gridColumn: '1/2' }}>
                <p>Имя проекта <span className={Styles.mark}>*</span></p>
                <input type="text" placeholder='Например: Chocopie Game' />
            </div>

            <div className={Styles.gridInput} style={{ gridColumn: '2/3' }}>
                <p>Клиент</p>
                <input type="text" placeholder='Например: Lotte Corporation' />
            </div>

            <div className={Styles.gridInput} style={{ gridColumn: '1/3', gridRow: '2/3' }}>
                <p>Ссылка на плейс <span className={Styles.transparentText}>позволит нам автоматически записывать открытые данные</span></p>
                <input type="text" />
            </div>

            <div className={Styles.gridInput} style={{ gridColumn: '1/3', gridRow: '3' }}>
                <p>API ключ</p>
                <input type="button" value={"Нажмите чтобы скопировать"} />
            </div>
        </div>
    )
}

export default () => {
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
                    <p className={Styles.sectionTitle}>Общее</p>
                    <p className={Styles.sectionDescription}>Заполните информацию о проекте, чтобы оптимизировать работу над ним</p>

                    <GeneralComponent/>
                </div>
            </div>

            <div className={Styles.sectionWrapper}>
                <input type='button' value="Общее" className={Styles.sectionButton} />
                <input type='button' value="Аналитка" className={Styles.sectionButton} />
                <input type='button' value="Аудит логов" className={Styles.sectionButton} />
            </div>
        </div>
    </div>)
}
