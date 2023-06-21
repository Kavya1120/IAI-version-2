import { useRef, useState, useEffect, useContext } from 'react';
//import GoogleLogin from 'google-react-login';
//import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import './Login.css';
import AuthContext from "./context/AuthProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from './api/axios';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [ profile, setProfile ] = useState([]);

    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            Axios({
                method:"post",
                url:"http://localhost:6080/login",
                data:{
                    email:user,
                    password:pwd
                }
            }).then((res)=>{
                if(res.data.message=="true"){
                    Axios({
                        method:"post",
                        url:"http://localhost:6080/login_academy",
                        data:{
                            email:user,
                            password:pwd
                        }
                    }).then((res)=>{
                        console.log('got response', res)
                        window.localStorage.setItem("token", res);
                        window.localStorage.setItem('is logged in', "true");
                    })
                }
                else{
                    Axios({
                        method:"post",
                        url:"http://localhost:6080/login_industry",
                        data:{
                            email:user,
                            password:pwd
                        }
                    }).then((res)=>{
                        console.log('got response', res)
                        window.localStorage.setItem("token", res);
                        window.localStorage.setItem('is logged in', "true");
                    })
                }
            })
            
            // console.log('response from the login route', res)
            // console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            // const accessToken = response?.data?.accessToken;
            // const roles = response?.data?.roles;
            // setAuth({ user, pwd, roles, accessToken });

            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            // errRef.current.focus();
        }
    }

    
    

    useEffect(
        () => {
            if (user) {
            //     axios
            //         .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            //             headers: {
            //                 Authorization: `Bearer ${user.access_token}`,
            //                 Accept: 'application/json'
            //             }
            //         })
            //         .then((res) => {
            //             setProfile(res.data);
            //         })
            //         .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    
    
    

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="home">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section  className="sec">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h2>Log In</h2>
                    <form onSubmit={handleSubmit} className="login-form">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />

                        <br/>

                        <input
                        type='submit'
                        placeholder='Log In'
                        />
                        
                    </form>
                    
                    <p>
                        Don't have an account?Click here<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="register">Register</a>
                        </span>
                    </p>

                    <div>
            
            
        </div>
                </section>
            )}
        </>
    )
}

export default Login




   