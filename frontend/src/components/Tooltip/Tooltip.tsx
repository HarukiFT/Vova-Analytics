import React, { createRef, useEffect, useState } from "react";
import { TooltipProps } from "./Tooltip.type";
import { animated, useSpring } from "react-spring";
import Styles from './Tooltip.module.scss'

export default ({ children, tooltip, side }: TooltipProps) => {
    const holderRef = createRef<HTMLBaseElement>()
    const tooltipRef = createRef<HTMLDivElement>()

    const [isEnabled, setEnabled] = useState<boolean>(false)

    const [tooltipSpring, setTooltipSpring] = useSpring(() => ({
        from: { opacity: 0 },
        to: {  }
    }))

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (holderRef.current) {
                const rect = holderRef.current.getBoundingClientRect();

                const isInside = (
                    event.clientX >= rect.left &&
                    event.clientX <= rect.right &&
                    event.clientY >= rect.top &&
                    event.clientY <= rect.bottom
                );

                if (isEnabled !== isInside) {
                    setEnabled(isInside)
                }
            }
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isEnabled, holderRef]);

    useEffect(() => {
        if (tooltipRef.current) {
            const fromData = {
                [side === 'bottom' ? 'bottom' : 'top']: `-${tooltipRef.current.offsetHeight + 50}px`,
                left: '50%',
                transform: 'translateX(-50%)',
                opacity: 0
            }

            const toData = {
                [side === 'bottom' ? 'bottom' : 'top']: `-${tooltipRef.current.offsetHeight + 20}px`,
                opacity: 1
            }
    
            setTooltipSpring({
                to: isEnabled ? toData : fromData
            })
        }
    }, [tooltipRef, isEnabled])

    return (
        <>
            {
                React.cloneElement(children, {
                    ref: holderRef, style: { zIndex: 3, position: 'relative', ...children.props.style },
                    children: (<>
                        {children.props.children}
                        <animated.div ref={tooltipRef} className={side === 'top' ? Styles.tooltipTop : Styles.tooltipBottom} style={tooltipSpring}>
                            <span>{tooltip}</span>
                        </animated.div>
                    </>
                    )
                })
            }
        </>
    )
}