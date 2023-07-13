import React,{useState} from 'react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Container} from 'react-bootstrap'
import "../home.css";
import Navbar1 from './Navbar1';
import Footer from './footer';
import "./industrypostjob.css";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Industryjobpost() {
  const [loading, setLoading] = useState(false)
    const [designation, setDesignation] = useState("");
    const [description, setDescription] = useState("");
    const [city, setCity] = useState("");
    const [workingtime, setWorkingtime] = useState("");
    const [startingsalary, setStartingsalary] = useState("");
    const [endingsalary, setEndingsalary] = useState("");
    const [image, setImage] = useState("");
    const [Date,setDate]=useState("")
    const [company,setCompany]=useState("")

    const navigate=useNavigate();
    const handlesubmit= (e)=>
    {
      setLoading(true)
      e.preventDefault();
      var today = new window.Date();

      setDate(today.getDate()+ '-' + (today.getMonth() + 1) + '-' + today.getFullYear())

      const mail = localStorage.getItem('userMail');
      console.log('from the job post check',mail)

        Axios.post('http://localhost:6080/find-username',{
          email:mail
        }).then(res=>{
          console.log(res.data.companyname)
          const comp = res.data.companyname
          setCompany(comp)
          console.log(company)
          console.log(Date)
        })

        Axios.post('http://localhost:6080/job_post',{
            designation:designation,
            postedby:mail,
            description: description,
            city:city,
            jobtype:workingtime,
            startingsalary:startingsalary,
            endingsalary:endingsalary,
            image:image,
            date:Date,
            company:company
        }).then(res=>{
            console.log('Got the Response : ',res.data);
            toast.success("Successfully posted")
            // alert('successfully registered')
            setTimeout(4000);
            window.location.href="industrypost"
        }).catch((e)=>{
          setLoading(false)
            console.log('Error occured ', e);
        })
        .finally(()=> {
          setLoading(false)
        }
        )
    }
    function convertToBase64(e)
    {
      console.log(e);
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=()=>
      {
        console.log(reader.result);
        setImage(reader.result);

      };
      reader.onerror=error=>
      {
        console.log("Error:",error);
      };

    }

  return (
    <div className='outer-div'>
      <div class="nav-bar">
        <Navbar1></Navbar1>
       </div>
        <ToastContainer/>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      
         <Container className='outer-container'>
        <center><br/>
        <br/><h1>Job details</h1></center>
        <br/>
        <br/>
        <input onChange={(e)=>{setDesignation(e.target.value)}} value={designation} placeholder='Designation:'/>
        <br/>
        <br/>
        <textarea
        value={description}
        onChange={(e)=>{setDescription(e.target.value)}}
        placeholder="Description"
        rows={8} 
        cols={70} 
        style={{ resize: 'none',width: '2000px' }} 
        className='job-desc'
         />
      <br/>
        <br/>
        <input onChange={(e)=>{setCity(e.target.value)}} value={city}placeholder='City'/>
        <br/>
        <br/>   
        <input onChange={(e)=>{setWorkingtime(e.target.value)}} value={workingtime} placeholder='workingtime'/>
        <br/><br/>
        <input onChange={(e)=>{setStartingsalary(e.target.value)}} value={startingsalary} placeholder='startingsalary'/>
        <br/><br/>
        <input onChange={(e)=>{setEndingsalary(e.target.value)}} value={endingsalary} placeholder='endingsalary'/>
        {/* <br/><br/>
        <input onChange={(e)=>{setCompany(e.target.value)}} value={company} placeholder='companyname'/> */}
        <br/><br/>
        UPLOAD IMAGE:<br></br><input onChange={convertToBase64} type ="file" accept='image/*' placeholder='uploag image'/>
        {image==""||image==null?"": <img width={50} height={100} src={image}/>}
       
        <br/><br/>
        <center><button onClick={handlesubmit} className='job-post-btn'>
        POST JOB
        </button></center>
        <br/><br/>
        
        </Container>
        <br></br>
        <br></br>


        <div className="footer-part">
            <Footer></Footer>
        </div>
    </div>
  )
}

export default Industryjobpost