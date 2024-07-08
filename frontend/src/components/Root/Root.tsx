import { Outlet } from 'react-router-dom'
import Auth from '../Auth/Auth'
import Header from '../Header/Header'
import Styles from './Root.module.scss'
import { useModal } from '../../contexts/ModalContext/ModalContext'

export default () => {
    const modal = useModal()

    return (
        <div className={`${Styles.wrapper} ${modal.isOpen ? Styles.blured : ''}`}>
            <Header/>
            <Outlet/>
        </div>
    )
}