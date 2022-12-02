import {
    useState,
    useEffect,
    useRef
} from "react"
import "../others/css/form.css"
import "./register_form.css"

export default function RegisterForm() {
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
            Email Address
        </label>
        <input 
            type="text" 
            className="form__input" 
            id="form__login-email-input"
            placeholder="Enter your Email Address"  
            ref={user_email}
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
            ref={user_password}
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
            ref={user_password}
        />
        <div className="form__submit-btn" onClick={submit_form}>Register</div>
    </div>
  )
}