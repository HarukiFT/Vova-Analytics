import { Outlet } from 'react-router-dom'
import Auth from '../Auth/Auth'
import Header from '../Header/Header'
import Styles from './Root.module.scss'
import { useModal } from '../../contexts/ModalContext/ModalContext'
import ModalContainer from '../Modals/ModalContainer'
import { useSpring, animated } from 'react-spring'

export default () => {
    const modal = useModal()

    const blurSpring = useSpring({
        from: {
            filter: 'blur(0px)'
        },

        to: {
            filter: modal.isOpen ? 'blur(5px)' : 'blur(0px)'
        }
    })

    return (
        <>
            <animated.div style={blurSpring} className={`${Styles.wrapper}`}>
                <Header />
                <Outlet />
            </animated.div>

            <ModalContainer />
        </>
    )
}