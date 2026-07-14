import { Link } from 'react-router-dom';

// Sidebar component displays the left navigation menu
// Props:
// - sidebarOpen: boolean to control whether the sidebar is hidden or shown
const Sidebar = ({ sidebarOpen }) => {
	return (
		<section id="sidebar" className={`${sidebarOpen ? 'hide' : ''}`}>
			{/* Brand/logo section */}
			<a href="#" className="brand">
				<img src="images/menu-icons/MENU-LOGO.svg" alt="" />
				<h3>
					Trust Account <br />
					Reconciliation
				</h3>
			</a>

			{/* Sidebar menu items */}
			<ul className="side-menu">
				{/* Active menu item: Manage Firms */}
				<li className="active">
					<Link to="/user-management">
						<img src="images/menu-icons/1.svg" alt="" />
						<span className="text">Manage Firms</span>
					</Link>
				</li>

				{/* Logout menu item triggers a modal */}
				<li>
					<a
						href="#"
						data-bs-toggle="modal"
						data-bs-target="#logout"
						data-dismiss="modal"
					>
						<img src="images/menu-icons/2.svg" alt="" />
						<span className="text">Logout</span>
					</a>
				</li>
			</ul>
		</section>
	)
}

// Export component for use in app layout
export default Sidebar;
