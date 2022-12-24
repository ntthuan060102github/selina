import UnAuthorization from "./pages/un_authorization/UnAuthorization"
import ForgotPassword from "./pages/forgot_password/ForgotPassword"
import Home from "./pages/home/Home"
import Search from "./pages/search/Search"
import BookDetail from "./pages/book_detail/BookDetail"
import Profile from "./pages/profile/Profile"
import UserCart from "./pages/user_cart/UserCart"
import Order from "./pages/order/Order"
import Checkout from "./pages/checkout/Checkout"
import SellerRequirements from "./pages/seller_requirements/SellerRequirements"
import TopBar from "./components/topbar/Topbar"
import "./base.css"
import SELINA_API_SERVICE_INFOS from "./configs/selina_service_infos"
import { APP_ENV } from "./configs/app_config"
import axios from "axios"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom"
import { useEffect, useState } from "react"

function App() {
  const [has_token, set_has_token] = useState("")
  const [owner_role, set_owner_role] = useState("")

  useEffect(() => {
    set_has_token(localStorage.getItem("access_token"))
    
    const init = async () => {
      if (localStorage.getItem("access_token")) {
        const response = await axios.get(
            `${SELINA_API_SERVICE_INFOS.auth[APP_ENV].domain}/ping`,
            {
                headers: {
                    Authorization: localStorage.getItem("access_token")
                }
            }
        ).then((response) => {
            return response
        })

        if (response.data.status_code.toString () === "2") {
          set_has_token(false)
          return
        }

        const user_data = response.data.data
        set_owner_role(user_data.user_type)

        if (!sessionStorage.getItem("user_info")) {
          sessionStorage.setItem("user_info", JSON.stringify(user_data))
        }
      }
    }
    init()
  }, [])

  return (
    <Router>
      <Routes>
        <Route 
          exact
          path="authorization" 
          element={
            <>
              <Outlet/>
            </>
          }
        >
          <Route 
            path="" 
            element={
              has_token 
              ? <Navigate to="/"/>
              : <UnAuthorization set_has_token={set_has_token} set_owner_role={set_owner_role} has_token={has_token}/>
            }
          />
          <Route 
            path="forgot-password" 
            element={
              has_token
              ? <Navigate to="/"/>
              : <ForgotPassword/>
            }
          />
        </Route>

        <Route 
          path="" 
          element={
            <>
              <TopBar/>
              <Outlet/>
            </>
          }
        >
          <Route 
            path="" 
            element={
              has_token
              ? <Home set_has_token={set_has_token} owner_role={owner_role}/>
              : <Navigate to="/authorization"/>
            }
          />
          <Route 
            path="book/:book_id" 
            element={
              has_token 
              ? <BookDetail set_has_token={set_has_token}/>
              : <Navigate to="/authorization"/>
            }
          />
          <Route 
            path="search" 
            element={
              has_token 
              ? <Search set_has_token={set_has_token}/>
              : <Navigate to="/authorization"/>
            }
          />
          <Route 
            path="profile/:user_id" 
            element={
              has_token 
              ? <Profile set_has_token={set_has_token}/>
              : <Navigate to="/authorization"/>
            }
          />
          <Route 
            path="order/:user_id" 
            element={
              has_token 
              ? <Order set_has_token={set_has_token}/>
              : <Navigate to="/authorization"/>
            }
          />
          <Route 
            path="seller-requirements" 
            element={
              has_token 
              ? <SellerRequirements set_has_token={set_has_token}/>
              : <Navigate to="/authorization"/>
            }
          />
          <Route
            path="/cart"
            element={
              has_token
              ? <UserCart set_has_token={set_has_token}/>
              : <Navigate to="/authorization"/>
            }
          />
          <Route
              path="/checkout/:checkout_id"
              element={
                  has_token
                  ? <Checkout set_has_token={set_has_token}/>
                  : <Navigate to="/authorization"/>
              }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
