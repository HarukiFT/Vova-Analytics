import { Link } from 'react-router-dom'
import Styles from './Header.module.scss'
import { useAuth } from '../../contexts/AuthContext/AuthContext'
import UserBlock from './UserBlock/UserBlock'

export default () => {
    const auth = useAuth()

    return (
        <div className={Styles.wrapper}>
            <div className={Styles.sideWrapper}>
                <a className={Styles.logo}>Metrologist</a>
                <a>Проекты</a>
            </div>

            <div className={Styles.sideWrapper}>
                {auth.token ? <UserBlock/> : <Link to="/login" className={Styles.loginHref}>Войти</Link>}
            </div>
        </div>
    )
}