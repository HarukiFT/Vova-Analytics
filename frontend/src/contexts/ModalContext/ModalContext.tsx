import { createContext, useContext, useState } from "react";
import { ModalContextType, ModalData, ModalEnum } from "./ModalContext.types";

const ModalContext = createContext<ModalContextType>({
    setModal: () => { },
    isOpen: false,
    closeModal: () => { }
})

const ModalContextProvider = ({ children }: { children: JSX.Element[] }) => {
    const [isOpen, setOpen] = useState<boolean>(false)
    const [modalData, setModalData] = useState<ModalData>()

    const setModal = (type: ModalEnum, data: any) => {
        if (modalData) return;
        setModalData({type, key: Date.now(), data})
        setOpen(true)
    }

    const closeModal = (full: boolean) => {
        if (!full) {
            setOpen(false)
        } else {
            setOpen(false)
            setModalData(undefined)
        }
    }

    const payload = {isOpen, modalData, setModal, closeModal}

    return (<ModalContext.Provider value={payload}>{[...children, ]}</ModalContext.Provider>)
}

const useModal = () => {
    const context = useContext(ModalContext)

    return context
}

export {ModalContextProvider, useModal}