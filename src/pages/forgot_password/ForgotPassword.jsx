import "./Forgot.css"

function ForgotPassword (){ 
      return (
        <div className="box">
          <img src="/public/img/background1.png" alt="" className="background" />
          <div className="content">
            <div className="frame" />
            <div className="forgot_password">
              <img src="/public/img/logo.png" alt="" className="logo" />
              <h2 className="heading">Your Email Address</h2>
              <input type="Enter_your_Email" className="email" />
              <p className="input_text">Enter your Email</p>
              <h2 className="description">We will send a new password to this Email address</h2>
              <div className="button">
                <button className="button_send">Send</button> 
              </div> 
            </div>
          </div>
        </div>
      );
};

export default ForgotPassword;