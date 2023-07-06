import {useState,useEffect,React} from "react";
import './Otpverify.css'
import axios from '../api/axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const OtpVerify = ()=>{
    const mail = localStorage.getItem("userMail")
    const hmail = "*****"+mail.substring(5,mail.length)
  
    const[first,setFirst]=useState('')
    const[second,setSecond]=useState('')
    const[third,setThird]=useState('')
    const[fourth,setFourth]=useState('')
    const[fifth,setFifth]=useState('')
    const[sixth,setSixth]=useState('')
    // const inputs = document.querySelectorAll('#otp > *[id]');
    // for (let i = 0; i < inputs.length; i++) { inputs[i].addEventListener('keydown', function(event) { if (event.key==="Backspace" ) { inputs[i].value='' ; if (i !==0) inputs[i - 1].focus(); } else { if (i===inputs.length - 1 && inputs[i].value !=='' ) { return true; } else if (event.keyCode> 47 && event.keyCode < 58) { inputs[i].value=event.key; if (i !==inputs.length - 1) inputs[i + 1].focus(); event.preventDefault(); } else if (event.keyCode> 64 && event.keyCode < 91) { inputs[i].value=String.fromCharCode(event.keyCode); if (i !==inputs.length - 1) inputs[i + 1].focus(); event.preventDefault(); } } }); } 
    
    const resend= async(e)=>{
        const result = await axios.post('http://localhost:6080/createotp', {
            email:mail,
        }).then(res=>{
            if(res.data.status=="success"){
                console.log('from the reponse',res.data.otp)
                const tempotp=res.data.otp;
            axios.post('http://localhost:6080/mailer',{
                email:mail,
                subject:"OTP for Registration",
                content:`Kindly use the following OTP to complete the registration - ${tempotp}`
            }).then(res=>{
                if(res.data.status == "success"){
                    toast.success("Successfully sent the OTP again. Kindly check your mail")
                }
            })
        }
        else{
            toast.error("Resend failed")
            console.log("resend failed")
        }
            // console.log('from the response for resend link', res.data.status);

        }).catch((err)=>{
            console.log('error occured in the catch of resend call',err);
        })
    }


    const handleSubmit = async(e)=>{
        e.preventDefault();
        const verify = first+second+third+fourth+fifth+sixth;

        console.log(verify)
        try {
                const result = await axios.post('http://localhost:6080/verifyotp', {
                    email:mail,
                    verify:verify
                }).then(res=>{
                    if(res.data.status=="failure"){
                        toast.error("Try resend the OTP")
                        // alert('try resend the otp ')
                    }
                    else{
                        const userDetails=localStorage.getItem('userDetails')
                        
                        const user = JSON.parse(userDetails)
                        console.log(user)
                        if(user[0].affiliation == "academic"){
                            console.log("inside academic")
                            const result = axios.post('http://localhost:6080/createacademy',{user:user}).then(res=>{
                            console.log(res)
                            if(res.data.status=="success"){
                                console.log("user creation successful")
                                toast.success("Registration successfully completed!")
                                ///deleting the otp after the succesfull
                                // axios.delete("http://localhost:6080/deleteOtp",{email:mail}).then(res=>{
                                //         console.log(res)
                                //     })
                                localStorage.clear("userDetails")

                                const result1 = axios.post('http://localhost:6080/mailer', {
                            
                                email:mail,
                                subject:"Registration successful",
                                content:"succesfully registered"
                            }).then(res=>{
                                if(res.data.status=="success"){
                                    console.log("mail sent successfully")
                                    
                                    window.location.href="samplelogin"
                                }
                                console.log('from the response of succesfull registeration', res);
                            })
                            }
                            else{
                                toast.error("user creation failed")
                                localStorage.clear("userDetails")
                            }
                        })
                    }
                    else if(user[0].affiliation=='industry'){
                        const result = axios.post('http://localhost:6080/createindustry',{user:user}).then(res=>{
                            console.log(res)
                            console.log("inside industry")
                            if(res.data.status=="success"){
                                console.log("user creation successful")
                                toast.success("Registration successfully completed!")

                                // axios.delete("http://localhost:6080/deleteOtp",{email:mail}).then(res=>{
                                //         console.log(res)
                                //     })
                                localStorage.clear("userDetails")

                                const result1 = axios.post('http://localhost:6080/mailer', {
                            
                                email:mail,
                                subject:"Registration successful",
                                content:"succesfully registered"
                            }).then(res=>{
                                if(res.data.status=="success"){
                                    console.log("mail sent successfully")
                                    
                                    window.location.href="samplelogin"
                                }
                                console.log('from the response of succesfull registeration', res);
                            })
                            }
                            else{
                                toast.error("user creation failed")
                                localStorage.clear("userDetails")
                            }
                        })
                    }

                        
                       
                    }
                })
        } catch (error) {
            console.log('error occured in axios post', error)
        }
    }

    return(
        <>
        {
            
            <div class="otp-container h-screen bg-blue-500 py-20 px-3">
                <ToastContainer/>
            <div class="container mx-auto">
                <div class="max-w-sm mx-auto md:max-w-lg">
                    <div class="w-full">
                        <div class="h-64 py-3 rounded text-center">
                              <h1 class="text-2xl font-bold" className="otpverify-h1">OTP Verification</h1>
                              <div class="flex flex-col mt-4">
                                  <span>Enter the OTP you received at {hmail}</span>
                                  <span class="font-bold"></span>
                              </div>
                              
                            <div id="otp" class="flex flex-row justify-center text-center px-2 mt-5">
                                <input class="otp-input m-2 border h-10 w-10 text-center form-control rounded small-otp-box" type="text" id="first" maxLength="1" onChange={ (e)=> setFirst(e.target.value)}/> 
                                <input class="otp-input m-2 border h-10 w-10 text-center form-control rounded small-otp-box" type="text" id="second" maxLength="1" onChange={ (e)=>setSecond(e.target.value)}/> 
                                <input class="otp-input m-2 border h-10 w-10 text-center form-control rounded small-otp-box" type="text" id="third" maxLength="1" onChange={ (e)=>setThird(e.target.value)}/> 
                                <input class="otp-input m-2 border h-10 w-10 text-center form-control rounded small-otp-box" type="text" id="fourth" maxLength="1" onChange={ (e)=>setFourth(e.target.value)}/>
                                <input class="otp-input m-2 border h-10 w-10 text-center form-control rounded small-otp-box" type="text" id="fifth" maxLength="1" onChange={ (e)=>setFifth(e.target.value)}/> 
                                <input class="otp-input m-2 border h-10 w-10 text-center form-control rounded small-otp-box" type="text" id="sixth" maxLength="1" onChange={ (e)=>setSixth(e.target.value)}/>
                            </div>
                            <div class="otp-button">
                              <button type="submit" onClick={handleSubmit} className="otp-btn">Submit</button>
                              </div>
                              <div class="flex justify-center text-center mt-5">
                                  <a onClick={resend} class="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"><span class="font-bold">Resend OTP</span><i class='bx bx-caret-right ml-1'></i></a>
                              </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        }
        </>
    )
}

export default OtpVerify;