import React,{useState,useEffect} from 'react'
import Axios from 'axios';
import Footer from './footer';
import Navbar1 from './Navbar1';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Jobs =()=>{
  const [detail,setdetail]=useState([])

  useEffect(() => {
    Axios.get('http://localhost:6080/getalljob').then(res=>{
        setdetail(res.data.user    )
        console.log(res.data.user)
        console.log(detail)
        console.log("fetch from database")
        
        
    }).catch((err)=>{
        console.log(err)
    })
  }, []);

  const handleApply =(postedby, desg, city)=>{
    const user = localStorage.getItem('userMail');
    localStorage.setItem('postedby', postedby);
    localStorage.setItem('city', city);
    localStorage.setItem('desg', desg);
    console.log('from the apply check', user,desg, postedby, city);

    window.location.href = 'uploadpdf';
    // alert('please your resume in profile');
    // if(resume==''){
    //   toast.error('please update your profile with resume');
    //   window.location.href='resume';
    // }
    // else{
      // }
      
        // toast.success("Successfully applied!")
//     Axios.post('http://localhost:6080/mailer',{
//       email:postedby,
//       subject:"user applied",
//       content:`${user} has applied for the job that you have posted - Job designation:${desg},
// City:  ${city}`
      
//     }).then(res=>{
//       console.log(res.data.status);
//     })
  }

  const render=   detail.map((job,val)=>{
            return(
                <div className="job-item p-4 mb-4">
                <div className="row g-4">
                  <div className="col-sm-12 col-md-8 d-flex align-items-center">
                    <img
                      className="flex-shrink-0 img-fluid border rounded"
                      src={job.image}
                      alt=""
                      style={{ width: 80, height: 80 }}
                    />
                    <div className="text-start ps-4">
                      <h5 className="mb-3">{job.designation}</h5>
                      <span className="text-truncate me-3">
                        <i className="fa fa-map-marker-alt text-primary me-2" />
                        {job.city}
                      </span>
                      <span className="text-truncate me-3">
                        <i className="far fa-clock text-primary me-2" />
                        {job.jobtype}
                      </span>
                      <span className="text-truncate me-0">
                        <i className="far fa-money-bill-alt text-primary me-2" />
                        {job.startingsalary} - {job.endingsalary}
                      </span>
                      <br/>
                    <span className="text-truncate me-0">
                      <i className="fas fa-building text-primary me-2" />
                      {job.company}

                    </span>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                    <div className="d-flex mb-3">
                     
                      <a onClick={()=>{handleApply(job.postedby, job.designation, job.city)}} className="btn btn-primary" href="#">
                        Apply Now
                      </a>
                    </div>
                    <small className="text-truncate">
                      <i className="far fa-calendar-alt text-primary me-2" />
                      Date Line: {job.date}
                    </small>
                  </div>
                </div>
              </div>

            )
        }) 



    return(
      <>
      <Navbar1></Navbar1>
        <div className="container-xxl bg-white p-0">
  {/* Header End */}
      <ToastContainer/>
  <div className="container-xxl py-5 bg-dark page-header mb-5">
    <div className="container my-5 pt-5 pb-4">
      <h1 className="display-3 text-white mb-3 animated slideInDown">
        Job List
      </h1>
    </div>
  </div>
  {/* Header End */}
  {/* Jobs Start */}
  <div className="container-xxl py-5">
    <div className="container">
      <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
        Job Listing
      </h1>
      <div className="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
        <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
          <li className="nav-item">
            <a
              className="d-flex align-items-center text-start mx-3 ms-0 pb-3 active"
              data-bs-toggle="pill"
              href="#tab-1"
            >
              <h6 className="mt-n1 mb-0">Featured</h6>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="d-flex align-items-center text-start mx-3 pb-3"
              data-bs-toggle="pill"
              href="#tab-2"
            >
             
            </a>
          </li>
          <li className="nav-item">
            <a
              className="d-flex align-items-center text-start mx-3 me-0 pb-3"
              data-bs-toggle="pill"
              href="#tab-3"
            >
         
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div id="tab-1" className="tab-pane fade show p-0 active">

            <div className="job-item p-4 mb-4">
              <div className="row g-4">
                {/* <div className="col-sm-12 col-md-8 d-flex align-items-center">
                  <img
                    className="flex-shrink-0 img-fluid border rounded"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgHHSeJEgJEdQ7-T8Rd18sDatEyRbb40yWfZCjUSEjXA&s"
                    alt=""
                    style={{ width: 80, height: 80 }}
                  />
                  <div className="text-start ps-4">
                    <h5 className="mb-3">Software Engineer</h5>
                    <span className="text-truncate me-3">
                      <i className="fa fa-map-marker-alt text-primary me-2" />
                      Chennai
                    </span>
                    <span className="text-truncate me-3">
                      <i className="far fa-clock text-primary me-2" />
                      Full Time
                    </span>
                    <span className="text-truncate me-0">
                      <i className="far fa-money-bill-alt text-primary me-2" />
                      30k - 50k
                    </span>
                    <br/>
                    <span className="text-truncate me-0">
                      <i className="fas fa-building text-primary me-2" />
                      Ibm
                    </span>
                  </div>
                </div>
                <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                  <div className="d-flex mb-3">
                    <a className="btn btn-light btn-square me-3" href="">
                      <i className="far fa-heart text-primary" />
                    </a>
                    <a className="btn btn-primary" href="">
                      Apply Now
                    </a>
                  </div>
                  <small className="text-truncate">
                    <i className="far fa-calendar-alt text-primary me-2" />
                    Date Line: 17-5-2023
                  </small>
                </div> */}
              </div>
            </div>
            <div>{render}</div>
   
            <a className="btn btn-primary py-3 px-5" href="">
              Browse More Jobs
            </a>
            {/* Jobs End */}
            {/* Back to Top */}
            <a
              href="#"
              className="btn btn-lg btn-primary btn-lg-square back-to-top"
            >
              <i className="fa-solid fa-arrow-up" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
 <div className="footer-part">
 <Footer></Footer>
</div>
</>
    )
}



export default Jobs;