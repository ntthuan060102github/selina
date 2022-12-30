import {
    useState,
    useRef
} from "react"
import axios from "axios"
import "../others/css/form.css"
import "./register_form.css"
import SELINA_API_SERVICE_INFOS from "../../configs/selina_service_infos"
import { APP_ENV } from "../../configs/app_config"
import CircularProgress from '@mui/material/CircularProgress'
import { useNavigate } from "react-router-dom"

export default function RegisterForm() {
    const [form_error, set_form_error] = useState(false)
    const [form_message, set_form_message] = useState("")
    const user_email = useRef()
    const user_name = useRef()
    const user_password = useRef()
    const user_re_password = useRef()
    const [loading, set_loading] = useState(false)
    const navigate = useNavigate()

    const submit_form = async () => {
        set_loading(true)
        const email = user_email?.current?.value
        const full_name = user_name?.current?.value
        const password = user_password?.current?.value
        const re_password = user_re_password?.current?.value
        const user_type = "normal_user"
        console.log(password, re_password)
        if (re_password !== password) {
            set_loading(false)
            set_form_error(true)
            set_form_message("Mật khẩu xác nhận không khớp!")
            return 
        }

        const register_response = await axios.post(
            `${SELINA_API_SERVICE_INFOS.profile[APP_ENV].domain}/create-new-account`,
            {
                email: email,
                full_name: full_name,
                device_token: "",
                phone_num: "",
                gender: true,
                password: password,
                user_type: user_type
            }
        )
        const register_result = register_response.data
        console.log(register_result)
        
        set_form_message(register_result.message)
        
        set_loading(false)
        if (register_result.status_code !== 1) {
            set_form_error(true)
        }
        else {
            navigate(`/authorization/verification/${email}`)
        }
    }

    return (
    <div className={form_error ? "form error" : "form"}>
        <label 
            htmlFor="form__login-email-input" 
            className="form__input-label"
        >
            Email
        </label>
        <input 
            type="text" 
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
            htmlFor="form__login-phone-num-input" 
            className="form__input-label"
        >
            Họ và tên
        </label>
        <input 
            type="text" 
            className="form__input" 
            id="form__login-phone-num-input"
            placeholder="Họ và tên"  
            ref={user_name}
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
        <label 
            htmlFor="form__login-re-password-input" 
            className="form__input-label"
        >
            Xác nhận mật khẩu
        </label>
        <input 
            type="email" 
            className="form__input" 
            id="form__login-re-password-input"
            placeholder="Xác nhận mật khẩu"  
            ref={user_re_password}
            onFocus={() => {
                set_form_error(false)
                set_form_message("")
            }}
        />
        <div className="form__message">{form_message}</div>
        <div className="form__submit-btn" onClick={submit_form}>
            {
                loading
                ? <CircularProgress color="inherit" style={{padding: "8px"}}/>
                : "Register"
            }
        </div>
    </div>
  )
}