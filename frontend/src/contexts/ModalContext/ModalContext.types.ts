export enum ModalEnum {
    NewProject
}

export type ModalData = {
    type: ModalEnum
    key: number,
    data?: any
}

export type ModalContextType = {
    isOpen: boolean
    modalData?: ModalData

    setModal(type: ModalEnum, data: any): void
    closeModal(full: boolean): void
}