import React from 'react'
import {Container} from 'react-bootstrap'
import "../home.css";
import Navbar1 from './Navbar1';
import Footer from './footer';
import NewsFeed from './newsfeed';
import Caarousel from './corousel';
import './activitypage.css';
function Profile()
{
    return(
    <>
        {/*.............................................HEADER................................................*/}

        <div class="nav-bar">
            <Navbar1></Navbar1>
       </div>

        <div className='activity-body'>
        {/*.............................................CONTAINER................................................*/}
        <Container className='activity-container'>
                <div className='profile'>
                    <div className="left">
                        <p className='activity-paragraph'>image </p>

                    </div>

                    <div className='right'>
                                <p className='activity-paragraph'> I am sakthi studying genetic engineering in coimbatore institute of technology,complted ug in madurai
                                    I am sakthi studying genetic engineering in coimbatore institute of technology,complted ug in madurai
                                    I am sakthi studying genetic engineering in coimbatore institute of technology,complted ug in madurai
                                    I am sakthi studying genetic engineering in coimbatore institute of technology,complted ug in madurai.
                                </p>
                                <br></br>
                                <br></br>
                               
                            <button className='activity-contact'>Contact details</button>
                    </div>
                </div>
    
                <div className='button-container'>
                                <div className="left-button">
                                    <button className='profile-button'>PROFILE</button>
                                </div>
                                <div className="right-button">
                                    <button className='Activities-button'>ACTIVITIES AND INTERESTS</button>
                                </div>
                </div>
                <br></br>
                <br></br>
                

                <div className="projects-container">
                                <h4>Projects</h4>
                </div>
                <br></br>
                <br></br>

                <div className="newpost-container">
                                <h4>New Post</h4>    
                </div>
                <br></br>
                <br></br>


                <div className="activities-container">
                               <h4>Activities</h4>
                </div>
                <br></br>
                <br></br>
         </Container>

       </div>
       <br></br>
{/*.............................................FOOTER................................................*/}
       <div className="footer-part">
         <Footer></Footer>
      </div>
      


           
</>
    )
}
export default Profile