import { Link } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext/AuthContext"
import Styles from "./UserBlock.module.scss"
import Tooltip from "../../Tooltip/Tooltip"

export default () => {
    const auth = useAuth()

    return (
        <div className={Styles.wrapper}>
            <Tooltip side="bottom" tooltip="Открыть профиль">
                <Link to="/profile" className={Styles.username}>{auth.userData?.username ?? 'Загрузка'}</Link>
            </Tooltip>
            <div className={Styles.avatar}>
                <span>{auth.userData?.username[0] ?? "?"}</span>
            </div>
        </div>
    )
}