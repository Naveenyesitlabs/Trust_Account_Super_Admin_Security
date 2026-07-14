import { useEffect } from 'react';
import { Badge, Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getAllNotification, markAsRead } from '../redux/slices/adminSlice';

// Helper function to calculate relative time (time ago) from a date
const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000); // Difference in seconds
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };
    for (const key in intervals) {
        const value = Math.floor(seconds / intervals[key]);
        if (value > 0) return `${value} ${key}${value > 1 ? 's' : ''} ago`; // Return formatted string
    }
    return 'just now'; // Default if less than a second
};

// NotificationModal component displays detailed information of a single notification
// Props:
// - show: boolean to control modal visibility
// - handleClose: function to close modal
// - notification: notification object containing title, message, created_at, is_read, etc.
const NotificationModal = ({ show, handleClose, notification }) => {
    const dispatch = useDispatch();

    // Effect to mark notification as read if it is not already read
    useEffect(() => {
        if (!notification) return; // Exit if no notification
        if (notification.is_read) {
            // Dispatch Redux actions to mark notification as read and refresh notifications list
            dispatch(markAsRead({ notification_id: notification.id }));
            dispatch(getAllNotification());
        }
    }, [notification]); // Runs whenever notification changes

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {notification?.title} {/* Display notification title */}
                    {notification?.is_read && <Badge bg="primary" className="ms-2">New</Badge>} {/* Show badge if new */}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{notification?.message}</p> {/* Display notification message */}
                <small className="text-muted">{timeAgo(notification?.created_at)}</small> {/* Display relative time */}
            </Modal.Body>
            <Modal.Footer>
                {/* Close button */}
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

// Export component for use in Navbar or other parts of the app
export default NotificationModal;
