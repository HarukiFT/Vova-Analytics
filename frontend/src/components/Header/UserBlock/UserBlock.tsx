import { Link } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext/AuthContext"
import Styles from "./UserBlock.module.scss"

export default () => {
    const auth = useAuth()

    return (
        <div className={Styles.wrapper}>
            <Link to="/profile" className={Styles.username}>{auth.userData?.username ?? 'Загрузка'}</Link>
            <div className={Styles.avatar}>
                <span>{auth.userData?.username[0] ?? "?"}</span>
            </div>
        </div>
    )
}