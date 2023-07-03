
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Register.css"; 
import Image from './assets/signup_image_1.jpg'
import Axios  from "axios";
import { ToastContainer, toast } from "react-toastify";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const REGISTER_URL = '/register';



const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [loading, setLoading] = useState(false)

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false); 
    const [emailFocus, setEmailFocus] = useState(false);

    const [affiliationType, setAffiliationType] = useState('');
    const [academicPosition, setAcademicPosition] = useState('staff');
    const [chamberMember, setChamberMember] = useState('no');

    const [showFields, setShowFields] = useState(false);
    const [showTextFields,setShowTextFields] = useState(false);
    const [showHiddenFields,setHiddenFields]=useState(false);

    const [uniName, setUniName] = useState('');
    const [deptName, setDeptName] = useState('');
    const [degree, setDegree] = useState('');

    const[designationName,setDesignationName]=useState('');
    const[companyName,setCompanyName]=useState('');
    const handleAcademicPositionChange = (e) => {
        const selectedType = e.target.value.toLowerCase();
        setAcademicPosition(selectedType);
        if (!['student', 'staff'].includes(selectedType)) {
            setAcademicPositionError('Select a valid academic position.');
            showTextFields(false);
            
          } else {
            setErrMsg(''); 
          }
        
        if (e.target.value === 'student') {
            setShowTextFields(true);
          } else {
            setShowTextFields(false);
          }
    }
    const handleSelectChange = (e) =>{
        setChamberMember(e.target.value);
    }
    const handleAffiliationTypeChange = (e) => {
        const selectedType = e.target.value.toLowerCase();
        setAffiliationType(selectedType);
        
        if (!['academic', 'industry', 'chamber'].includes(selectedType)) {
            setAffiliationTypeError('Select a valid affiliation type.');
            setShowFields(false);
            setHiddenFields(false);
          } else {
            setErrMsg(''); 

            if (e.target.value === 'academic') {
                setShowFields(true);
                setHiddenFields(false);
              } else if (e.target.value === 'industry' ) {
                setShowFields(false);
                setHiddenFields(true);
              } 
            //   else if(e.target.value == " "){
            //     setShowFields(false);
            //     setHiddenFields(false);
            //   }
              else {
                setShowFields(false);
                setHiddenFields(false);
              }
          }
        
       
          
      };

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [usernameError,setUsernameError]=useState('');
    const [affiliationTypeError,setAffiliationTypeError]=useState('')
    const [academicPositionError,setAcademicPositionError]=useState('')
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        localStorage.setItem("userMail",email);
        
        
        console.log(email)
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = EMAIL_REGEX.test(email);
        
        
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }
        if (!affiliationType) {
            setAffiliationType('Please select an affiliation type.');
            return;
          }


          
          if(affiliationType === "academic"){
            try {
                setLoading(true)
                const response =  await Axios.post('http://localhost:6080/find-username',{
            
                    email:email
                    
                }).then(res=>{
                    if (res.data.status === 409) {
                        
                        //new user
                        console.log("response   ", res.data.status);
                        const userDetails= [{
                            name:user,
                            email:email,
                            password: pwd,
                            affiliation:affiliationType,
                            university:uniName,
                            degree:degree,
                            position: academicPosition,
                            dept:deptName
                            }];
                
                            const stringarr = JSON.stringify(userDetails);
                            console.log('jsonarr', stringarr);
                            localStorage.setItem('userDetails', stringarr);
                            toast.success("Registered Successfully!")

                            Axios.post('http://localhost:6080/createotp',{email:email}).then((res)=>{
                                if (res.data.status == "success"){
                                    const otp = res.data.otp
                                    Axios.post('http://localhost:6080/mailer',{email:email,subject:"OTP for registration",content:`Kindly use the following OTP to complete the registration  ${otp}`}).then(res=>{
                                        if(res.data.status =="success"){
                                            setLoading(false)
                                            setSuccess(true);
                                            
                                        }
                                        else{
                                            setSuccess(false)
                                        }
                                    })
                                }
                                else{

                                    setSuccess(false)
                                }
                            })


                        

                    }
                    else{
                        toast.error("Registration Failed!")
                        setUsernameError(" *User already exist");
                        setSuccess(false);
                    }
                })

            
                setEmail('');
                setUser('');
                setPwd('');
                setMatchPwd('');
                setAcademicPosition('');
                setCompanyName('');
                setDesignationName('');
                setChamberMember('');
                setDegree('');
                setDeptName('');
                

            } catch (err) {
             console.log('unknown eroor in catch()', err)
                if (!err?.response) {
                    setErrMsg('No Server Response');
                }  else {
                    setErrMsg('Registration Failed');
                }
                // errRef.current.focus();
            }
            finally{
                setLoading(false)
            }
        }
        else if(affiliationType === 'industry'){
            try {
                setLoading(true)
                const response =  await Axios.post('http://localhost:6080/find-username',{
            
                    email:email
                    
                }).then(res=>{
                    if (res.data.status === 409) {
                        //new user
                        console.log("response   ", res.data.status);
                       
                        const userDetails= [{
                            name:user,
                            email:email,
                            password: pwd,
                            affiliation:affiliationType,
                            companyname:companyName,
                            designation:designationName,
                            chamber:chamberMember
                        }];
                
                        const stringarr = JSON.stringify(userDetails);
                        console.log('jsonarr', stringarr);
                        localStorage.setItem('userDetails', stringarr);

                        Axios.post('http://localhost:6080/createotp',{email:email}).then((res)=>{
                            if (res.data.status == "success"){
                                const otp = res.data.otp
                                Axios.post('http://localhost:6080/mailer',{email:email,subject:"OTP for registration",content:`Kindly use the following OTP for registration ${otp}`}).then(res=>{
                                    if(res.data.status =="success"){
                                        setLoading(false)
                                        setSuccess(true);                                        
                                    }
                                    else{
                                        setSuccess(false)
                                    }
                                })
                            }
                            else{
                                setSuccess(false)
                            }
                        })
                    }
                    else{
                        setUsernameError("User already exist");
                        setSuccess(false);
                    }
                })
                // response();

                // setSuccess(true);
            
                setEmail('');
                setUser('');
                setPwd('');
                setMatchPwd('');
                setAcademicPosition('');
                setCompanyName('');
                setDesignationName('');
                setChamberMember('');
                setDegree('');
                setDeptName('');
                

            } catch (err) {
             console.log('unknown eroor in catch()', err)
                if (!err?.response) {
                    setErrMsg('No Server Response');
                }  else {
                    setErrMsg('Registration Failed');
                }
                // errRef.current.focus();
            }
            finally{
                setLoading(false)
            }
        }
    }

    return (
        <>
            {success ? (

                
                (
                    window.location.href="OtpVerify"
                )
            ) : (
            
            <div className="registration-split-page">
                <ToastContainer></ToastContainer>
                <div className="register-left-section">
                    <h1 className="register-h1">LOGO</h1>
                    <div className="register-left-main">
                        <img src={Image} alt="login_image" />
                    </div>
                </div>
                <div className="register-right-section">
                    <div className="register-right-fields">
                    
                    {
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> 
                    }
                    <h1 class="register-h1"className="register-h1">Register</h1>
                    <form onSubmit={handleSubmit} className="reg-form">
                    <div className="input-container">
                        
                    <label htmlFor="username" className="register-label">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            className="register-textbox"
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                    </div>
                        <div className="input-container">
                        <label htmlFor="Email">
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="email"
                            id="Email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail   (e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            className="register-textbox"
                        />
                        <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            '@' symbol missing.<br />
                            Enter a valid Email address.<br />
                        </p>
                        {usernameError  && <p className="errmsg">{usernameError}</p>}
                        </div>

                        <div className="input-container">
                            <label htmlFor="affiliationType">Affiliation type:</label>
                            <select id="affiliationType" value={affiliationType} onChange={handleAffiliationTypeChange}>
                                <option value="">-- Select --</option>
                                <option value="academic">Academic</option>
                                <option value="industry">Industry</option>
                                
                            </select>
                            {/* {console.log(   errMsg)} */}
                            {affiliationTypeError  && <p className="errmsg">{affiliationTypeError}</p>}
                        </div>

                        {showHiddenFields && (
                            <div className="input-container">
                            
                            
                            <label htmlFor="cName">Company Name:</label>
                                    <input type="text" id="cName" name="cName" 
                                    value={companyName} onChange={(e) => setCompanyName(e.target.value) }required/>
                                    
                            <label htmlFor="desig">Designation:</label>
                                    <input type="text" id="desig" name="desig" 
                                    value={designationName} onChange={(e) => setDesignationName(e.target.value) } required/>
                                    
                            <label htmlFor="chamberMember">Chamber Member?</label>
                            <select id="chamberMember" value={chamberMember} onChange={handleSelectChange} required>
                                <option value="">-- Select --</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select><br></br>
                        </div>
                        )}

                        {showFields && (
                            <div className="input-container">
                                
                            <label htmlFor="academicPosition">Academic Position:</label>
                            <select id="academicPosition" value={academicPosition} onChange={handleAcademicPositionChange} required>
                                <option value="">-- Select --</option>
                                <option value="student">Student</option>
                                <option value="staff">Staff</option>
                            </select>
                            <label htmlFor="uni">University:</label>
                                    <input type="text" id="uni" name="uni" 
                                    value={uniName} onChange={(e) => setUniName(e.target.value) }required/>
                                    
                            <label htmlFor="dept">Department:</label>
                                    <input type="text" id="dept" name="dept" 
                                    value={deptName} onChange={(e) => setDeptName(e.target.value) } required/>
                                    
                            {showTextFields && (
                                <div className="input-container">
                                    <label htmlFor="degree">Degree:</label>
                                    <input type="text" id="degree" name="degree" 
                                    value={degree} onChange={(e) => setDegree(e.target.value) } required/>
                                    
                                </div>
                            )}
                            
                            </div>
                        )}
                        
                        <div className="input-container">
                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                            className="register-textbox"
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                        </div>
                        <div className="input-container">
                            
                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            className="register-textbox"
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match password field.
                        </p><br></br>
                        </div>

                        <button type="submit" disabled={!validName || !validEmail || !affiliationType || 
                             !validPwd || !validMatch ? true : false}>
                             {loading?"Loading....":"Sign up"}
                             </button>
                    </form>
                    <p className="regEnd">
                        Already registered? 
                        <span className="line"> &nbsp;&nbsp;
                            {/*put router link here*/}
                            <a href="samplelogin" className="reg-link">Sign In</a>
                        </span>
                    </p>
                
                </div>
                </div>
                
            </div>
                
            )}
            
        </>
    )
}

export default Register