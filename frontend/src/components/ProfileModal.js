
import React, { useState , useEffect } from 'react';
import Axios  from "axios";
import {ToastContainer, toast } from 'react-toastify';

const ModalForm = ({ closeModal , rowToEdit }) =>{

  const [name,setName] = useState('')
  const [bio, setBio] = useState('');
  const [about, setAbout] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState('');
  const [languages, setLanguages] = useState('');
  const [errors, setErrors] = useState('');
  const[modalOpen,setModalOpen] = useState(false);
  const [showExperienceDesc,setShowExperienceDesc] = useState(false);
  const affiliation=localStorage.getItem("affiliation")

 
  useEffect(() => {
    if (affiliation === 'industry') {
      setShowExperienceDesc(true);
    }
  }, [affiliation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("userMail");
  const profileData = {
    bio: bio,
    about: about,
    experience: experience,
    education: education,
    skills: skills.split(',').map((skill) => skill.trim()),
    languages: languages.split(',').map((lang) => lang.trim()),
    email:email
  };

  try {
    if (rowToEdit === null) {
      const response = await Axios.post('http://localhost:6080/insertprofile', profileData).then(res=>{
      if(res.data.statusMsg == "success"){
            toast.success("Profile Details Added Successfully!")
            window.location.href="academy";
        }
    })
      console.log('Profile saved successfully:', response);
    } else {

    }
    
  } catch (error) {
    toast.error("An error occurred while saving the profile.Please Try again..")
    console.error('An error occurred while saving the profile:', error);
  }
    closeModal();
  };

  return (

      
   <div className='modal-container' onClick={(e) => {
    if (e.target.className === "modal-container") closeModal();
  }}>
      
      <div className="modal modal-profile">
        <ToastContainer></ToastContainer>
        <form className='profilemodal-form'>
          <h2 className='profile-h2'> Profile Details</h2>
          <div className='form-group'>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}  className='profileModal'/>
          </div>

          <div className="form-group">
          <label htmlFor="bio">Bio:</label>
          <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} className='profileModal'/>
          </div>

          <div className="form-group">
          <label htmlFor="about">About:</label>
              <textarea id="about" value={about} onChange={(e) => setAbout(e.target.value)} className='profileModal'/>
          </div>
          {showExperienceDesc &&(
          <div className='form-group'>
          <label htmlFor="experience">Experience:</label>
              <textarea id="experience" value={experience} onChange={(e) => setExperience(e.target.value)} className='profileModal'/>
          </div>
          )
}

          <div className='form-group'>
          <label htmlFor="education">Education:</label>
              <textarea id="education" value={education} onChange={(e) => setEducation(e.target.value)} className='profileModal'/>
          </div>

          <div className='form-group'>
              <label htmlFor="skills">Skills:</label>
              <input type="text" id="skills" value={skills} onChange={(e) => setSkills(e.target.value)} className='profileModal'/>
          </div>

          <div className='form-group'>
          <label htmlFor="languages">Languages:</label>
          <input type="text" id="languages" value={languages} onChange={(e) => setLanguages(e.target.value)} className='profileModal'/>
          </div>
          
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn profile-btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
      
    
  );
}

export default ModalForm;
