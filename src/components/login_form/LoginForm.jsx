import {
    useState,
    useEffect,
    useRef
} from "react"
import "../others/css/form.css"

export default function Login() {
    const [form_error, set_form_error] = useState(false)
    const user_email = useRef()
    const user_password = useRef()

    const submit_form = async () => {
        
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
            type="email" 
            className="form__input" 
            id="form__login-email-input"
            placeholder="Enter your Email"  
            ref={user_email}
        />
        <label 
            htmlFor="form__login-password-input" 
            className="form__input-label"
        >
            Password
        </label>
        <input 
            type="email" 
            className="form__input" 
            id="form__login-password-input"
            placeholder="Enter your Password"  
            ref={user_password}
        />
        <div className="form__submit-btn" onClick={submit_form}>Login</div>
    </div>
  )
}