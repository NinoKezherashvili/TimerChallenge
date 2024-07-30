import { useState, useRef } from "react"
import ResultModal from "./ResultModal"

const TimerChallenge = ({ title, targetTime }) => {


    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000)
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000
    const dialog = useRef()
    const timer = useRef()
    const handleStop = () => {
        dialog.current.open()
        clearInterval(timer.current)
    }

    if (timeRemaining <= 0) {
        handleStop()

        dialog.current.open()
    }

    const handleStart = () => {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10)
        }, 10)
        setTimerStarted(true)
    }

    const handleReset = () => {
        setTimeRemaining(targetTime * 1000)
    }

    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime}
                remainingTime={timeRemaining} onReset={handleReset} />

            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop Challenge' : 'Start Challenge'}

                    </button>

                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Time is running...' : 'Timer inactive'}
                </p>
            </section>

        </>

    )
}


export default TimerChallenge