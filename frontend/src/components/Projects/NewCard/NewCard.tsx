import Styles from './NewCard.module.scss'
import {ReactComponent as PlusIcon} from '../../../shared/assets/plus.svg'
import { useModal } from '../../../contexts/ModalContext/ModalContext'
import { ModalEnum } from '../../../contexts/ModalContext/ModalContext.types'

export default () => {
    const modal = useModal()

    const handleClick = () => {
        modal.setModal(ModalEnum.NewProject, null)
    }

    return (
        <div className={Styles.wrapper} onClick={handleClick}>
            <span className={Styles.indicator}><PlusIcon/></span>
            <p className={Styles.placeholder}>Создать новый<br/>проект</p>
        </div>
    )
}