import { useNavigate } from 'react-router-dom';
import { clearAuthSession } from '../utils/authStorage';

// LogoutModal component displays a confirmation modal for logging out
const LogoutModal = () => {
    const navigate = useNavigate(); // React Router hook to programmatically navigate

    // Function to handle logout
    const handleLogout = () => {
        clearAuthSession();
        // Navigate back to the login or home page
        navigate("/")
    }

    return (
        <div className="modal fade" id="logout" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog big-modal-common" role="document">
                <div className="modal-content clearfix">
                    {/* Modal header with close button */}
                    <div className="modal-heading">
                        <button type="button" className="close close-btn-front" data-bs-dismiss="modal" aria-label="Close">
                            <img src="images/menu-icons/close-popup-icon.svg" alt="" />
                        </button>
                    </div>

                    {/* Modal body */}
                    <div className="modal-body">
                        <div className="logout-pop-wrap">
                            <form>
                                {/* Icon indicating logout */}
                                <div className="logout-img-wrap">
                                    <img src="images/menu-icons/logout-icon.svg" alt="" />
                                </div>

                                {/* Confirmation message */}
                                <p>Are you sure you want to logout?</p>

                                {/* Action buttons */}
                                <div className="all-commonbtns-popup">
                                    {/* Yes button: triggers logout */}
                                    <a
                                        style={{ cursor: "pointer", color: "white" }}
                                        onClick={handleLogout}
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        Yes
                                    </a>

                                    {/* Cancel button: closes modal without logging out */}
                                    <a
                                        style={{ cursor: "pointer", color: "white" }}
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        Cancel
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Export component for usage wherever logout modal is required
export default LogoutModal;
