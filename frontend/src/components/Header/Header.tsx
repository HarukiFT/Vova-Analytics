import { Link, useLocation, useNavigation } from 'react-router-dom'
import Styles from './Header.module.scss'
import { useAuth } from '../../contexts/AuthContext/AuthContext'
import UserBlock from './UserBlock/UserBlock'
import Tooltip from '../Tooltip/Tooltip'

export default () => {
    const auth = useAuth()
    const location = useLocation()

    return (
        <div className={Styles.wrapper}>
            <div className={Styles.sideWrapper}>
                <a className={Styles.logo}>Metrologist</a>
                <Link to="projects" className={location.pathname == '/projects' ? Styles.selected : ''}>Проекты</Link>
            </div>

            <div className={Styles.sideWrapper}>
                {auth.token ? <UserBlock/> : <Link to="/login" className={Styles.loginHref}>Войти</Link>}
            </div>
        </div>
    )
}