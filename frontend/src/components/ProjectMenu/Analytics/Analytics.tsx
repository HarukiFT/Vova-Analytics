import { useEffect, useState } from 'react'
import DropList from '../../DropList/DropList'
import Styles from './Analytics.module.scss'
import { AxiosInstance } from '../../../shared/services/axiosInstance'
import { CandleData, CandleProp, ProjectAnalyticsProp } from './Analytics.type'
import { toast } from 'react-toastify'
import { ReactComponent as CalendarIcon } from '../../../shared/assets/calendar.svg'
import '../../../shared/styles/date-picker.scss'
import DatePicker, { registerLocale } from 'react-datepicker'
import { ru } from 'date-fns/locale';
import { useSpring, animated } from 'react-spring'

registerLocale('ru', ru);

const Candle = ({timestamp, value, height}: CandleProp) => {
    const [isHover, setHover] = useState<boolean>(false)

    const candleSpring = useSpring({
        from: {
            flexGrow: 0,
            backgroundColor: '#CEFF00'
        },

        to: {
            flexGrow: height,
            backgroundColor: isHover ? '#e5ff7f' : '#CEFF00'
        }
    })

    const infoSpring = useSpring({
        from: {
            opacity: 0
        },

        to: {
            opacity: isHover ? 1 : 0
        }
    })

    return (
        <div className={Styles.metricHolder}>
            <animated.div className={Styles.candle} style={candleSpring}>
                <animated.div className={Styles.info} style={infoSpring}>
                    <span className={Styles.date}>{`${timestamp.getDate().toString().padStart(2, '0')}.${(timestamp.getMonth() + 1).toString().padStart(2, '0')}`}</span>
                    <p className={Styles.count}>{value}</p>
                </animated.div>
            </animated.div>
            <span className={Styles.timestamp}>{`${timestamp.getDate().toString().padStart(2, '0')}.${(timestamp.getMonth() + 1).toString().padStart(2, '0')}`}</span>
            <div style={{zIndex: 1000, width: '100%', height: '50%', position: 'absolute', bottom: 0, left: 0}} onMouseEnter={() => { setHover(true) }} onMouseLeave={() => { setHover(false) }}/>
        </div>
    )
}

export default ({ projectData }: ProjectAnalyticsProp) => {
    const [metrics, setMetrics] = useState<string[]>()

    const [value, setValue] = useState<string>()
    const [startDate, setStartDate] = useState<Date | undefined>(new Date());
    const [endDate, setEndDate] = useState<Date | undefined>(new Date())
    const [graphData, setGraphData] = useState<CandleData[]>([])

    const maxValue = Math.max(...graphData.map(candle => (candle.count)))
    const minValue = Math.min(...graphData.map(candle => (candle.count)))


    const total = graphData.reduce((acc: number, val: CandleData) => acc + val.count, 0);
    const maxHeight = 1;

    const candleHeight = (value: number) => {
        const normValue = value / total;
        return normValue * maxHeight;
    };

    useEffect(() => {
        if (startDate && endDate && value) {
            AxiosInstance.post('/metrics/byday', {
                from: startDate.toISOString(),
                to: endDate.toISOString(),
                value
            }, {
                headers: {
                    'project-id': projectData?._id
                }
            }).then((response) => {
                console.log(response.data)
                setGraphData(response.data)
            }).catch((err) => {
                toast.error('Ошибка')
            })
        }
    }, [startDate, endDate, value])

    useEffect(() => {
        AxiosInstance.get('/metrics/values', {
            headers: {
                'project-id': projectData?._id
            }
        } as any).then(response => {
            setMetrics(response.data)
            console.log(response.data)
        }).catch((err) => {
            toast.error('Ошибка')
        })
    }, [])

    return (
        <div className={Styles.wrapper}>
            <div className={Styles.actionBar}>
                <DropList choices={metrics ?? []} prefix='Метрика: ' onChoice={(choice) => { setValue(choice) }} isActive={true} />
                <div className={Styles.dateDiv}>
                    <CalendarIcon className={Styles.calendarIcon} />
                    <DatePicker
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(dates) => {
                            const [start, end] = dates;
                            setStartDate(start ?? undefined);
                            setEndDate(end ?? undefined);
                        }}
                        selectsRange
                        calendarClassName={'datepicker'} locale="ru"
                        dateFormat="dd.MM" />
                </div>
            </div>

            <div className={Styles.metricsWrapper}>
                {graphData.map((candleData) => {
                    console.log(candleData)
                    return (<Candle key={`${value}${candleData.date}${startDate}${endDate}`} height={candleHeight(candleData.count)} timestamp={new Date(candleData.date)} value={candleData.count}/>)
                })}
            </div>
        </div>
    )
}