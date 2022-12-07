import UnAuthorization from "./pages/un_authorization/UnAuthorization"
import ForgotPassword from "./pages/forgot_password/ForgotPassword"
import "./base.css"
import SELINA_API_SERVICE_INFOS from "./configs/selina_service_infos"
import { APP_ENV } from "./configs/app_config"

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import { useEffect, useState } from "react"
import { redirect } from "react-router-dom"
import axios from "axios"

function App() {
  const [is_authenticated, set_is_authenticated] = useState(false)

  useEffect(() => {
    const ping = async () => {
      const ping_response = await axios.get(
        `${SELINA_API_SERVICE_INFOS.auth[APP_ENV].domain}/ping`,
        {
          headers: {
            Authorization: localStorage.getItem("access_token")
          }
        }
      )
      console.log(ping_response.data)
      set_is_authenticated(ping_response?.data?.status_code === 1)
      redirect("/")
    }
    ping()
  }, [])

  return (
    <Router>
      <Routes>
        <Route 
          path="/authorization" 
          element={
            is_authenticated 
            ? <Navigate to="/"/>
            : <UnAuthorization/>
          }
        />
        <Route 
          path="/forgot-password" 
          element={
            is_authenticated 
            ? <Navigate to="/"/>
            : <ForgotPassword/>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
