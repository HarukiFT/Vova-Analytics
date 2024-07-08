import Styles from './NewCard.module.scss'
import {ReactComponent as PlusIcon} from '../../../shared/assets/plus.svg'

export default () => {
    return (
        <div className={Styles.wrapper}>
            <span className={Styles.indicator}><PlusIcon/></span>
            <p className={Styles.placeholder}>Создать новый<br/>проект</p>
        </div>
    )
}