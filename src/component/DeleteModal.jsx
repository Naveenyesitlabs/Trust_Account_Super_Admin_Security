import { useDispatch } from 'react-redux';
import { deleteFirm, getAllFirms } from '../redux/slices/adminSlice';

// DeleteModal component shows a confirmation modal for deleting a firm/user
// It expects deletedId as a prop to identify which firm to delete
const DeleteModal = ({ deletedId }) => {
    const dispatch = useDispatch();

    // Handler function to delete the firm and refresh the list
    const deleteHandler = async () => {
        // Dispatch Redux action to delete the firm with the given id
        await dispatch(deleteFirm(deletedId));
        // Refresh the list of all firms after deletion
        await dispatch(getAllFirms());
    }

    return (
        <div className="modal fade" id="delete-popup" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
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
                                {/* Icon showing deletion */}
                                <div className="logout-img-wrap">
                                    <img src="images/menu-icons/delete-popup-icon.svg" alt="" />
                                </div>

                                {/* Confirmation message */}
                                <p>Are you sure you want to Delete?</p>

                                {/* Action buttons */}
                                <div className="all-commonbtns-popup">
                                    {/* Cancel button: closes modal without any action */}
                                    <a href="#" data-bs-dismiss="modal" aria-label="Close">Cancel</a>

                                    {/* Delete button: triggers deletion and closes modal */}
                                    <a href="#" data-bs-dismiss="modal" aria-label="Close" onClick={deleteHandler}>Delete</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Export component for usage in other parts of the app
export default DeleteModal;
