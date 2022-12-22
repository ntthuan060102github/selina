import UnAuthorization from "./pages/un_authorization/UnAuthorization"
import ForgotPassword from "./pages/forgot_password/ForgotPassword"
import Home from "./pages/home/Home"
import Search from "./pages/search/Search"
import BookDetail from "./pages/book_detail/BookDetail"
import Profile from "./pages/profile/Profile"
import UserCart from "./pages/user_cart/UserCart"
import Order from "./pages/order/Order"
import Checkout from "./pages/checkout/Checkout"
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
  const [owner_role, set_owner_role] = useState("")

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
                ? <Home set_has_token={set_has_token} owner_role={owner_role}/>
                : <Navigate to="/authorization"/>
            }
        />
        <Route 
          path="/book/:book_id" 
          element={
            has_token 
            ? <BookDetail set_has_token={set_has_token}/>
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
          path="/profile/:user_id" 
          element={
            has_token 
            ? <Profile set_has_token={set_has_token}/>
            : <Navigate to="/authorization"/>
          }
        />
        <Route 
          path="/order/:user_id" 
          element={
            has_token 
            ? <Order set_has_token={set_has_token}/>
            : <Navigate to="/authorization"/>
          }
        />
        <Route 
          path="/authorization" 
          element={
            has_token 
            ? <Navigate to="/"/>
            : <UnAuthorization set_has_token={set_has_token} set_owner_role={set_owner_role}/>
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
      </Routes>
    </Router>
  );
}

export default App;
