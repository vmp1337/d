import { useState, useRef } from 'react';

const useNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const deleteTimer = useRef(null);

    const handleShowNotification = (message, achImg) => {
        setNotifications(prev => [...prev, {id: Date.now(), message: message, achImg: achImg}]);
        
        // dell
        clearTimeout(deleteTimer.current); // clear timer
        deleteTimer.current = setTimeout(() => {
            setNotifications(prev => prev.slice(1));
        }, 2000);
    };

    return { notifications, handleShowNotification };
};

export default useNotifications;