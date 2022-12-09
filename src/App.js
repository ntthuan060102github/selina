import UnAuthorization from "./pages/un_authorization/UnAuthorization"
import ForgotPassword from "./pages/forgot_password/ForgotPassword"
import Home from "./pages/home/Home"
import "./base.css"

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import { useEffect, useState } from "react"

function App() {
  const [is_authenticated, set_is_authenticated] = useState(false)
  const [has_token, set_has_token] = useState("")

  useEffect(() => {
    set_has_token(localStorage.getItem("access_token"))
  })

  // useEffect(() => {
  //   const ping = async () => {
  //     const ping_response = await axios.get(
  //       `${SELINA_API_SERVICE_INFOS.auth[APP_ENV].domain}/ping`,
  //       {
  //         headers: {
  //           Authorization: localStorage.getItem("access_token")
  //         }
  //       }
  //     )
  //     console.log(ping_response.data)
  //     set_is_authenticated(ping_response?.data?.status_code === 1)
  //     redirect("/")
  //   }
  //   ping()
  // }, [])

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            has_token 
            ? <Home/>
            : <Navigate to="/authorization"/>
          }
        />
        <Route 
          path="/authorization" 
          element={
            has_token 
            ? <Navigate to="/"/>
            : <UnAuthorization/>
          }
        />
        <Route 
          path="/forgot-password" 
          element={
            has_token 
            ? <Navigate to="/"/>
            : <ForgotPassword/>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
