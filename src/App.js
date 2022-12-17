import UnAuthorization from "./pages/un_authorization/UnAuthorization"
import ForgotPassword from "./pages/forgot_password/ForgotPassword"
import Home from "./pages/home/Home"
import Search from "./pages/search/Search"
import "./base.css"

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import { useEffect, useState } from "react"

function App() {
  const [has_token, set_has_token] = useState("")

  useEffect(() => {
    set_has_token(localStorage.getItem("access_token"))
  }, [])

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            has_token 
            ? <Home set_has_token={set_has_token}/>
            : <Navigate to="/authorization"/>
          }
        />
        <Route 
          path="/search" 
          element={
            has_token 
            ? <Search set_has_token={set_has_token}/>
            : <Navigate to="/authorization"/>
          }
        />
        <Route 
          path="/authorization" 
          element={
            has_token 
            ? <Navigate to="/"/>
            : <UnAuthorization set_has_token={set_has_token}/>
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
