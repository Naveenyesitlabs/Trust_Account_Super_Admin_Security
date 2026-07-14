import { useDispatch } from "react-redux";
import { getAllFirms, updateFirmsAccess } from "../redux/slices/adminSlice";

// AccessModal component receives updateStatus as a prop
const AccessModal = (updateStatus) => {
  const dispatch = useDispatch();

  // Extract the new access status and the id from props
  const newStatus = updateStatus?.updateStatus?.access_status;
  const id = updateStatus?.updateStatus?.id;

  // Function to handle the update of access status
  const handlleUpdateStatus = async () => {
    // Dispatch the updateFirmsAccess action with id and new access_status
    await dispatch(updateFirmsAccess({ id: id, access_status: newStatus }));
    // Refresh the list of all firms after updating access
    await dispatch(getAllFirms());
  };

  return (
    <div
      className="modal fade"
      id="suspend-popup"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
    >
      <div className="modal-dialog big-modal-common" role="document">
        <div className="modal-content clearfix">
          {/* Modal header with close button */}
          <div className="modal-heading">
            <button
              type="button"
              className="close close-btn-front"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <img src="images/menu-icons/close-popup-icon.svg" alt="" />
            </button>
          </div>

          {/* Modal body */}
          <div className="modal-body">
            <div className="logout-pop-wrap">
              <form>
                {/* Image showing the action (grant or deny) */}
                <div className="logout-img-wrap">
                  <img
                    src={
                      newStatus == "granted"
                        ? "images/menu-icons/actiavte-popup-icon.svg"
                        : "images/menu-icons/suspend-opup-icon.svg"
                    }
                    alt=""
                  />
                </div>

                {/* Confirmation text */}
                <p>
                  Are you sure you want to
                  <br />
                  {newStatus == "granted" ? "grant" : "denied"} access to the
                  user?
                </p>

                {/* Action buttons */}
                <div className="all-commonbtns-popup">
                  {/* Cancel button just closes the modal */}
                  <a href="#" data-bs-dismiss="modal" aria-label="Close">
                    Cancel
                  </a>

                  {/* Yes button triggers the update function and closes modal */}
                  <a
                    href="#"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => handlleUpdateStatus()}
                  >
                    Yes
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporting component for usage in other parts of the app
export default AccessModal;
