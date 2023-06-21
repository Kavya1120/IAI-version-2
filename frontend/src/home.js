import React from 'react'
import {Container} from 'react-bootstrap'
// import "./home.css";
import "./newhome.css";
import Navbar1 from './components/Navbar1';
import Footer from './components/footer';
import NewsFeed from './components/newsfeed';
import Caarousel from './components/corousel';
//import image from './images/img1.jpg';

function Home() {

  const imageurl = "https://media.istockphoto.com/id/481744325/photo/raj-path-the-kings-way-new-delhi.jpg?s=612x612&w=0&k=20&c=FCCYzvRecxzlSiwJOaST4Goi4aQ5KTlK4jJ0P86Kqc0=";
  const imageurl1 = "https://thumbs.dreamstime.com/b/indian-national-emblem-flag-vidhana-soudh-bangalore-bengaluru-indian-national-emblem-flag-vidhana-soudh-bangalore-bengaluru-india-174014638.jpg"
  return (

    <>
      <div class="nav-bar">
        <Navbar1></Navbar1>
       </div>
       <Container>


       <div style={{marginTop:'130px'}}>
         <Caarousel imageurl={imageurl}
                    imageurl1={imageurl1}
         />
      </div>

      <div className='a'>
  
            <div class="content row " >
                              <div class="col-md-6">
                                    <h1><b>The Chamber</b></h1>
                                     <div class="demo-content" style={{textAlign:'justify',fontSize:'18px'}}> 
                                        <p style={{textAlign:'justify'}}>Founded in 1925, Indian Chamber of Commerce (ICC) is the leading and only National Chamber of 
                                         Commerce having headquarter in Kolkata, and one of the most pro-active and forward-looking Chambers in the country today. Its membership spans some of the most prominent and major industrial groups in India.ICC’s forte is its ability to anticipate the needs of the future, respond to challenges, and prepare the stakeholders in the economy to benefit from these changes and opportunities. Set up by a group of pioneering industrialists led by Mr G D Birla, the Indian Chamber of Commerce was closely associated with the Indian Freedom Movement, as the first organised voice of indigenous Indian Industry.</p>
                                   </div> 

                              </div>
                              <div class="col-md-6">
                                    <div class="demo-content_video" > 
                                            <iframe src="https://www.youtube.com/embed/dual15LJEhA"
                                                    title="YouTube video player" frameborder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                                    allowfullscreen>
                                           </iframe>
                                    </div>
                              </div>
          </div>


          <br></br>
          
          
      
{/*  */}

<div class="row">
            <div class="col-md-6">
                <div class="demo-content">
                <p><NewsFeed ></NewsFeed></p>     

                </div>
            </div>
            <div class="col-md-6" >
                    <h2><b>The Mission</b></h2>
                        <div class="demo-content bg-alt "style={{textAlign:'justify',fontSize:'18px'}}>
                            <p style={{textAlign:'justify'}}>Founded in 1925, Indian Chamber of Commerce (ICC) is the leading and only National Chamber of 
                                            Commerce having headquarter in Kolkata, and one of the most pro-active and forward-looking Chambers in the country today. Its membership spans some of the most prominent and major industrial groups in India.ICC’s forte is its ability to anticipate the needs of the future, respond to challenges, and prepare the stakeholders in the economy to benefit from these changes and opportunities. Set up by a group of pioneering industrialists led by Mr G D Birla, the Indian Chamber of Commerce was closely associated with the Indian Freedom Movement, as the first organised voice of indigenous Indian Industry.</p>

                        </div>


                        <h2><b>The Vision</b></h2>
                        <div class="demo-content bg-alt "style={{textAlign:'justify',fontSize:'18px'}}>
                        <p style={{textAlign:'justify'}}>Foster collaboration and networking opportunities among businesses.
                          Advocate for favorable policies and regulatory frameworks to drive economic growth.
                          Provide resources, expertise, and support to help businesses thrive.
                          Facilitate international trade and partnerships to enhance global business opportunities.
                          Promote innovation, sustainability, and corporate social responsibility.
                          Membership Benefits:

                          Access to a strong network of industry professionals, policymakers, and thought leaders.
                          Business promotion and marketing opportunities through events, conferences, and publications.
                          Regular updates on industry trends, policy developments, and market insights.
                          Exclusive access to training programs, workshops, and webinars.
                          Advocacy and representation at the national and international levels.
                          Special discounts on various services and partner offerings.</p>
                        </div>

            </div>
            <div class="demo-content bg-alt "style={{textAlign:'justify',fontSize:'18px',marginBottom:'50px'}}>
                        <p style={{textAlign:'justify'}}>Policy Advocacy: We actively engage with government bodies and policymakers to influence policies and regulations that impact the business environment, ensuring a conducive ecosystem for growth.

                          Business Development: Our chamber facilitates trade missions, business matchmaking events, and exhibitions to connect businesses, promote collaborations, and explore new markets.

                          Skill Development: We organize training programs and workshops to enhance the skills and knowledge of our members, enabling them to adapt to emerging business trends and technologies.
  
                          Knowledge Sharing: Through conferences, seminars, and webinars, we provide platforms for knowledge exchange, industry insights, and best practices, fostering continuous learning and innovation.
                          </p>

           </div>
  </div>
  

      </div>
   
      <br></br>
      <br></br>
      </Container>
    
      
    <div className="footer-part">
        <Footer></Footer>
    </div>
      
     

      </>
    
  )
}
/*mmmm*/


export default Home


