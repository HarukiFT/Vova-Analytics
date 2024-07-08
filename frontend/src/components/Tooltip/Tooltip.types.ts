import { ReactElement } from "react";

export interface TooltipProps {
    children: ReactElement

    tooltip: string
    side: 'top' | 'bottom'
}