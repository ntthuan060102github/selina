import "../others/css/form.css"
import {
    useState,
    useRef,
    useEffect
} from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { APP_ENV } from "../../configs/app_config"
import SELINA_API_SERVICE_INFOS from "../../configs/selina_service_infos"

export default function ForgotPasswordForm () {
    const [message, set_message] = useState("We will send a new password to this Email address")
    const guest_email = useRef()
    const email_regex_validate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const [form_error, set_form_error] = useState(false)
    const [countdown, set_countdown] = useState(0)
    const navigate = useNavigate()
    let timer = null

    useEffect(() => {
        timer = !timer && setInterval(() => {
            set_countdown(countdown - 1)
            set_message(`Success, redirect to login (${countdown})`)
            
            if (countdown === 0) {
                navigate("/")
            }
        }, 1000)
        return () => clearInterval(timer)
    }, [countdown])

    const submit_form = async () => {
        const user_email = guest_email.current.value

        if (user_email === "") {
            set_form_error(true)
            set_message("Test: Không được trống")
            return
        }

        if (!email_regex_validate.test(user_email)) {
            set_form_error(true)
            set_message("Test: Kiểm tra lại email")
            return
        }

        const response = await axios.post(
            `${SELINA_API_SERVICE_INFOS.profile[APP_ENV].domain}/recover-password`,
            {
                email: user_email
            }
        )
        const response_data = response.data

        if (response_data.status_code !== 1) {
            set_form_error(true)
            set_message(response_data.message)
        }
        else {
            set_form_error(false)
            set_countdown(5)
        }
    }

    return (
        <div className={form_error ? "form error" : "form"}>
            <label htmlFor="form__forgot-password-input" className="form__input-label">Your Email Address</label>
            <input 
                type="email" 
                className="form__input" 
                id="form__forgot-password-input"
                placeholder="Enter your Email"  
                ref={guest_email}
            />
            <span className="form__message">{message}</span>
            <div className="form__submit-btn" onClick={submit_form}>Send</div>
        </div>
    )
}