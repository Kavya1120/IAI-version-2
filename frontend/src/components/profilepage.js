import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import coverimg from "../images/cover-pic.png"
import usermainImg from "../images/user-main.jpg"
import microsoftImg from "../images/microsoft.png"
import stanfordImg from "../images/stanford.png"
import {ToastContainer, toast} from 'react-toastify';
import { BsFillPencilFill , BsPencilSquare } from "react-icons/bs";
import Axios  from "axios";
import Navbar1 from '../components/Navbar1';
import "./profilepage.css";
const ProfilePage =({openModal}) =>{

    const [profileData ,  setProfileData] = useState({});
    const [displayUploadBtn, setDisplayUploadBtn] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const [url, setUrl] = useState("");

    
    const [showExperienceDesc,setShowExperienceDesc] = useState(false);
    const affiliation=localStorage.getItem("affiliation");

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



    useEffect(() => {
        if (affiliation === 'industry') {
          setShowExperienceDesc(true);
        }
      }, [affiliation]);
 
    useEffect ( () => {
        fetchProfileData();
},[])
const handleMouseEnter = () => {
    setDisplayUploadBtn(true);
  };

  const handleMouseLeave = () => {
    setDisplayUploadBtn(false);
  };

  

  const handleFileChange = async (event) => {
    const choosedFile = event.target.files[0];
    if (choosedFile) {
      try {
        const base64 = await convertBase64(choosedFile);
        Axios.post("http://localhost:6080/uploadImage", { image: base64 })
          .then((res) => {
            setUrl(res.data);
            console.log("imageee=====",res.data)
            const imageUrl =  res.data
            const email = localStorage.getItem("userMail");
            const profileData = {
              imageUrl:imageUrl,
              email:email
            };
            Axios.post("http://localhost:6080/editprofile",profileData).then((res)=>{
              if (res.data.statusMsg === "success") {
                toast.success('Profile picture uploaded successfully!');
              }
              else{
                toast.error('Error occured in uploading the profile picture')
              }
            })
          });
      } catch (error) {
        toast.error('An error occurred while uploading the profile picture:', error);
      }
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const img = document.querySelector('#photo');
        if (img) {
          img.setAttribute('src', reader.result);
        }
      });
      reader.readAsDataURL(choosedFile);
    }
  };
  


  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };  
  
  const handleEditIconClick = async () => {
    const fileInput = document.querySelector('#file');
    fileInput.click();

  };
 

  return (
    <>
    <div class="nav-bar">
    <ToastContainer />
        <Navbar1></Navbar1>
       </div>
    <div className="container" style={{marginTop:'100px'}}>
        
      <div className="profile-main">
          <div className="profile-container">
                <img src={coverimg} width="100%"/>
            <div className='profile-container-outer'>
                <div className="profile-container-inner profile-pic-div">
                    <img src={profileData.imageUrl} className="profile-pic" id='photo'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    />
                    <div className="edit-icon" onClick={handleEditIconClick}>
                        <BsPencilSquare className="edit-icon-btn" />
                    </div>
                    <input type="file" id="file" onChange={handleFileChange}/>
                    <h1>{profileData.name}</h1>
                    <b>{profileData.bio}</b>
                </div>
                <div className='edit-btn-container'>
                <BsFillPencilFill className="edit-btn" onClick={ () => {
                    openModal();
                }}/>
                </div>
            </div>
            
        </div>
            <div className="profile-description">
                <h2>About</h2>
                <p>{profileData.about}</p>
                <a href="#" className="see-more-link">See More...</a>
            </div>

        {showExperienceDesc &&  profileData.experience &&(
            <div className="profile-description">
                <h2>Experience</h2>
            {profileData.experience.map((expe,index) =>(
                <div className="profile-desc-row">
                    <img src={microsoftImg}/>
                    <div>
                        <h3>
                            {expe.jobRole}
                        </h3>
                        <b>{expe.companyName} &middot; {expe.jobType}</b>
                        <b>{expe.fromDate}- {expe.ToDate} </b>
                        <p>{expe.experience}</p>
                        <hr/>
                    </div>
                </div>
                ))}
            </div>
        )
}

            <div className="profile-description">
                <h2>Education</h2>
            {profileData.education && profileData.education.map((educ, index) => (
                <div className="profile-desc-row" >
                    <img src={stanfordImg} />
                    <div>
                        <h3>{educ.university}</h3>
                        <b>{educ.degree}, {educ.department}</b>
                        <b>{educ.fromYear}-{educ.toYear}</b>
                        <hr/>
                    </div>
                </div>
            ))}
               
            </div>
            <div className="profile-description">
               
            <h2>Skills</h2>
            <div className='profile-description-container'> 
                {profileData.skills?.map((skill) => (
                    <div key={skill.id}>
                    <a href="#" className="skills-btn">{skill}</a>
                    </div>
                ))}
                </div>
            </div>


            <div className="profile-description">
                <h2>Languages</h2>
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
