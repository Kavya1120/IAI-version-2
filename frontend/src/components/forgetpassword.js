import { useState } from "react";
import axios from 'axios';
import Image from './signup_image_1.jpg'


function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
        axios.post('http://localhost:6080/forgot',{
          email:email
        }).then((res)=>{
          console.log(res.data.status);
          const link =res.data.redirect;
          axios.post("http://localhost:6080/sendmail",{
            link:link,
            email:email,
            sub:"Reset password link"
          }).then((res)=>{
            console.log(res)
          })
          if(res.data.status=="success"){
            const token = res.data.token;
            const link = res.data.redirect;
            window.localStorage.setItem('token', token);

          }
          else{
            alert('enter a valid user email');
          }
        }).catch((e)=>{
            console.log('error occured', e);
        })
    };
  
    return (
      <div className="split-page">
              <div className="left-section">
                      <h1 className="forgetpassword-h1">LOGO</h1>
                      <div className="left-main">
                        <img src={Image} alt="login_image" />
                      </div>
              </div>
              <div className="login-right-section">
                        <div className="login-right-fields">
                              <form onSubmit={handleSubmit} className="forgetpassword-form">
                                      <h6 className="forgetpassword-h6"><l><i>Please enter your email id to reset your password here</i></l></h6>
                                      <div>
                                          <label>
                                            Enter your email:
                                            <input type="text" id="email" value={email} onChange={(event)=>{setEmail(event.target.value)}}/>
                                          </label>
                                          <br/>
                                      </div> <br></br>
                                      <button type="submit" className="forgotpassword-button">Submit</button>
                              </form>
                        </div>
               </div>
        </div>
        
    );
  }  

export default ForgotPasswordPage;
