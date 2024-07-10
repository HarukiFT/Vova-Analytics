import Styles from './Card.module.scss'
import {ReactComponent as EditIcon} from '../../../shared/assets/edit.svg'
import {ReactComponent as TrashIcon} from '../../../shared/assets/trash.svg'
import {ReactComponent as LinkIcon} from '../../../shared/assets/link.svg'
import Tooltip from '../../Tooltip/Tooltip'
import { ProjectData } from '../../../shared/typings/project.type'
import { Link } from 'react-router-dom'

export default (props: ProjectData) => {
    return (
        <div className={Styles.wrapper}>
            <div className={Styles.topper}>
                <p className={Styles.cardType}>ПРОЕКТ</p>
                <p className={Styles.projectName}>{props.name}</p>
            </div>

            <div className={Styles.footer}>
                <Tooltip side='top' tooltip='Открыть проект'>
                    <span className={Styles.accentButton}>
                        <LinkIcon />
                    </span>
                </Tooltip>

                <Tooltip side='top' tooltip='Открыть меню редактирования проекта'>
                    <Link to={`/project/${props._id}#general`} className={Styles.regularButton}>
                        <EditIcon/>
                    </Link>
                </Tooltip>
                
                <Tooltip side='top' tooltip='Удалить проект'>
                    <span className={Styles.regularButton}>
                        <TrashIcon/>
                    </span>
                </Tooltip>
            </div>
        </div>
    )
}