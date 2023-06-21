import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import coverimg from "../images/cover-pic.png"
import usermainImg from "../images/user-main.jpg"
import user2 from "../images/user-2.png"
import connectImg from "../images/connect.png"
import chatImg from "../images/chat.png"
import microsoftImg from "../images/microsoft.png"
import slackImg from "../images/slack.png";
import googleImg from "../images/google.png"
import rightArrowImg from "../images/right-arrow.png"
import northImg from "../images/north.png"
import swinburnImg from "../images/Swinburn.png"
import stanfordImg from "../images/stanford.png"
import { BsFillPencilFill } from "react-icons/bs";
import Axios  from "axios";
import {Container} from 'react-bootstrap'
import Navbar1 from '../components/Navbar1';
import "./profilepage.css";
const ProfilePage =({openModal}) =>{

    const [profileData ,  setProfileData] = useState([]);
    const [showExperienceDesc,setShowExperienceDesc] = useState(false);
    const affiliation=localStorage.getItem("affiliation");


    useEffect(() => {
        if (affiliation === 'industry') {
          setShowExperienceDesc(true);
        }
      }, [affiliation]);
 
    useEffect ( () => {
        const fetchProfileData = async () => {
            const userEmail = localStorage.getItem("userMail")
            console.log("USEREMAIL=========>",userEmail);
            try {
              const response = await Axios.post('http://localhost:6080/fetchProfileData', { email: userEmail });
              const data = response.data;
              setProfileData(data);
              console.log("DATA======>",data);
            } catch (error) {
              console.error('An error occurred while fetching the profile:', error);
            }
}
fetchProfileData();
},[])
 
  return (
    <>
    <div class="nav-bar">
        <Navbar1></Navbar1>
       </div>
    <div className="profile-body" style={{marginTop:'100px'}}>
        
      <div className="profile-main">
          <div className="profile-container">
                <img src={coverimg} width="100%" />
            <div className='profile-container-outer'>
                <div className="profile-container-inner">
                    <img src={usermainImg} className="profile-pic"/>
                    <h1>{profileData.name}</h1>
                    <b>{profileData.bio}<a
                            href="https://www.freecodebox.com/">freecodebox</a> tech agency </b>
                </div>
                <div className='edit-btn-container'>
                <BsFillPencilFill className="edit-btn" onClick={openModal}/>
                </div>
            </div>
            
        </div>
            <div className="profile-description">
                <h2 className='profilepage-h2'>About</h2>
                <p>{profileData.about}</p>
                <a href="#" className="see-more-link">See More...</a>
            </div>

        {showExperienceDesc &&(
            <div className="profile-description">
                <h2 className='profilepage-h2'>Experience</h2>
                <div className="profile-desc-row">
                    <img src={microsoftImg}/>
                    <div>
                        <h3 className='profilepage-h3'>
                            Lead Front-End Developer
                        </h3>
                        <b>MicroSoft &middot; Part-Time(Remote)</b>
                        <b>May 2022 - Present &middot; 1.9 year</b>
                        <p>{profileData.experience}</p>
                        <hr/>
                    </div>
                </div>
            </div>
        )
}

            <div className="profile-description">
                <h2 className='profilepage-h2'>Education</h2>
                <div className="profile-desc-row" >
                    <img src={stanfordImg} />
                    <div>
                        <h3 className='profilepage-h3'> {profileData.education}</h3>
                        <b>BSCS, Computer Science</b>
                        <b>2019-2023</b>
                        <hr/>
                    </div>
                </div>

               
            </div>
            <div className="profile-description">
               
            <h2 className='profilepage-h2'>Skills</h2>
            <div className='profile-description-container'> 
                {profileData.skills?.map((skill) => (
                    <div key={skill.id}>
                    <a href="#" className="skills-btn">{skill}</a>
                    </div>
                ))}
                </div>
            </div>


            <div className="profile-description">
                <h2 className='profilepage-h2'>Languages</h2>
                <div className='profile-description-container'>
                {profileData.languages?.map((lang) => (
                <div key={lang.id}>
                  <a href="#" className="language-btn">{lang}</a>&nbsp;
                </div>
                ))}
            </div>
            </div>

        </div>

      </div>
      </>
  );
}

export default ProfilePage;
