import React from 'react'
import {Container} from 'react-bootstrap'
import "../newhome.css";
import image1 from "../images/academyhome.jpg"
import image2 from "../images/academyhome2.jpg"
import Navbar1 from './Navbar1';
import Footer from './footer';
import NewsFeed from './newsfeed';
import { useState, useEffect } from 'react';
import Axios  from "axios";
import Caarousel from './corousel';


function Academy() {
      const [youtubeUrls, setYoutubeUrls] = useState([]);
      
      useEffect(() => {
            const youtubeUrlRow=Axios.get('http://localhost:6080/fetchallurls')
            .then((response) => {
              console.log("res==========>",response.data.data)
              setYoutubeUrls(response.data.data)
              console.log("youtubeurl===>",youtubeUrls)
            }).catch((error)=>{
                  console.log(error)
            })
          },[])
      
  return (

<>
{/*.............................................HEADER................................................*/}
      <div class="nav-bar">
        <Navbar1></Navbar1>
       </div>

{/*.............................................CONTAINER................................................*/}

       <Container className='academyhome-container'>
       <div style={{marginTop:'130px'}}> 
                  <Caarousel  

                        imageurl={image1}
                        imageurl1={image2}

                  />
      </div>

      <div className='a'>
  
            <div class="content row ">
            
                              <div class="col-md-6">
                                    <h1><b>Welcome to the Academic-Industry Web Portal!</b></h1>
                                     <div class="demo-content" style={{textAlign:'justify',fontSize:'18px'}}> 
                                        <p style={{textAlign:'justify'}}>As a student, you now have access to a powerful platform that bridges
                                         the gap between academia and industry. This portal is designed to enhance your academic journey by providing you with
                                          valuable resources,
                                         connections, and opportunities to collaborate with industry professionals.
                                         <br>
                                         </br>
                                         We are committed to empowering you with the tools and knowledge you need to succeed in your academic and
                                          professional endeavors. Take full advantage of the resources 
                                         available on this portal and make the most of this unique academic-industry collaboration.</p>
                                    </div> 

                              </div>
                              <div class="col-md-6">
                                    <div class="demo-content_video" > 
                                    {youtubeUrls.length > 0 && (
                                            <iframe src={youtubeUrls[0].url}
                                                    title="YouTube video player" frameborder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                                    allowfullscreen>
                                           </iframe>
                                    )}
                                    </div>
                              </div>
          </div>
          <br></br>   
            <div class="row">
                  <div class="col-md-6">
                              <div class="demo-content">
                                          <p>
                                                <NewsFeed ></NewsFeed>
                                          </p>     

                             </div>
                  </div>
                  <div class="col-md-6" >
                  <h2><b>Explore the Industry-Focused Content</b></h2>
                             <div class="demo-content bg-alt "style={{textAlign:'justify',fontSize:'18px'}}>
                                    <p style={{textAlign:'justify'}}>Here, you will find a wealth of industry-focused content, including:

                                                                  Industry Projects: Engage in real-world projects in collaboration with leading companies. Gain practical experience, apply your knowledge, and develop valuable skills that will set you apart in the job market.

                                                                  Internship and Job Opportunities: Explore a wide range of internship and job openings from reputable companies. Discover exciting career prospects and connect with potential employers.

                                                                  Industry Expertise: Access expert insights, articles, and case studies from industry leaders. Stay updated on the latest trends, advancements, and best practices in your field of study.

                                                                  Networking and Mentorship: Connect with professionals in your desired industry. Build meaningful relationships, seek guidance, and expand your professional network.

                                                                  Events and Workshops: Attend industry-focused events, workshops, and webinars. Learn from industry experts, participate in discussions, and broaden your knowledge horizons.

                                                                  Skill Development: Access online courses and resources to enhance your technical and soft skills. Acquire the competencies required to thrive in today's dynamic work environment.
                                          </p>

                             </div>
                              <h2><b>The Vision</b></h2>
                              <div class="demo-content bg-alt "style={{textAlign:'justify',fontSize:'18px'}}>
                                    <p style={{textAlign:'justify'}}>We are committed to empowering you with the tools and knowledge you need to succeed in your academic and professional endeavors. Take full advantage of the resources available on this portal and make the most of this unique academic-industry collaboration.

                                                Remember, your academic journey is not limited to the classroom. Embrace the opportunities provided by the Academic-Industry Web Portal and unlock your full potential. We wish you a fulfilling and successful experience!
                                    </p>
                              </div>

                  </div>
            
             </div>
  

      </div>
      <br></br>
      <br></br>
      </Container>

{/*.............................................FOOTER................................................*/}
    <div className="footer-part">
        <Footer></Footer>
    </div>
</>
    
  )
}
export default Academy


