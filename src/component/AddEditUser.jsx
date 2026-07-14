import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { addFirms, getAllFirms, getAllSubscriptions, updateFirm } from "../redux/slices/adminSlice";

// AddEditUser component handles both adding and editing a firm/user
const AddEditUser = ({ editData }) => {
  // Get subscriptions data from Redux store
  const { subscriptions } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  // Local state to track form submission and loading status
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subscriptionOptions, setSubscriptionOptions] = useState([]);

  // Fetch all subscription options on component mount
  useEffect(() => {
    dispatch(getAllSubscriptions());
  }, [dispatch]);

  // Update subscriptionOptions when subscriptions data changes
  useEffect(() => {
    if (subscriptions && subscriptions.length > 0) {
      setSubscriptionOptions(subscriptions)
    }
  }, [subscriptions])

  // Initialize Formik for form handling
  const formik = useFormik({
    initialValues: {
      name: editData?.name || "",                     // Pre-fill name if editing
      email: editData?.email || "",                   // Pre-fill email if editing
      phone: editData?.phone || "",                   // Pre-fill phone if editing
      subscription_type: editData?.subscription_type || "", // Pre-fill subscription if editing
    },
    // Validation schema using Yup
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      subscription_type: Yup.string().required("Subscription type is required"),
    }),
    // Form submission handler
    onSubmit: async (values, { resetForm }) => {
      try {
        if (editData) {
          setLoading(true);
          // Update existing firm
          await dispatch(updateFirm({ id: editData.id, ...values }));
          setLoading(false);
        } else {
          setLoading(true);
          // Add new firm
          await dispatch(addFirms(values));
          setLoading(false);
        }
        // Refresh the list of all firms
        await dispatch(getAllFirms());
        resetForm();
        setIsSubmit(true);

        // Close the modal manually using Bootstrap API
        const modal = document.getElementById('create-newuser-popup');
        if (modal) {
          const bootstrapModal = bootstrap.Modal.getInstance(modal);
          bootstrapModal?.hide();
        }
      } catch (error) {
        console.error("Error submitting:", error);
      }
    },
    enableReinitialize: true, // Allows form to reset when editData changes
  });

  return (
    <div
      className="modal fade"
      id="create-newuser-popup"
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
            <div className="common-form-wrap">
              <form onSubmit={formik.handleSubmit}>
                <div className="common-pop-warp">
                  <h3 className="">{editData ? "Edit" : "Add"}</h3>
                  <div className="creat-new-user-wrap">
                    <div className="col-lg-12">
                      <div className="row">

                        {/* Name input field */}
                        <div className="col-lg-6">
                          <label>
                            <h3>Name</h3>
                            <input
                              type="text"
                              name="name"
                              placeholder="Enter name"
                              value={formik.values.name}
                              onChange={formik.handleChange}
                            />
                            {formik.touched.name && formik.errors.name && (
                              <div className="text-danger">
                                {formik.errors.name}
                              </div>
                            )}
                          </label>
                        </div>

                        {/* Email input field */}
                        <div className="col-lg-6">
                          <label>
                            <h3>Email</h3>
                            <input
                              type="text"
                              name="email"
                              placeholder="Enter Email"
                              value={formik.values.email}
                              onChange={formik.handleChange}
                            />
                            {formik.touched.email && formik.errors.email && (
                              <div className="text-danger">
                                {formik.errors.email}
                              </div>
                            )}
                          </label>
                        </div>

                        {/* Phone input field */}
                        <div className="col-lg-6">
                          <label>
                            <h3>Phone</h3>
                            <input
                              type="text"
                              name="phone"
                              placeholder="Enter Phone"
                              value={formik.values.phone}
                              onChange={formik.handleChange}
                            />
                            {formik.touched.phone && formik.errors.phone && (
                              <div className="text-danger">
                                {formik.errors.phone}
                              </div>
                            )}
                          </label>
                        </div>

                        {/* Subscription Type select field */}
                        <div className="col-lg-6">
                          <label>
                            <h3>Subscription Type</h3>
                            <select
                              name="subscription_type"
                              value={formik.values.subscription_type}
                              onChange={formik.handleChange}
                            >
                              <option value="">Select Subscription</option>
                              {subscriptionOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                  {option.name}
                                </option>
                              ))}
                            </select>
                            {formik.touched.subscription_type && formik.errors.subscription_type && (
                              <div className="text-danger">
                                {formik.errors.subscription_type}
                              </div>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Submit button */}
                    <div className="big-modal-common-btns">
                      <button
                        type="submit"
                        style={{
                          borderRadius: "30px",
                          color: "#fff",
                          textAlign: "center",
                          padding: "10px 43px",
                          backgroundColor: "#000429",
                          fontSize: "15px",
                          width: "auto",
                          fontWeight: 400,
                        }}
                        className="big-modal-common-btns"
                      >
                        {loading ? 'Saving...' : (editData ? "Update" : "Save")}
                      </button>
                    </div>

                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export component for usage in other parts of the app
export default AddEditUser;
