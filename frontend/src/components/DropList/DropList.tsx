import { createRef, useEffect, useState } from "react";
import { DropListProps } from "./DropList.type";
import Styles from './DropList.module.scss'
import ArrowIcon from '../../shared/assets/list-arrow.svg'
import { useSpring, animated } from "react-spring";

export default ({ choices, isActive, initSelection, prefix, onChoice }: DropListProps) => {
    const [isOpen, setOpen] = useState<boolean>(false)
    const [selected, setSelected] = useState<string>()

    const choicesRef = createRef<HTMLDivElement>()

    const [choicesSpring, setChoicesSpring] = useSpring(() => ({
        from: {
            height: '0px'
        },

        to: {
            height: '0px'
        },
    }))

    useEffect(() => {
        setSelected(initSelection)
    }, [initSelection])

    const arrowSpring = useSpring({
        to: {
            transform: `rotate(${isOpen ? 0 : 180}deg)`
        }
    })

    useEffect(() => {
        if (!choicesRef.current) return;

        const childs = choicesRef.current.children
        if (childs.length == 0) return;
        const height = childs[0].clientHeight

        setChoicesSpring({
            to: {
                height: (isOpen && (isActive ?? true))  ? `${height * 4}px` : '0px'
            }
        })
    }, [choicesRef])

    const handleClick = () => {
        if (isActive ?? true) {
            setOpen(!isOpen)
        }
    }

    const handleSelect = (value: string) => {
        setSelected(value)
        setOpen(false)

        onChoice(value)
    }

    return (
        <div className={Styles.list}>
            <div className={Styles.main} onClick={handleClick}>
                <span className={Styles.selected}>{`${prefix}${selected ?? ''}`} </span>
                <animated.img style={arrowSpring} src={ArrowIcon} className={Styles.arrow}/>
            </div>

            <animated.div ref={choicesRef} style={{...choicesSpring}} className={Styles.choices}>
                {choices.map(choice => {
                    return <span onClick={() => {handleSelect(choice)}} key={choice}>{choice}</span>
                })}
            </animated.div>
        </div>
    )
}