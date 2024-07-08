import { createContext, useContext, useState } from "react";
import { ModalContextType } from "./ModalContext.types";

const ModalContext = createContext<ModalContextType>({
    setModal: () => { },
    isOpen: false,
    closeModal: () => { }
})

const ModalContextProvider = ({ children }: { children: JSX.Element[] }) => {
    const [isOpen, setOpen] = useState<boolean>(false)

    const setModal = () => {
        
    }

    const closeModal = () => {
        setOpen(false)
    }

    const payload = {isOpen, setModal, closeModal}

    return (<ModalContext.Provider value={payload}>{children}</ModalContext.Provider>)
}

const useModal = () => {
    const context = useContext(ModalContext)

    return context
}

export {ModalContextProvider, useModal}