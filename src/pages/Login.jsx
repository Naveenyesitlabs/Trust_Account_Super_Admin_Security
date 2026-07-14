import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { login } from '../redux/slices/adminSlice';

const Login = () => {
  const dispatch = useDispatch();
  const { admin, loading } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (admin?.role === "superadmin") {
      setShowModal(true);
    }
  }, [admin]);

  const initialValues = { email: '', password: '' };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const handleSubmit = (values) => {
    dispatch(login({ email: values.email, password: values.password, rememberMe: false }));
  };

  return (
    <>
      <div className="login-wrap">
        <div className="login-in">
          <div className="login-logo">
            <div className="logo">
              <img src="images/login-page/logo.svg" alt="Logo" />
            </div>
            <h1>Super Admin Login</h1>
          </div>

          <div className="login-form">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form className="animate__animated animate__bounceIn">
                  <h1>Super Admin Login</h1>
                  <hr />

                  <label className="login-lbl">
                    <img src="images/login-page/icons/email.svg" alt="Email Icon" />
                    <Field
                      id="login-email"
                      type="email"
                      name="email"
                      className="login-txt"
                      placeholder="Enter your Email here"
                      autoComplete="off"
                    />
                  </label>
                  <ErrorMessage name="email" component="span" style={{ color: "red", fontSize: "12px" }} />

                  <label className="login-lbl mb-0">
                    <img src="images/login-page/icons/password.svg" alt="Password Icon" />
                    <Field
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="login-txt"
                      placeholder="Enter your Password"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="password-eye"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      <img
                        src={showPassword ? "images/login-page/icons/eye-close.svg" : "images/login-page/icons/eye-open.svg"}
                        alt=""
                      />
                    </button>
                  </label>
                  <ErrorMessage name="password" component="span" style={{ color: "red", fontSize: "12px" }} />

                  <button type="submit" className="login-btn" disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="modal animate__animated animate__bounceIn show"
          id="login-succ"
          tabIndex="-1"
          role="dialog"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          aria-modal="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content clearfix">
              <div className="modal-body">
                <div className="logout-in">
                  <h1>Login Successful</h1>
                  <img src="images/login-page/login-succ.svg" alt="Success" />
                  <p>Welcome to Admin panel!</p>
                  <button
                    className="logout-in-btn"
                    onClick={() => {
                      setShowModal(false);
                      navigate("/user-management");
                    }}
                  >
                    Okay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
