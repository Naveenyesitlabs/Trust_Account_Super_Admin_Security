import { BrowserRouter, Route, Routes } from "react-router-dom"
import ProtectedRoute from "./component/ProtectedRoute"
import Login from "./pages/Login"
import UserManagement from "./pages/UserManagement"

function App() {

  return (
    <>
    {/* <PaymentAlert /> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/user-management"
          element={(
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <UserManagement />
            </ProtectedRoute>
          )}
        />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
