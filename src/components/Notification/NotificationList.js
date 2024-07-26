import React, { useEffect, useState } from "react";
import { getNotifications } from '../../services/notificationService';

const NotificationList = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const notificationsList = await getNotifications();
            setNotifications(notificationsList);
        };

        fetchNotifications();
    }, []);

    return( 
        <div className="notification-list"> 
             <h1>Notifcations</h1>
             <ul>
                 {notifications.map((notification) => (
                    <li key={notifications.id}> 
                       <p>{notification.message}</p>
                    </li>
                 ))}
             </ul>
        </div>
    );
};

export default NotificationList;