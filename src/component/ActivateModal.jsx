import { useDispatch } from 'react-redux';
import { getAllFirms, updateSuspendStatus } from '../redux/slices/adminSlice';

// ActivateModal component receives updateStatus as a prop
const ActivateModal = (updateStatus) => {
    const dispatch = useDispatch();

    // Function to handle updating the suspend/activate status
    const handlleUpdateStatus = async () => {
        // Destructure id and current status from the prop
        const { id, status } = updateStatus.updateStatus

        // Determine the new status: if current is active, set to inactive, else active
        const newStatus = status === "active" ? "inactive" : "active";

        // Dispatch action to update suspend_status in the backend
        await dispatch(updateSuspendStatus({ id: id, suspend_status: newStatus }));

        // Refresh the list of all firms after updating status
        await dispatch(getAllFirms())
    }

    return (
        <div className="modal fade" id="actiavte-popup" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
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
                                {/* Icon indicating activation */}
                                <div className="logout-img-wrap">
                                    <img src="images/menu-icons/actiavte-popup-icon.svg" alt="" />
                                </div>

                                {/* Confirmation text */}
                                <p>Are you sure you want to <br />
                                    Activate User ?</p>

                                {/* Action buttons */}
                                <div className="all-commonbtns-popup">
                                    {/* Cancel button: just closes modal */}
                                    <a href="#" data-bs-dismiss="modal" aria-label="Close">Cancel</a>

                                    {/* Yes button: triggers status update and closes modal */}
                                    <a href="#" data-bs-dismiss="modal" aria-label="Close" onClick={handlleUpdateStatus}>Yes</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Exporting the modal component for usage elsewhere
export default ActivateModal
