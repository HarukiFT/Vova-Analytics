import { useModal } from "../../contexts/ModalContext/ModalContext"
import { ModalEnum } from "../../contexts/ModalContext/ModalContext.types"
import NewProjectModal from "./NewProjectModal/NewProjectModal"

export default () => {
    const modal = useModal()

    let component
    switch (modal.modalData?.type) {
        case ModalEnum.NewProject:
            component = <NewProjectModal key={modal.modalData.key}/>
            break
    }

    return (
        <>
            {component}
        </>
    )
}