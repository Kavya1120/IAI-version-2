import React from 'react'
import {Container} from 'react-bootstrap'
import "../newhome.css";
import Navbar1 from './Navbar1';
import Footer from './footer';
import NewsFeed from './newsfeed';
import { useState, useEffect } from 'react';
import Axios  from "axios";
import Caarousel from './corousel';
function Industry() {
      const [youtubeUrls, setYoutubeUrls] = useState([]);
      
      useEffect(() => {
            const youtubeUrlRow=Axios.get('http://localhost:6080/fetchallurls')
            .then((response) => {
              console.log("res==========>",response.data.data)
              setYoutubeUrls(response.data.data)
              console.log("youtubeurl industry===>",youtubeUrls)
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
      <Container>
       <div style={{marginTop:'130px'}}> 
                     <Caarousel 
                              imageurl="https://images.squarespace-cdn.com/content/v1/5bac99efb2cf79a76d80781d/1607594836967-EDCZQ43OYMASF30P13P5/IIT+Madras.jpg"
                              imageurl1="https://digitallearning.eletsonline.com/wp-content/uploads/2019/03/Government-Industry-Academia-Collaboration-Key-to-Quality-Higher-Education.jpg"
                     />
      </div>

      <div className='industryhome-body'>
            <div class="content row " >
                              <div class="col-md-6">
                                    <h1><b>Welcome to the Academic-Industry Web Portal!</b></h1>
                                     <div class="demo-content" style={{textAlign:'justify',fontSize:'18px'}}> 
                                        <p style={{textAlign:'justify'}}>As an industry professional accessing our platform, you are entering a dynamic 
                                         ecosystem that bridges the gap between academia and industry.
                                         This dedicated industry page serves as a gateway to a wealth of resources,
                                         collaboration opportunities, and industry-focused content. Here's what you can expect:.</p>
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
                                                      <p><NewsFeed ></NewsFeed></p>     

                                          </div>
                              </div>

                               <div class="col-md-6" >
                                                <h2><b>Welcome to the Academic-Industry Web Portal!</b></h2>
                                                <div class="demo-content bg-alt "style={{textAlign:'justify',fontSize:'18px'}}>
                                                      <p style={{textAlign:'justify'}}>Industry-Academia Collaboration: Connect with leading academic institutions, researchers, and students to foster collaboration and innovation. Explore joint research projects, mentorship programs, and knowledge exchange initiatives. Collaborate with academia to address industry challenges, tap into cutting-edge research, and access a talent pool of future professionals.

                                                      Talent Acquisition and Internships: Discover talented individuals from academic institutions who are seeking industry exposure and practical experience. Access internship programs, co-op opportunities, and recruitment channels to connect with aspiring students and graduates. Nurture and develop talent by providing them with real-world industry exposure and hands-on learning experiences.

                                                      Industry-Driven Research: Access industry-specific research studies, whitepapers, and reports conducted by academic institutions. Stay updated on the latest industry trends, market insights, and technological advancements. Leverage research findings to make informed business decisions, drive innovation, and stay competitive in your industry.</p>

                                                </div>
                                                <p><b>Explore More!!</b></p>
                                                 <div class="demo-content bg-alt "style={{textAlign:'justify',fontSize:'18px'}}>
                                                      <p style={{textAlign:'justify'}}>Industry Events and Conferences: Stay informed about industry-specific events, conferences, trade shows, and exhibitions. Network with industry peers, showcase your products and services, and stay up-to-date with industry developments. Participate in panel discussions, keynote speeches, and interactive sessions to expand your industry knowledge and professional network.

                                                            Industry Resources and Toolkits: Access a comprehensive repository of industry resources, including industry guides, toolkits, templates, and frameworks. These resources are designed to assist you in various aspects of your business, such as marketing, strategy, innovation, and operations. Leverage these resources to streamline processes, enhance efficiency, and achieve business goals.</p>

                                                </div>
                                                <div class="demo-content bg-alt "style={{textAlign:'justify',fontSize:'18px',marginBottom:'50px'}}>
                                                      <p style={{textAlign:'justify'}}></p>

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


export default Industry


