import {
    useState,
    useRef
} from "react"
import "../others/css/form.css"
import axios from "axios"
import SELINA_API_SERVICE_INFOS from "../../configs/selina_service_infos"
import { APP_ENV } from "../../configs/app_config"
import CircularProgress from '@mui/material/CircularProgress'
import { useNavigate, Link } from "react-router-dom"

export default function Login({set_has_token, set_owner_role}) {
    const [form_error, set_form_error] = useState(false)
    const [form_message, set_form_message] = useState("")
    const user_email = useRef()
    const user_password = useRef()
    const navigate = useNavigate()
    const [loading, set_loading] = useState(false)

    const submit_form = async () => {
        set_loading(true)
        const email = user_email?.current?.value
        const password = user_password?.current?.value

        if (!email || !password) {
            set_form_error(true)
            set_form_message("điền thông tin")
            return
        }

        const login_response = await axios.post(
            `${SELINA_API_SERVICE_INFOS.auth[APP_ENV].domain}/login`, 
            {
                email,
                password
            }
        )
        const login_result = login_response?.data
        set_loading(false)
        if (login_result?.status_code?.toString() !== '1'){
            set_form_message(login_result.message)
            set_form_error(true)
            return
        }
        localStorage.setItem("access_token", login_result.data.access_token)
        localStorage.setItem("refresh_token", login_result.data.refresh_token)
        set_has_token(login_result.data.access_token)
        set_owner_role(login_result.data.user_data.user_type)
        sessionStorage.setItem("user_info", JSON.stringify(login_result.data.user_data))
        navigate("/")
        return
    }

    return (
    <div className={form_error ? "form error" : "form"}>
        <div className="form__wrapper">
            <label 
                htmlFor="form__login-email-input" 
                className="form__input-label"
            >
                Email
            </label>
            <input 
                type="email" 
                className="form__input" 
                id="form__login-email-input"
                placeholder="Email"  
                ref={user_email}
                onFocus={() => {
                    set_form_error(false)
                    set_form_message("")
                }}
            />
            <label 
                htmlFor="form__login-password-input" 
                className="form__input-label"
            >
                Mật khẩu
            </label>
            <input 
                type="password" 
                className="form__input" 
                id="form__login-password-input"
                placeholder="Mật khẩu"  
                ref={user_password}
                onFocus={() => {
                    set_form_error(false)
                    set_form_message("")
                }}
            />
            <Link to="/authorization/forgot-password" className="form__nav-to-forgot-password">Quên mật khẩu?</Link>
            <div className="form__message">{form_message}</div>
            <div className="form__submit-btn" onClick={submit_form}>
                {
                    loading
                    ? <CircularProgress color="inherit" style={{padding: "8px"}}/>
                    : "Đăng nhập"
                }
            </div>
        </div>
    </div>
  )
}