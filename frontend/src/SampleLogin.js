import React, { useState, useEffect } from "react";
import "./Samplelogin.css"; 
import Axios from 'axios';
import Image from './assets/signup_image_1.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false); 
  const [emailFocus, setEmailFocus] = useState(false);
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  useEffect(() => {
  }, [name]);


  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
}, [email])

useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
}, [password])

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();
    console.log(email)
    // const v2 = PWD_REGEX.test(password);
    const v3 = EMAIL_REGEX.test(email);

    if(!v3){
      toast.error("Please enter a valid mail ID")
    }

    if (!v3) {
      setErrMsg("Invalid Entry");
      return;
  }
    try {
        window.localStorage.setItem("userMail",email);
        
        Axios({
            
            method:"post",
            url:"http://localhost:6080/login",
            data:{
                email:email,
                password:password
            }
        }).then((res)=>{
            
            if(res.data.message==="academy"){
                Axios({
                    method:"post",
                    url:"http://localhost:6080/login_academy",
                    data:{
                        email:email,
                        password:password
                    }
                }).then((res)=>{
                    console.log('res', res.data.status);
                    if(res.data.status==="success for academy"){
                      console.log('hi')
                      localStorage.setItem("userName",res.data.name)
                      toast.success("Login Successful")
                      if(res.data.details==true){
                        window.location.href="academy";
                      }
                      else if (res.data.details==false){
                        window.location.href="newprofile";
                      }
                    }
                    else{
                      toast.error('Please enter Valid Credentials')
                      console.log('error')
                    }

                    window.localStorage.setItem("token", res);
                    window.localStorage.setItem('is logged in', "true");
                    window.localStorage.setItem("affiliation","academy")
                })
            }
            else if(res.data.message=='industry'){
              Axios({
                method:"post",
                url:"http://localhost:6080/login_industry",
                data:{
                    email:email,
                    password:password
                }
            }).then((res)=>{
                console.log('res', res.data.status);
                if(res.data.status==="success for industry"){
                  console.log('hi')
                  localStorage.setItem("userName",res.data.name)
                  toast.success("Login Successful")
                  if(res.data.details==true){
                    window.location.href="industry";
                  }
                  else if (res.data.details==false){
                    window.location.href="newprofile";
                  }
                  
                }
                else{
                  toast.error("Please enter Valid Credentials");
                  console.log('error')
                }

                window.localStorage.setItem("token", res);
                window.localStorage.setItem('is logged in', "true");
                window.localStorage.setItem("affiliation","industry")
            })
            }
            else{
               alert('user not registered');
            }
        })
    }
    catch(err) {
      console.log('error occured', err);
    };
  };

  return (
    <div className="split-page">

              <ToastContainer />


                <div className="left-section">
                  <h1 className="login-h1">LOGO</h1>
                  <div className="left-main">
                    <img src={Image} alt="login_image" />
                  </div>
                </div>


              <div className="login-right-section">
                        <div className="login-right-fields">
                              <h2 login-h2>LOGIN</h2>
                              <form onSubmit={handleSubmit} className="samplelogin-form">
                                      <label className="login-label">
                                              Email:
                                              <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                                              <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                                              <input type="text" 
                                              name="email" 
                                              value={email} 
                                              onChange={handleEmailChange}
                                              aria-invalid={validEmail ? "false" : "true"}
                                              aria-describedby="uidnote" 
                                              onFocus={() => setEmailFocus(true)}
                                              onBlur={() => setEmailFocus(false)}
                                              formnovalidate="formnovalidate"
                                              className="login-input" 
                                              />
                                      </label>
                                      <label className="login-label">
                                              Password:
                                              <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                                              <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"} />
                                              <input type="password" 
                                              name="password" 
                                              value={password}
                                              required
                                              aria-invalid={validPwd ? "false" : "true"}
                                              aria-describedby="pwdnote"
                                              onFocus={() => setPwdFocus(true)}
                                              onBlur={() => setPwdFocus(false)} 
                                              onChange={handlePasswordChange}
                                              className="login-input" 
                                              />
                                      </label>
                                       <br/>


                                        <div class="links">
                                        <p className="login-p">
                                          <a href="register" className="login-reg-link">To Register</a>
                                        </p>
                                        <p className="login-p">
                                          <a href="forgotpassword" className="login-forgetpassword-link">Forgot password?</a>
                                        </p>
                                        </div>


                                        <button class="submit-button" type="submit"  className="login-button">Submit</button>


                              </form>
                      </div>
              </div>
    </div>
  );
}

export default Login;