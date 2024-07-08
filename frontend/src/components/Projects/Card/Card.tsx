import Styles from './Card.module.scss'
import {ReactComponent as EditIcon} from '../../../shared/assets/edit.svg'
import {ReactComponent as TrashIcon} from '../../../shared/assets/trash.svg'
import {ReactComponent as LinkIcon} from '../../../shared/assets/link.svg'

export default () => {
    return (
        <div className={Styles.wrapper}>
            <div className={Styles.topper}>
                <p className={Styles.cardType}>ПРОЕКТ</p>
                <p className={Styles.projectName}>Dirol</p>
            </div>

            <div className={Styles.footer}>
                <span className={Styles.accentButton}>
                    <LinkIcon />
                </span>

                <span className={Styles.regularButton}>
                    <EditIcon/>
                </span>
                
                <span className={Styles.regularButton}>
                    <TrashIcon/>
                </span>
            </div>
        </div>
    )
}