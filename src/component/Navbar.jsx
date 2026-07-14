import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotification } from '../redux/slices/adminSlice';
import NotificationModal from './NotificationModal';

// Navbar component displays the top navigation bar with sidebar toggle, notifications, and admin icon
const Navbar = ({ setSidebarOpen, sidebarOpen }) => {
	const dispatch = useDispatch();

	// Get notifications from Redux store
	const { notification } = useSelector((state) => state.admin);

	// Local state
	const [onNotification, setOnNotification] = useState(true); // Toggle for showing notifications
	const [allNotification, setAllNotification] = useState([]); // Stores all notifications
	const [openNotification, setOpenNotification] = useState(false); // Controls dropdown visibility
	const [notificationData, setNotificationData] = useState(false); // Selected notification details
	const [openNotificationModal, setOpenNotificationModal] = useState(false); // Controls modal visibility

	// Fetch all notifications on component mount
	useEffect(() => {
		dispatch(getAllNotification());
	}, []);

	// Update local state when notifications change in Redux
	useEffect(() => {
		notification ? setAllNotification(notification) : '';
	}, [notification]);

	// Helper function to calculate "time ago" for notifications
	const handleDateAgo = (dateString) => {
		const now = new Date();
		const date = new Date(dateString);

		const diffMs = now - date;

		const seconds = Math.floor(diffMs / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);

		let timeAgo = "";
		if (days > 0) {
			timeAgo = `${days} day${days > 1 ? "s" : ""} ago`;
		} else if (hours > 0) {
			timeAgo = `${hours} hour${hours > 1 ? "s" : ""} ago`;
		} else if (minutes > 0) {
			timeAgo = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
		} else {
			timeAgo = "Just now";
		}

		// Format exact time for display alongside "time ago"
		const formattedTime = new Intl.DateTimeFormat('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true
		}).format(date);

		return `${timeAgo} ${formattedTime}`;
	};

	// Handle clicking a notification: open modal with details
	const markAsReadFunction = async (notificationDaitles) => {
		setNotificationData(notificationDaitles); // Set selected notification data
		setOpenNotificationModal(true); // Open modal
	};

	return (
		<>
			<nav>
				{/* Sidebar toggle button */}
				<i className='bx bx-menu' onClick={() => setSidebarOpen(!sidebarOpen)}>
					<img src="images/menu-icons/hamburger.svg" alt="" />
				</i>

				{/* Notification dropdown */}
				<div className="notification-in">
					{/* Notification bell icon */}
					<button type="button" onClick={() => setOpenNotification(!openNotification)}>
						<img src="images/menu-icons/notification.svg" alt="" />
					</button>

					{/* Notification list dropdown */}
					<div className="notification-list" style={{
						display: openNotification ? 'block' : 'none',
						opacity: openNotification ? 1 : 0,
						overflow: 'hidden',
						transition: 'all 1.5s ease-in-out'
					}}>
						{/* Header with toggle switch */}
						<div className="notification-heading">
							<h1>Notifications</h1>
							<label className="switch">
								<input
									type="checkbox"
									defaultChecked={true}
									onClick={(e) => {
										setOnNotification(e.target.checked);
									}}
								/>
								<span className="slider round"></span>
							</label>
						</div>

						{/* Notification items */}
						{
							onNotification ? (
								<div className="notification-list-inner">
									{
										allNotification?.length > 0 ? (
											allNotification?.map((item, index) => (
												<div
													className="notification-list-item"
													key={item?.id || index}
													onClick={() => markAsReadFunction(item)}
													style={{ cursor: 'pointer' }}
												>
													<div className="notification-list-item-text">
														{/* Truncate message and title for display */}
														<p>{item?.message?.length > 30 ? item?.message?.slice(0, 30) + "..." : item?.message}, {item?.title?.length > 15 ? item?.title?.slice(0, 15) + "..." : item?.title} </p>
														{/* Display time ago */}
														<span>{handleDateAgo(item?.created_at)}</span>
														{/* Show mark as read button if already read */}
														{
															item?.is_read ? (
																<button type='submit' className='btn ' style={{ color: 'ButtonHighlight' }} >
																	Mark as read
																</button>
															) : ''
														}
													</div>
												</div>
											))
										) : (
											// Show message when notifications are turned off
											<div className="notification-list-item"
												style={{
													padding: '1rem',
													minHeight: '60px',
													borderBottom: '1px solid #ddd',
													display: 'flex',
													alignItems: 'center'
												}}>
												<div className="notification-list-item-text">
													<p>Notifications are currently turned off</p>
													<span></span>
												</div>
											</div>
										)
									}
								</div>
							) : (
								// Show message when notifications are off globally
								<div className="notification-list-item"
									style={{
										padding: '1rem',
										minHeight: '60px',
										borderBottom: '1px solid #ddd',
										display: 'flex',
										alignItems: 'center'
									}}>
									<div className="notification-list-item-text">
										<p>There are no new notifications</p>
										<span></span>
									</div>
								</div>
							)
						}
					</div>
				</div>

				{/* Admin avatar/icon */}
				<div className="admin-icon">
					<img src="images/menu-icons/admin.png" alt="" />
				</div>
			</nav>

			{/* Notification modal for detailed view */}
			{
				notificationData && <NotificationModal
					show={openNotificationModal}
					handleClose={() => setOpenNotificationModal(false)}
					notification={notificationData}
				/>
			}

		</>
	)
}

// Export Navbar for usage in the app layout
export default Navbar;
