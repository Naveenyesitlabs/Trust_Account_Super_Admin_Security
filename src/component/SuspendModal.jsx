import { useDispatch } from 'react-redux'
import { getAllFirms, updateSuspendStatus } from '../redux/slices/adminSlice'

// SuspendModal component displays a confirmation modal to suspend/unsuspend a user
// Props:
// - updateStatus: object containing the current user status and id (updateStatus.updateStatus)
const SuspendModal = (updateStatus) => {
    const dispatch = useDispatch()

    // Function to handle the suspend/unsuspend action
    const handlleUpdateStatus = async () => {
        // Destructure id and current status from props
        const { id, status } = updateStatus.updateStatus
        // Toggle status: active -> inactive, inactive -> active
        const newStatus = status === "active" ? "inactive" : "active";
        // Dispatch Redux actions to update status and refresh the firm list
        await dispatch(updateSuspendStatus({ id: id, suspend_status: newStatus }));
        await dispatch(getAllFirms())
    }

    return (
        <div className="modal fade" id="suspend-popup" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog big-modal-common" role="document">
                <div className="modal-content clearfix">
                    <div className="modal-heading">
                        {/* Close button */}
                        <button type="button" className="close close-btn-front" data-bs-dismiss="modal" aria-label="Close">
                            <img src="images/menu-icons/close-popup-icon.svg" alt="" />
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="logout-pop-wrap">
                            <form>
                                {/* Icon indicating suspend action */}
                                <div className="logout-img-wrap">
                                    <img src="images/menu-icons/suspend-opup-icon.svg" alt="" />
                                </div>
                                {/* Confirmation message */}
                                <p>Are you sure you want to<br /> suspend user?</p>
                                <div className="all-commonbtns-popup">
                                    {/* Cancel button closes modal */}
                                    <a href="#" data-bs-dismiss="modal" aria-label="Close">Cancel</a>
                                    {/* Yes button triggers suspend action and closes modal */}
                                    <a href="#" data-bs-dismiss="modal" aria-label="Close" onClick={() => handlleUpdateStatus()}>Yes</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Export component for use in the user management UI
export default SuspendModal
