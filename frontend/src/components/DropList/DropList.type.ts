export interface DropListProps {
    choices: string[],
    isActive?: boolean,
    initSelection?: string,
    prefix?: string,

    onChoice: (choice: string) => void 
}