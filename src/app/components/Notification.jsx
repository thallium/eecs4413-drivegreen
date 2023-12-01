import { useState, useEffect } from 'react'
import { InformationCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";



export default function Notification({ type, message, dispatch, id }) {
    const [exit, setExit] = useState(false);
    const [intervalID, setIntervalID] = useState(null);

    const handleCloseNotification = () => {
        // handlePauseTimer();
        setExit(true);
        setTimeout(() => {
            dispatch({
                type: "REMOVE_NOTIFICATION",
                id: id
            })
        }, 300)
    };

    const handleStartTimer = () => {
        const id = setInterval(() => {
            handleCloseNotification();
        }, 3000);

        setIntervalID(id);
    };

    useEffect(() => {
        handleStartTimer();
    }, []);

    return (
        type === "INFO" ?
            <div role='alert' className="alert my-2`" >
                <InformationCircleIcon className="h-6 w-6" />
                <div>{message}</div>
            </div>
            :
            <div role='alert' className="alert alert-error my-2 transition-opacity duration-300" >
                <ExclamationCircleIcon className="h-6 w-6" />
                <div>{message}</div>
            </div>
    );
}
