import {
    useState,
    useEffect,
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
    const user_phone_number = useRef()
    const user_password = useRef()
    const user_re_password = useRef()
    const [loading, set_loading] = useState(false)
    const navigate = useNavigate()

    const submit_form = async () => {
        set_loading(true)
        const email = user_email?.current?.value
        const phone_number = user_phone_number?.current?.value
        const password = user_password?.current?.value
        const re_password = user_re_password?.current?.value
        const user_type = "normal_user"

        if (re_password !== password) {
            set_form_error(true)
            set_form_message("pass k khớp")
            return 
        }

        const register_response = await axios.post(
            `${SELINA_API_SERVICE_INFOS.profile[APP_ENV].domain}/create-new-account`,
            {
                email: email,
                full_name: "Nguyen Trong Thuan",
                device_token: "",
                phone_num: phone_number,
                gender: true,
                password: password,
                user_type: user_type
            }
        )
        const register_result = register_response.data
        
        set_form_message(register_result.message)
        
        set_loading(false)
        if (register_result.status_code !== 1) {
            set_form_error(true)
        }
        else {
            setTimeout(() => navigate("/123"), 3000)
        }
    }

    return (
    <div className={form_error ? "form error" : "form"}>
        <label 
            htmlFor="form__login-email-input" 
            className="form__input-label"
        >
            Email Address
        </label>
        <input 
            type="text" 
            className="form__input" 
            id="form__login-email-input"
            placeholder="Enter your Email Address"  
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
            Phone Number
        </label>
        <input 
            type="text" 
            className="form__input" 
            id="form__login-phone-num-input"
            placeholder="Enter your Phone Number"  
            ref={user_phone_number}
            onFocus={() => {
                set_form_error(false)
                set_form_message("")
            }}
        />
        <label 
            htmlFor="form__login-password-input" 
            className="form__input-label"
        >
            Password
        </label>
        <input 
            type="password" 
            className="form__input" 
            id="form__login-password-input"
            placeholder="Enter your Password"  
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
            Re-enter your Password
        </label>
        <input 
            type="email" 
            className="form__input" 
            id="form__login-re-password-input"
            placeholder="Re-enter your Password"  
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