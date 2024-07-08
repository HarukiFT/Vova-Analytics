enum ModalEnum {
    NewProject
}

export type ModalContextType = {
    isOpen: boolean

    setModal(type: ModalEnum, data: any): void
    closeModal(): void
}