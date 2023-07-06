
import React, { useState , useEffect } from 'react';
import Axios  from "axios";
import { BsFillTrashFill, BsFillPencilFill ,BsPlusCircle} from "react-icons/bs";
import {ToastContainer, toast } from 'react-toastify';

const ModalForm = ({ closeModal , rowToEdit }) =>{

  const [name,setName] = useState('')
  const [bio, setBio] = useState('');
  const [about, setAbout] = useState('');
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState('');
  const [languages, setLanguages] = useState('');
  const [errors, setErrors] = useState('');
  const[modalOpen,setModalOpen] = useState(false);
  const [showExperienceDesc,setShowExperienceDesc] = useState(false);
  const affiliation=localStorage.getItem("affiliation")

  useEffect(() => {
    if (rowToEdit) {
      setName(rowToEdit.name);
      setBio(rowToEdit.bio);
      setAbout(rowToEdit.about);
      setExperience(rowToEdit.experience);
      setEducation(rowToEdit.education);
      setSkills(rowToEdit.skills.join(', '));
      setLanguages(rowToEdit.languages.join(', '));
    }
  }, [rowToEdit]);
  
  //  const fetchProfileData = async () => {
  //   const userEmail = localStorage.getItem("userMail")
  //   console.log("USEREMAIL=========>",userEmail);
  //   try {
  //     const response = await Axios.get('http://localhost:6080/fetchProfileData',{email : userEmail});
  //     // const profileData = response.data;
  //     setName(response.data.name);
  //     setBio(response.data.bio);
  //     setAbout(response.data.about);
  //     setExperience(response.data.experience);
  //     setEducation(response.data.education);
  //     setSkills(response.data.skills.join(', '));
  //     setLanguages(response.data.languages.join(', '));
  //   } catch (error) {
  //     console.error('An error occurred while fetching profile data:', error);
  //   }
  // };

  const fetchProfileData = async () => {
    const userEmail = localStorage.getItem('userMail');
    console.log('USEREMAIL=========>', userEmail);
    try {
      const response = await Axios.post('http://localhost:6080/fetchProfileData', { email: userEmail });
      // const data = response.data;
      
      // console.log('DATA======>', data);
      setName(response.data.name);
      setBio(response.data.bio);
      setAbout(response.data.about);
      setExperience(response.data.experience);
      setEducation(response.data.education);
      setSkills(response.data.skills.join(', '));
      setLanguages(response.data.languages.join(', '));
    } catch (error) {
      console.error('An error occurred while fetching the profile:', error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  const addEducationField = () => {
    setEducation([...education, {
       university: '',
       degree: '',
       dept: '', 
       fromYear: '', 
       toYear: '' }]);
  };

  const removeEducationField = (index) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    setEducation(updatedEducation);
  };

  const addExperience = () => {
    const newExperience = {
      companyName: '',
      jobRole: '',
      jobType: '',
      fromDate: '',
      toDate: '',
      experience: ''
    };
    setExperience([...experience, newExperience]);
  };

  const updateExperienceField = (index, field, value) => {
    const updatedExperience = [...experience];
    updatedExperience[index][field] = value;
    setExperience(updatedExperience);
  };

  const removeExperience = (index) => {
    const updatedExperience = [...experience];
    updatedExperience.splice(index, 1);
    setExperience(updatedExperience);
  };

  useEffect(() => {
    if (affiliation === 'industry') {
      setShowExperienceDesc(true);
    }
  }, [affiliation]);

  const handleSubmit = async (e) => {
    console.log("inside handle submit...");
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
    console.log("inside submit try block")
    if (rowToEdit === null) {
      console.log("inside the if rowtoEdit inside handle submit")
      const response = await Axios.post('http://localhost:6080/insertprofile', profileData).then(res=>{
      if(res.data.statusMsg == "success"){
            toast.success("Profile Details Added Successfully!")
            window.location.href="academy";
        }
    })
      console.log('Profile saved successfully:', response);
    } else {
      const response = await Axios.post('http://localhost:6080/insertprofile', profileData);
      if (response.data.statusMsg === "success") {
        toast.success("Profile Details Updated Successfully!");
        window.location.href = "academy";
      }
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
        <form className='profile-form'>
          <h2> Profile Details</h2>
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
            <div className='label-icon'>
              <label htmlFor="experience" className='exp-label'>Experience:</label>
              <BsPlusCircle size={40} onClick={addExperience} className='button-click'></BsPlusCircle>
            </div>
              {experience.map((exp , index) => (
                <div className='form-group' key={index}>
              {/* <h3>Experience #{index+1}</h3>*/}
                  <label htmlFor={`companyName-${index}`}>Company:</label>
                    <input type="text" id={`companyName-${index}`} value={exp.companyName} onChange={(e) => updateExperienceField(index, 'companyName', e.target.value)}  className='profileModal'/>
                    <label htmlFor={`jobRole-${index}`}>Job Role:</label>
                    <input type="text" id={`jobRole-${index}`} value={exp.jobRole} onChange={(e) => updateExperienceField(index, 'jobRole', e.target.value)}  className='profileModal'/>
                    <label htmlFor={`jobType-${index}`}>Job Type:</label>
                    <input type="text" id={`jobType-${index}`} value={exp.jobType} onChange={(e) => updateExperienceField(index, 'jobType', e.target.value)}  className='profileModal'/>
                    {/* <div> */}
                      <label htmlFor={`fromDate-${index}`}>From:</label>
                      <input type="month" id={`fromDate-${index}`} value={exp.fromDate} onChange={(e) => updateExperienceField(index, 'fromDate', e.target.value)} className='profileModal'/>
                    {/* </div>
                    <div> */}
                      <label htmlFor={`toDate-${index}`}>To:</label>
                      <input type="month" id={`toDate-${index}`} value={exp.toDate} onChange={(e) => updateExperienceField(index, 'toDate', e.target.value)} className='profileModal'/>
                    {/* </div> */}
                    <label htmlFor={`exp-${index}`}>Description:</label>
                    <textarea id={`exp-${index}`} value={exp.experience} onChange={(e) => updateExperienceField(index, 'experience', e.target.value)} className='profileModal'/>
                    {index > 0 && (
                      
                    <BsFillTrashFill onClick={() => removeExperience(index)} className='button-click delete-btn-ed'></BsFillTrashFill>
                     
                    )}
                </div>
              ))}
            {/* <button type="button" onClick={addExperience}>
              Add Experience
            </button>     */}
          </div>
          )
}

          <div className='form-group'>
          <div className='label-icon'>
            <label htmlFor="education" className='edu-label'>Education:</label>
            <BsPlusCircle size={25} onClick={addEducationField} className='button-click'></BsPlusCircle>
          </div>
          {education.map((edu, index) => (
            <div className='form-group' key={index}>
          {/* <h3>Degree #{index + 1}</h3>*/}
              <label htmlFor={`university-${index}`}>University/college:</label>
              <input
                type="text"
                id={`university-${index}`}
                value={edu.university}
                onChange={(e) => handleEducationChange(index, 'university', e.target.value)}
                className='profileModal'
                required
              />
              <label htmlFor={`degree-${index}`}>Degree:</label>
              <input
                type="text"
                id={`degree-${index}`}
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                className='profileModal'
                required
              />
              <label htmlFor={`dept-${index}`}>Department:</label>
              <input
                type="text"
                id={`dept-${index}`}
                value={edu.dept}
                onChange={(e) => handleEducationChange(index, 'dept', e.target.value)}
                className='profileModal'
                required
              />
              {/* <div> */}
                <label htmlFor={`fromYear-${index}`}>From:</label>
                <input
                  type="month"
                  id={`fromYear-${index}`}
                  value={edu.fromYear}
                  onChange={(e) => handleEducationChange(index, 'fromYear', e.target.value)}
                  className='profileModal'
                  required
                />
              {/* </div>
              <div> */}
                <label htmlFor={`toYear-${index}`}>To:</label>
                <input
                  type="month"
                  id={`toYear-${index}`}
                  value={edu.toYear}
                  onChange={(e) => handleEducationChange(index, 'toYear', e.target.value)}
                  className='profileModal'
                  required
                />
              {/* </div> */}
              &nbsp;{index > 0 && (
                  <BsFillTrashFill onClick={() => removeEducationField(index) } size={20}  className='button-click delete-btn-ed'> Delete </BsFillTrashFill>
              )}
            </div>
          ))}
          {/* <button type="button" onClick={addEducationField}>
            Add Degree
          </button> */}
          
         
          </div>

          <div className='form-group'>
              <label htmlFor="skills">Skills:</label>
              <input type="text" id="skills" value={skills} onChange={(e) => setSkills(e.target.value)} className='profileModal' required/>
          </div>

          <div className='form-group'>
          <label htmlFor="languages">Languages:</label>
          <input type="text" id="languages" value={languages} onChange={(e) => setLanguages(e.target.value)} className='profileModal' required/>
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
