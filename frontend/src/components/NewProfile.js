import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Academy from './academyhome';
import ModalForm from './ProfileModal';
import {Container} from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';
function NewProfile() {
    const[modalOpen,setModalOpen] = useState(false);
    const [rowToEdit , setRowToEdit] = useState(null);

    // useEffect(() => {
    //   console.log("inside use effect setModalOpen(true)")
      
      
    //   setModalOpen(true);
    // },[])

    useEffect(() => {
      const fetchProfileData = async () => {
        const userEmail = localStorage.getItem('userMail');
        console.log('USEREMAIL=========>', userEmail);
        try {
          const response = await Axios.post('http://localhost:6080/fetchProfileData', { email: userEmail });
          const data = response.data;
          setRowToEdit(data);
          setModalOpen(true);
          console.log('DATA======>', data);
        } catch (error) {
          console.error('An error occurred while fetching the profile:', error);
        }
      };
      fetchProfileData();
    }, []);
    
  return (
    <div className='App-new'>
        <Academy></Academy>
        <ToastContainer></ToastContainer>
        {modalOpen && <ModalForm closeModal={() => {
     setModalOpen(false); 
     setRowToEdit(null);
    }} rowToEdit={rowToEdit}/>}
        
    </div> 
  );
}

export default NewProfile;
