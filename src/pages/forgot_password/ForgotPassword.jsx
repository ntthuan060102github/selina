import "./forgot_password.css"
import UnAuthorizationLayout from "../../components/un_authorization_layout/UnAuthoizationLayout"
import ForgotPasswordForm from "../../components/forgot_password_form/ForgotPasswordForm"

function ForgotPassword (){ 
  console.log(1)
  return (
    <UnAuthorizationLayout 
      body={<ForgotPasswordForm/>}
    />
  );
};

export default ForgotPassword;