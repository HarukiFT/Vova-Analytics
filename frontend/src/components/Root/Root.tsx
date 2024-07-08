import { Outlet } from 'react-router-dom'
import Auth from '../Auth/Auth'
import Header from '../Header/Header'
import Styles from './Root.module.scss'

export default () => {
    return (
        <div className={Styles.wrapper}>
            <Header/>
            <Outlet/>
        </div>
    )
}